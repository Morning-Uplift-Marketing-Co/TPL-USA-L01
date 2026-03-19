export type ColorId = 'teal' | 'blue' | 'green' | 'red' | 'orange' | 'slate';
export type FontId = 'inter' | 'poppins' | 'dm-sans' | 'nunito' | 'lato';
export type RadiusId = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type LayoutId = 'centered' | 'split' | 'wide';

export interface FusionOpsConfig {
  colorId: ColorId;
  fontId: FontId;
  radius: RadiusId;
  layout: LayoutId;
  brand: string;
  domain: string;
  h1: string;
  sub: string;
  cta: string;
  ctaHref: string;
  voluumDomain?: string;
}

const ENV = import.meta.env;

export const config: FusionOpsConfig = {
  colorId: (ENV.VITE_FO_COLOR_ID as ColorId) || 'teal',
  fontId: (ENV.VITE_FO_FONT_ID as FontId) || 'inter',
  radius: (ENV.VITE_FO_RADIUS as RadiusId) || 'lg',
  layout: (ENV.VITE_FO_LAYOUT as LayoutId) || 'split',
  brand: ENV.VITE_FO_BRAND || 'TPL-USA-L01',
  domain: ENV.VITE_FO_DOMAIN || 'tpl-usa-l01.com',
  h1: ENV.VITE_FO_H1 || 'Your Pet Deserves the Best Care. We Make It Affordable.',
  sub: ENV.VITE_FO_SUB || 'Flexible installment loans from $200 to $10,000 for veterinary and pet care expenses. All credit types considered.',
  cta: ENV.VITE_FO_CTA || 'Check My Rate',
  ctaHref: ENV.VITE_FO_CTA_HREF || '/apply',
  voluumDomain: ENV.VITE_FO_VOLUUM_DOMAIN || undefined,
};

const COLOR_MAP: Record<ColorId, { primary: string; primaryDark: string; primaryLight: string; accent: string; accentDark: string }> = {
  teal: {
    primary: '#0d9488',
    primaryDark: '#0f766e',
    primaryLight: '#14b8a6',
    accent: '#f59e0b',
    accentDark: '#d97706',
  },
  blue: {
    primary: '#2563eb',
    primaryDark: '#1d4ed8',
    primaryLight: '#3b82f6',
    accent: '#f59e0b',
    accentDark: '#d97706',
  },
  green: {
    primary: '#16a34a',
    primaryDark: '#15803d',
    primaryLight: '#22c55e',
    accent: '#f59e0b',
    accentDark: '#d97706',
  },
  red: {
    primary: '#dc2626',
    primaryDark: '#b91c1c',
    primaryLight: '#ef4444',
    accent: '#f59e0b',
    accentDark: '#d97706',
  },
  orange: {
    primary: '#ea580c',
    primaryDark: '#c2410c',
    primaryLight: '#f97316',
    accent: '#0d9488',
    accentDark: '#0f766e',
  },
  slate: {
    primary: '#475569',
    primaryDark: '#334155',
    primaryLight: '#64748b',
    accent: '#f59e0b',
    accentDark: '#d97706',
  },
};

const FONT_MAP: Record<FontId, string> = {
  inter: "'Inter', system-ui, sans-serif",
  poppins: "'Poppins', system-ui, sans-serif",
  'dm-sans': "'DM Sans', system-ui, sans-serif",
  nunito: "'Nunito', system-ui, sans-serif",
  lato: "'Lato', system-ui, sans-serif",
};

const FONT_URL_MAP: Record<FontId, string> = {
  inter: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
  poppins: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap',
  'dm-sans': 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap',
  nunito: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap',
  lato: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap',
};

const RADIUS_MAP: Record<RadiusId, string> = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  full: '9999px',
};

export function getColors(colorId: ColorId) {
  return COLOR_MAP[colorId] ?? COLOR_MAP.teal;
}

export function getFontFamily(fontId: FontId): string {
  return FONT_MAP[fontId] ?? FONT_MAP.inter;
}

export function getFontUrl(fontId: FontId): string {
  return FONT_URL_MAP[fontId] ?? FONT_URL_MAP.inter;
}

export function getRadius(radius: RadiusId): string {
  return RADIUS_MAP[radius] ?? RADIUS_MAP.lg;
}

export function applyTheme(cfg: FusionOpsConfig): void {
  const colors = getColors(cfg.colorId);
  const radius = getRadius(cfg.radius);
  const font = getFontFamily(cfg.fontId);
  const root = document.documentElement;

  root.style.setProperty('--fo-primary', colors.primary);
  root.style.setProperty('--fo-primary-dark', colors.primaryDark);
  root.style.setProperty('--fo-primary-light', colors.primaryLight);
  root.style.setProperty('--fo-accent', colors.accent);
  root.style.setProperty('--fo-accent-dark', colors.accentDark);
  root.style.setProperty('--fo-radius', radius);
  root.style.setProperty('--fo-font', font);
}
