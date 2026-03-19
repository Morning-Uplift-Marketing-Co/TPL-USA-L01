import { config } from './fusionops';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    dtpCallback?: (params: Record<string, unknown>) => void;
  }
}

function getClickId(): string {
  const params = new URLSearchParams(window.location.search);
  const cid = params.get('cid') || params.get('click_id') || '';
  try {
    return sessionStorage.getItem('voluum_cid') || cid;
  } catch {
    return cid;
  }
}

function safeGet(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function pixelEndpoint(): string {
  return `https://t.${config.domain}/e`;
}

async function sendPixel(payload: Record<string, unknown>): Promise<void> {
  const url = pixelEndpoint();
  const body = JSON.stringify({ ...payload, ts: Date.now(), cid: getClickId() });
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, new Blob([body], { type: 'application/json' }));
  } else {
    fetch(url, { method: 'POST', body, keepalive: true, headers: { 'Content-Type': 'application/json' } }).catch(() => undefined);
  }
}

function voluumCallback(params: Record<string, unknown>): void {
  if (!config.voluumDomain) return;
  const url = `https://${config.voluumDomain}/postback?${new URLSearchParams(
    Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)]))
  ).toString()}`;
  fetch(url, { mode: 'no-cors', keepalive: true }).catch(() => undefined);

  if (typeof window.dtpCallback === 'function') {
    window.dtpCallback(params);
  }
}

export function trackEvent(event: string, extra: Record<string, unknown> = {}): void {
  window.dataLayer = window.dataLayer || [];
  const cid = getClickId();
  const gclid = safeGet('google_gclid');
  const base = { event, clickId: cid, gclid, timestamp: new Date().toISOString(), ...extra };
  window.dataLayer.push(base);
  sendPixel(base);
}

export function trackFormStart(): void {
  trackEvent('fo_form_start');
}

export function trackFormStep(step: number): void {
  trackEvent('fo_form_progress', { step });
}

export function trackFormSubmit(): void {
  trackEvent('fo_form_submit');
}

export function trackConversion(data: {
  type: string;
  lead_id: string;
  price?: number;
  created?: string;
}): void {
  const cid = getClickId();
  const gclid = safeGet('google_gclid');
  const payout = data.price ?? 0;

  let status = 'pending';
  if (data.type === 'soldLead') status = 'approved';
  else if (data.type === 'rejectLead') status = 'declined';

  const finalPayout = payout > 0 ? payout : status === 'declined' ? 5.0 : 50.0;

  const payload = {
    transaction_id: data.lead_id,
    value: finalPayout,
    currency: 'USD',
    status,
    type: data.type,
    click_id: cid,
    gclid,
    created: data.created,
  };

  trackEvent('fo_lead_all', { leadData: payload, conversionValue: finalPayout, leadStatus: status });

  if (data.type === 'soldLead') {
    trackEvent('fo_lead_approved', { leadData: payload, conversionValue: finalPayout });
    voluumCallback({ cid, payout: finalPayout, status: 'approved', tid: data.lead_id });
  }

  if (data.type === 'rejectLead') {
    trackEvent('fo_lead_declined', { leadData: payload, conversionValue: finalPayout });
    voluumCallback({ cid, payout: finalPayout, status: 'declined', tid: data.lead_id });
  }

  if (data.type === 'newLead') {
    trackEvent('fo_lead_pending', { leadData: payload, conversionValue: finalPayout });
    voluumCallback({ cid, payout: finalPayout, status: 'pending', tid: data.lead_id });
  }
}

export { getClickId };
