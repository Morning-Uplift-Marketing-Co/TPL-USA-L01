import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { config } from '../lib/fusionops';

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = document.documentElement.scrollHeight * 0.3;
      setVisible(window.scrollY > threshold);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ctaHref = config.ctaHref;
  const ctaLabel = config.cta;
  const isExternal = ctaHref.startsWith('http');

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md border-t border-gray-100 px-4 py-3 flex items-center gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-800 leading-tight">Pet loans from $200–$10,000</p>
          <p className="text-xs text-gray-500 leading-tight">Safe for your credit · No hard pull</p>
        </div>
        {isExternal ? (
          <a
            href={ctaHref}
            className="shrink-0 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200"
          >
            {ctaLabel}
          </a>
        ) : (
          <Link
            to={ctaHref}
            className="shrink-0 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
