import { useState } from 'react';
import { Shield, Zap, Star, DollarSign, MapPin } from 'lucide-react';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';
import { config } from '../lib/fusionops';

type PageKey = 'about' | 'privacy' | 'terms' | 'disclosures' | 'licensing' | 'donotsell';

interface HeroProps {
  onOpenLegal: (page: PageKey) => void;
}

const zipSchema = z
  .string()
  .regex(/^\d{5}$/, "Hmm, that doesn't look quite right. Please enter your 5-digit ZIP code (like 90210)");

const trustBadges = [
  { icon: Star, label: '4.9/5 Stars', sub: '2,400+ Reviews' },
  { icon: Shield, label: 'All Credit Welcome', sub: 'Even fair credit' },
  { icon: Zap, label: 'Instant Decision', sub: 'In most cases' },
  { icon: DollarSign, label: '$200 – $10,000', sub: 'Flexible loan amounts' },
];

export default function Hero({ onOpenLegal: _onOpenLegal }: HeroProps) {
  const { ref, inView } = useInView();
  const [zip, setZip] = useState('');
  const [zipError, setZipError] = useState('');
  const navigate = useNavigate();

  const ctaHref = config.ctaHref;
  const ctaLabel = config.cta;
  const h1 = config.h1;
  const sub = config.sub;
  const isExternal = ctaHref.startsWith('http');

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 5);
    setZip(val);
    if (zipError) setZipError('');
  };

  const handleZipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = zipSchema.safeParse(zip);
    if (!result.success) {
      setZipError(result.error.errors[0].message);
      return;
    }
    setZipError('');
    if (isExternal) {
      window.location.href = ctaHref;
    } else {
      navigate(ctaHref);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #0f4c4c 0%, #0d6e6e 40%, #0e7f74 70%, #1a6a5a 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="absolute top-20 right-0 w-96 h-96 bg-teal-400 rounded-full opacity-5 blur-3xl translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400 rounded-full opacity-5 blur-3xl -translate-x-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-32">
          <div ref={ref} className="max-w-3xl">
            <div
              className={`inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
              </span>
              <span className="text-white/90 text-sm font-medium">Trusted Pet Financing — 0% APR for Qualified Applicants</span>
            </div>

            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {h1}
            </h1>

            <p
              className={`text-lg sm:text-xl text-teal-100 leading-relaxed mb-10 max-w-2xl transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {sub}
            </p>

            <div
              className={`mb-14 transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <form onSubmit={handleZipSubmit} className="flex flex-col gap-2 max-w-sm">
                <div className="flex items-stretch shadow-xl rounded-xl overflow-hidden">
                  <div className="relative flex-1">
                    <MapPin
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Your ZIP code"
                      value={zip}
                      onChange={handleZipChange}
                      maxLength={5}
                      aria-label="Your 5-digit ZIP code to find local lenders"
                      className={`w-full h-full pl-9 pr-4 py-4 text-gray-900 font-semibold text-base placeholder-gray-400 focus:outline-none transition-all bg-white ${
                        zipError ? 'ring-2 ring-inset ring-red-400' : ''
                      }`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 active:scale-95 text-white font-bold text-base px-6 py-4 transition-all duration-200 whitespace-nowrap"
                  >
                    {ctaLabel}
                  </button>
                </div>
                {zipError && (
                  <p className="text-red-300 text-xs font-medium pl-1">{zipError}</p>
                )}
                <p className="text-teal-200/70 text-xs pl-1">Won't affect credit score &middot; Decision in 60 seconds</p>
              </form>

              <div className="mt-4">
                {isExternal ? (
                  <a
                    href={ctaHref}
                    className="inline-flex items-center gap-2 text-teal-200 text-sm font-medium hover:text-white transition-colors"
                  >
                    Continue without ZIP code &rarr;
                  </a>
                ) : (
                  <Link
                    to={ctaHref}
                    className="inline-flex items-center gap-2 text-teal-200 text-sm font-medium hover:text-white transition-colors"
                  >
                    Continue without ZIP code &rarr;
                  </Link>
                )}
              </div>
            </div>

            <div
              className={`grid grid-cols-2 lg:grid-cols-4 gap-3 transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {trustBadges.map(({ icon: Icon, label, sub: badgeSub }) => (
                <div
                  key={label}
                  className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-4 hover:bg-white/15 transition-colors"
                >
                  <Icon size={20} className="text-amber-400 mb-2" />
                  <div className="text-white font-semibold text-sm">{label}</div>
                  <div className="text-teal-200 text-xs mt-0.5">{badgeSub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L1440 60L1440 0C1200 50 800 60 720 60C640 60 240 50 0 0L0 60Z" fill="#f8fafc" />
          </svg>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <img
            src="https://images.pexels.com/photos/1350591/pexels-photo-1350591.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-10 hidden lg:block"
            style={{ maskImage: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 100%)' }}
          />
        </div>
      </section>
    </>
  );
}
