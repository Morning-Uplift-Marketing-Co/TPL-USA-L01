import { useState } from 'react';
import { Shield, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { supabase, LoanApplication } from '../lib/supabase';
import { useInView } from '../hooks/useInView';

type PageKey = 'about' | 'privacy' | 'terms' | 'disclosures' | 'licensing' | 'donotsell';

export interface ApplyFormProps {
  modal?: boolean;
  onOpenLegal?: (page: PageKey) => void;
}

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming',
];

type FormState = 'idle' | 'loading' | 'success' | 'error';

const initialForm: LoanApplication = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  state: '',
  requested_amount: 3000,
};

type Errors = Partial<Record<keyof LoanApplication, string>>;

function validate(form: LoanApplication): Errors {
  const errors: Errors = {};
  if (!form.first_name.trim()) errors.first_name = 'We'll need your first name to process your application';
  if (!form.last_name.trim()) errors.last_name = 'We'll need your last name to process your application';
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = 'Please enter a valid email (we\'ll send your confirmation here)';
  if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10)
    errors.phone = 'Please enter a 10-digit phone number so we can reach you with updates';
  if (!form.state) errors.state = 'Please select your state to continue';
  if (form.requested_amount < 200 || form.requested_amount > 10000)
    errors.requested_amount = 'Please select an amount between $200 and $10,000 — adjust the slider above';
  return errors;
}

function FormContent({ modal = false, onOpenLegal }: ApplyFormProps) {
  const { ref, inView } = useInView();
  const [form, setForm] = useState<LoanApplication>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [formState, setFormState] = useState<FormState>('idle');

  const update = (field: keyof LoanApplication, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setFormState('loading');
    try {
      const { error } = await supabase.from('loan_applications').insert([form]);
      if (error) throw error;
      setFormState('success');
    } catch {
      setFormState('error');
    }
  };

  const inputClass = (field: keyof LoanApplication) =>
    `w-full px-4 py-3 rounded-xl border text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
      errors[field]
        ? 'border-red-300 focus:ring-red-200 bg-red-50'
        : 'border-gray-200 focus:ring-teal-200 focus:border-teal-400 bg-white'
    }`;

  if (formState === 'success') {
    return (
      <div className={modal ? 'p-10 text-center' : 'py-16 px-4 text-center'}>
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-teal-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Application received, {form.first_name}!</h2>
          <p className="text-gray-600 mb-6">
            We're reviewing your information now. Most applicants receive a decision within 60 seconds.
          </p>
          <div className="bg-teal-50 rounded-xl p-4 text-sm text-teal-700 mb-6">
            <strong>Check your inbox at {form.email}</strong> — we've sent you a confirmation with your application details.
          </div>
          <button
            onClick={() => { setForm(initialForm); setFormState('idle'); }}
            aria-label="Start new application"
            className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
          >
            Start new application
          </button>
        </div>
      </div>
    );
  }

  const innerForm = (
    <form onSubmit={handleSubmit} className={modal ? 'p-7 md:p-8' : 'bg-white rounded-3xl p-7 md:p-8 shadow-2xl'}>
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          How much do you need?
        </label>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-teal-700">
            ${form.requested_amount.toLocaleString()}
          </span>
          <span className="text-xs text-gray-400">$200 – $10,000</span>
        </div>
        <input
          type="range"
          min={200}
          max={10000}
          step={100}
          value={form.requested_amount}
          onChange={(e) => update('requested_amount', Number(e.target.value))}
          aria-label="Requested loan amount - use arrow keys to adjust between $200 and $10,000"
          className="w-full accent-teal-600 cursor-pointer"
        />
        <p className="text-xs text-gray-500 mt-1.5">Most pet owners borrow $2,000-$5,000</p>
        {errors.requested_amount && (
          <p className="text-red-500 text-xs mt-1">{errors.requested_amount}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
          <input
            type="text"
            placeholder="Jane"
            value={form.first_name}
            onChange={(e) => update('first_name', e.target.value)}
            aria-label="First name"
            className={inputClass('first_name')}
          />
          {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
          <input
            type="text"
            placeholder="Smith"
            value={form.last_name}
            onChange={(e) => update('last_name', e.target.value)}
            aria-label="Last name"
            className={inputClass('last_name')}
          />
          {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
        <input
          type="email"
          placeholder="jane@example.com"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          aria-label="Email address"
          className={inputClass('email')}
        />
        <p className="text-xs text-gray-500 mt-1.5">We'll send your confirmation here</p>
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
          <input
            type="tel"
            placeholder="(555) 123-4567"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            aria-label="Phone number"
            className={inputClass('phone')}
          />
          <p className="text-xs text-gray-500 mt-1.5">We'll text you updates</p>
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
          <select
            value={form.state}
            onChange={(e) => update('state', e.target.value)}
            aria-label="State"
            className={inputClass('state')}
          >
            <option value="">Select your state</option>
            {US_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1.5">Availability varies by location</p>
          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
        </div>
      </div>

      {formState === 'error' && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
          <AlertCircle size={16} className="text-red-500 shrink-0" />
          <p className="text-red-600 text-sm">We're having trouble processing your application. Please try again in a moment, or call us at +1-800-232-7562 and we'll help you right away.</p>
        </div>
      )}

      <div className="mb-4 flex items-center justify-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <CheckCircle size={14} className="text-teal-600" />
          Takes 3 minutes
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle size={14} className="text-teal-600" />
          Soft credit check only
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle size={14} className="text-teal-600" />
          No obligation
        </span>
      </div>

      <button
        type="submit"
        disabled={formState === 'loading'}
        aria-label="Submit loan application - will not affect credit score"
        className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-bold text-base py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 disabled:cursor-not-allowed"
      >
        {formState === 'loading' ? (
          <>
            <Loader size={18} className="animate-spin" />
            Checking eligibility...
          </>
        ) : (
          'Check My Rate (Won\'t Affect Credit Score)'
        )}
      </button>

      <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed">
        By submitting, you agree to our{' '}
        <button
          type="button"
          onClick={() => onOpenLegal?.('terms')}
          className="underline hover:text-gray-600 transition-colors"
        >
          Terms of Service
        </button>{' '}
        and{' '}
        <button
          type="button"
          onClick={() => onOpenLegal?.('privacy')}
          className="underline hover:text-gray-600 transition-colors"
        >
          Privacy Policy
        </button>.
        A soft credit inquiry will be performed and will not affect your credit score.
      </p>
    </form>
  );

  if (modal) {
    return innerForm;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
      <div ref={ref}>
        <span
          className={`inline-block text-amber-400 font-semibold text-sm uppercase tracking-widest mb-4 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          Get Started Today
        </span>
        <h2
          className={`text-3xl sm:text-4xl font-extrabold text-white mb-5 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          Check Your Rate in 3 Minutes
        </h2>
        <p
          className={`text-teal-200 text-lg leading-relaxed mb-8 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          Fill out our quick pre-qualification form. There's no commitment and no hard credit pull — your credit score won't be affected.
        </p>
        <div
          className={`space-y-4 transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {[
            { icon: Shield, text: 'Soft credit check only — zero impact on your score' },
            { icon: CheckCircle, text: 'Instant decision in most cases' },
            { icon: CheckCircle, text: 'Borrow $200 to $10,000 for any pet care need' },
            { icon: CheckCircle, text: '0% APR available for qualified applicants' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <Icon size={18} className="text-amber-400 shrink-0" />
              <span className="text-teal-100 text-sm">{text}</span>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        {innerForm}
      </div>
    </div>
  );
}

export default function ApplyForm({ modal = false, onOpenLegal }: ApplyFormProps) {
  if (modal) {
    return <FormContent modal onOpenLegal={onOpenLegal} />;
  }

  return (
    <section id="apply" className="py-20 lg:py-28 bg-teal-900 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FormContent onOpenLegal={onOpenLegal} />
      </div>
    </section>
  );
}
