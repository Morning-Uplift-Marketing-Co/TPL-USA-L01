import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const faqs = [
  {
    question: 'What is the APR range for TPL-USA-L01 loans?',
    answer: 'TPL-USA-L01 offers APR rates ranging from 0% to 35.99% depending on your credit eligibility and the loan plan you select. Qualified applicants on select plans can access 0% APR financing.',
  },
  {
    question: 'Will applying affect my credit score?',
    answer: "No, checking your rate is safe for your credit. We use a \"soft credit check\" which has zero impact on your credit score — it's the same type of check used when you check your own credit. Your credit score will only be affected if you choose to proceed with a lender who performs a hard inquiry.",
  },
  {
    question: 'How much can I borrow?',
    answer: 'You can borrow between $200 and $10,000 through TPL-USA-L01. The exact amount you are approved for depends on factors such as your credit profile, income, and the specific plan you choose.',
  },
  {
    question: 'How quickly will I receive a decision?',
    answer: 'Most applicants receive an instant decision within seconds of submitting their application. In some cases, a decision may take until the next business day. Once approved, funds are typically available as soon as the next business day.',
  },
  {
    question: 'What expenses can I use the loan for?',
    answer: 'TPL-USA-L01 financing can be used for a wide range of pet care and veterinary expenses, including emergency surgeries, routine and preventive care, dental procedures, medications, specialist visits, and more.',
  },
  {
    question: 'What repayment terms are available?',
    answer: 'Loan repayment terms range from 61 to 2,190 days (approximately 2 months to 6 years), giving you flexibility to choose a payment schedule that fits your budget. You can pay by credit card, debit card, or bank transfer.',
  },
  {
    question: 'How do I contact TPL-USA-L01 support?',
    answer: "You can reach our support team by phone at +1-800-232-7562 or by email at support@tpl-usa-l01.com. We're available Monday through Friday, 9:00 AM to 6:00 PM ET (closed weekends).",
  },
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border border-gray-100 rounded-xl overflow-hidden transition-all duration-200 ${open ? 'shadow-md border-teal-200' : 'hover:border-gray-200'}`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-teal-50/50 transition-colors"
      >
        <span className={`font-semibold text-sm sm:text-base transition-colors ${open ? 'text-teal-700' : 'text-gray-900'}`}>
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`text-gray-400 shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-teal-600' : ''}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}
      >
        <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed bg-white border-t border-gray-50 pt-3">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { ref, inView } = useInView();

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 items-start">
          <div ref={ref} className="lg:sticky lg:top-24">
            <span
              className={`inline-block text-teal-700 font-semibold text-sm uppercase tracking-widest mb-3 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              Got Questions?
            </span>
            <h2
              className={`text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              Frequently Asked Questions
            </h2>
            <p
              className={`text-gray-500 mb-8 leading-relaxed transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              Everything you need to know about TPL-USA-L01 pet care financing. Can't find your answer?
            </p>
            <div
              className={`bg-teal-50 border border-teal-100 rounded-2xl p-5 transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <p className="text-teal-800 font-semibold text-sm mb-1">Still have questions?</p>
              <p className="text-teal-600 text-sm mb-4">Our team is ready to help you understand your options.</p>
              <a
                href="tel:+18002327562"
                className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              >
                Call +1-800-232-7562
              </a>
            </div>
          </div>

          <div
            className={`lg:col-span-2 space-y-3 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {faqs.map(({ question, answer }, i) => (
              <FAQItem key={question} question={question} answer={answer} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
