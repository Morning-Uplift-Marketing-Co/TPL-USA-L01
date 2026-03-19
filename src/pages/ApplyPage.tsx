import { useEffect } from 'react';
import { getClickId, trackFormStart, trackFormStep, trackFormSubmit, trackConversion } from '../lib/tracking';

declare global {
  interface Window {
    _lg_form_init_: Record<string, unknown>;
  }
}

export default function ApplyPage() {
  useEffect(() => {
    window._lg_form_init_ = {
      aid: '14881',
      template: 'fresh',
      ref: window.location.hostname,
      click_id: getClickId(),

      onFormLoad: function () {
        trackFormStart();
      },

      onStepChange: function (step: number) {
        trackFormStep(step);
      },

      onSubmit: function () {
        trackFormSubmit();
      },

      onSuccess: function (data: {
        type: string;
        lead_id: string;
        price?: number;
        created?: string;
      }) {
        trackConversion(data);
      },
    };

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://apikeep.com/form/applicationInit.js';
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return <div id="_lg_form_" />;
}
