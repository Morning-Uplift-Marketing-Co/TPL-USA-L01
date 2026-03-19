import {
  Stethoscope,
  Syringe,
  Activity,
  Pill,
  Scissors,
  UserCog,
  FlaskConical,
  Bone,
} from 'lucide-react';
import { useInView } from '../hooks/useInView';

const expenses = [
  {
    icon: Activity,
    title: 'Emergency Care',
    description: 'Unexpected accidents, injuries, or sudden illness requiring immediate veterinary attention.',
  },
  {
    icon: Stethoscope,
    title: 'Routine & Preventive Care',
    description: 'Annual wellness exams, vaccinations, heartworm testing, and flea/tick prevention.',
  },
  {
    icon: Scissors,
    title: 'Surgical Procedures',
    description: 'Orthopedic surgeries, soft tissue operations, tumor removal, and spay/neuter procedures.',
  },
  {
    icon: Bone,
    title: 'Dental Procedures',
    description: 'Professional dental cleaning, tooth extractions, oral surgery, and gum disease treatment.',
  },
  {
    icon: Pill,
    title: 'Medications',
    description: 'Prescription medications, long-term treatment drugs, supplements, and specialty medications.',
  },
  {
    icon: UserCog,
    title: 'Specialist Visits',
    description: 'Cardiology, oncology, dermatology, ophthalmology, and other veterinary specialist consultations.',
  },
  {
    icon: FlaskConical,
    title: 'Diagnostics & Labs',
    description: 'X-rays, MRIs, CT scans, bloodwork, urinalysis, biopsies, and other diagnostic testing.',
  },
  {
    icon: Syringe,
    title: 'Rehabilitation',
    description: 'Physical therapy, hydrotherapy, acupuncture, laser therapy, and post-surgical recovery care.',
  },
];

export default function EligibleExpenses() {
  const { ref, inView } = useInView();

  return (
    <section id="expenses" className="py-20 lg:py-28 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center max-w-2xl mx-auto mb-14">
          <span
            className={`inline-block text-amber-700 font-semibold text-sm uppercase tracking-widest mb-3 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            What's Covered
          </span>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            Eligible Pet Care Expenses
          </h2>
          <p
            className={`text-lg text-gray-500 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            TPL-USA-L01 financing covers a wide range of veterinary and pet care needs — from routine visits to emergency surgeries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {expenses.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className={`group bg-white rounded-2xl p-6 shadow-sm border border-amber-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="w-12 h-12 bg-amber-100 group-hover:bg-amber-200 rounded-2xl flex items-center justify-center mb-4 transition-colors">
                <Icon size={24} className="text-amber-700" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        <div
          className={`mt-12 bg-gradient-to-r from-teal-700 to-teal-800 rounded-2xl p-8 md:p-10 text-center shadow-lg transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <p className="text-white text-lg font-semibold mb-2">
            Not sure if your pet's care qualifies?
          </p>
          <p className="text-teal-200 mb-6 text-sm max-w-xl mx-auto">
            Most veterinary and animal care expenses are eligible. Apply in 3 minutes with no commitment and no impact on your credit score.
          </p>
          <button
            onClick={() => document.querySelector('#apply')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
          >
            Check My Eligibility — Free
          </button>
        </div>
      </div>
    </section>
  );
}
