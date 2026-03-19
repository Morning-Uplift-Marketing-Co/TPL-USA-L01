import { ClipboardList, CheckCircle, Banknote } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const steps = [
  {
    icon: ClipboardList,
    step: '01',
    title: 'Apply Online',
    description:
      'Fill out our simple, 3-minute application. Tell us about yourself and how much you need. No paperwork, no fax, no branch visit required.',
    detail: 'Takes about 3 minutes',
  },
  {
    icon: CheckCircle,
    step: '02',
    title: 'Receive Your Lending Decision',
    description:
      'We use a soft credit inquiry with zero impact on your credit score. All credit types considered — most applicants receive a lending decision in moments.',
    detail: 'Decision in moments',
  },
  {
    icon: Banknote,
    step: '03',
    title: 'Access Your Funds',
    description:
      'Once approved, funds are deposited directly to your account as soon as the next business day — so you can focus on your pet, not paperwork.',
    detail: 'Funds next business day',
  },
];

export default function HowItWorks() {
  const { ref, inView } = useInView();

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center max-w-2xl mx-auto mb-14">
          <span
            className={`inline-block text-teal-700 font-semibold text-sm uppercase tracking-widest mb-3 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            Simple Process
          </span>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            How It Works
          </h2>
          <p
            className={`text-lg text-gray-500 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            Getting financing for your pet's care is quick, easy, and stress-free. Here's how to get started.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-16 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-0.5 bg-gradient-to-r from-teal-200 via-teal-400 to-teal-200 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {steps.map(({ icon: Icon, step, title, description, detail }, i) => (
              <div
                key={step}
                className={`group transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="relative">
                      <div className="w-14 h-14 bg-teal-50 group-hover:bg-teal-100 rounded-2xl flex items-center justify-center transition-colors shrink-0">
                        <Icon size={26} className="text-teal-700" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-teal-700 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">{step}</span>
                      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-500 leading-relaxed flex-1 mb-5">{description}</p>
                  <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full self-start">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                    {detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
