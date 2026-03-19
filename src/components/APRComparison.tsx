import { CheckCircle2, XCircle, Info } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const LOAN_AMOUNT = 5000;
const TERM_MONTHS = 60;

function calcMonthly(principal: number, annualRate: number, months: number) {
  if (annualRate === 0) return principal / months;
  const r = annualRate / 100 / 12;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}

const lenders = [
  {
    name: 'TPL-USA-L01',
    highlight: true,
    aprLow: 9.99,
    aprHigh: 35.99,
    reprApr: 9.99,
    hardPull: false,
    petSpecific: true,
    sameDay: true,
    note: 'Representative example',
  },
  {
    name: 'Traditional Bank Installment Loan',
    highlight: false,
    aprLow: 10.99,
    aprHigh: 24.99,
    reprApr: 18.0,
    hardPull: true,
    petSpecific: false,
    sameDay: false,
    note: 'Typical bank rate',
  },
  {
    name: 'Credit Card (Avg.)',
    highlight: false,
    aprLow: 20.49,
    aprHigh: 29.99,
    reprApr: 24.99,
    hardPull: true,
    petSpecific: false,
    sameDay: true,
    note: 'National average APR',
  },
  {
    name: 'Vet Payment Plan',
    highlight: false,
    aprLow: 0,
    aprHigh: 26.99,
    reprApr: 26.99,
    hardPull: true,
    petSpecific: true,
    sameDay: false,
    note: 'Deferred interest risk',
  },
];

export default function APRComparison() {
  const { ref, inView } = useInView();

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center max-w-2xl mx-auto mb-12">
          <span
            className={`inline-block text-teal-700 font-semibold text-sm uppercase tracking-widest mb-3 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            Rate Comparison
          </span>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            See How We Compare
          </h2>
          <p
            className={`text-gray-500 text-lg transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            Based on a representative example of a $5,000 loan over 60 months.
          </p>
        </div>

        <div
          className={`overflow-x-auto rounded-2xl shadow-lg border border-gray-200 transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="text-left px-6 py-4 font-semibold text-gray-300 w-48">Lender</th>
                <th className="text-center px-4 py-4 font-semibold text-gray-300">APR Range</th>
                <th className="text-center px-4 py-4 font-semibold text-gray-300">
                  Monthly Payment
                  <div className="text-gray-500 font-normal text-xs">$5,000 / 60 mo</div>
                </th>
                <th className="text-center px-4 py-4 font-semibold text-gray-300">
                  Total Repayable
                </th>
                <th className="text-center px-4 py-4 font-semibold text-gray-300">No Hard Pull</th>
                <th className="text-center px-4 py-4 font-semibold text-gray-300">Pet-Specific</th>
                <th className="text-center px-4 py-4 font-semibold text-gray-300">Same-Day Fund</th>
              </tr>
            </thead>
            <tbody>
              {lenders.map((l) => {
                const monthly = calcMonthly(LOAN_AMOUNT, l.reprApr, TERM_MONTHS);
                const total = monthly * TERM_MONTHS;
                return (
                  <tr
                    key={l.name}
                    className={`border-t border-gray-100 transition-colors ${
                      l.highlight
                        ? 'bg-teal-50 border-l-4 border-l-teal-600'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-5">
                      <div className={`font-bold ${l.highlight ? 'text-teal-800' : 'text-gray-800'}`}>
                        {l.name}
                        {l.highlight && (
                          <span className="ml-2 inline-block bg-amber-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                            Best Value
                          </span>
                        )}
                      </div>
                      <div className="text-gray-400 text-xs mt-0.5">{l.note}</div>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <span className={`font-bold text-base ${l.highlight ? 'text-teal-700' : 'text-gray-700'}`}>
                        {l.aprLow === 0 ? '0%' : `${l.aprLow}%`}–{l.aprHigh}%
                      </span>
                      <div className="text-gray-400 text-xs mt-0.5">repr. {l.reprApr}% APR</div>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <span className={`font-extrabold text-lg ${l.highlight ? 'text-amber-500' : 'text-gray-800'}`}>
                        ${monthly.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <span className={`font-semibold ${l.highlight ? 'text-teal-700' : 'text-gray-700'}`}>
                        ${total.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-5 text-center">
                      {l.hardPull ? (
                        <XCircle size={20} className="mx-auto text-red-400" />
                      ) : (
                        <CheckCircle2 size={20} className="mx-auto text-teal-600" />
                      )}
                    </td>
                    <td className="px-4 py-5 text-center">
                      {l.petSpecific ? (
                        <CheckCircle2 size={20} className="mx-auto text-teal-600" />
                      ) : (
                        <XCircle size={20} className="mx-auto text-red-400" />
                      )}
                    </td>
                    <td className="px-4 py-5 text-center">
                      {l.sameDay ? (
                        <CheckCircle2 size={20} className="mx-auto text-teal-600" />
                      ) : (
                        <XCircle size={20} className="mx-auto text-red-400" />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div
          className={`mt-6 bg-white border border-gray-200 rounded-xl p-5 transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="flex gap-3 items-start">
            <Info size={16} className="text-teal-600 mt-0.5 shrink-0" />
            <div className="text-xs text-gray-500 leading-relaxed space-y-2">
              <p className="font-semibold text-gray-700">Representative Example — TPL-USA-L01 Installment Loan</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-2">
                {[
                  { label: 'Loan Amount', value: `$${LOAN_AMOUNT.toLocaleString()}` },
                  { label: 'Representative APR', value: '9.99% (fixed)' },
                  { label: 'Loan Term', value: `${TERM_MONTHS} months` },
                  { label: 'Total Repayable', value: `$${(calcMonthly(LOAN_AMOUNT, 9.99, TERM_MONTHS) * TERM_MONTHS).toFixed(2)}` },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-gray-50 rounded-lg p-2.5 text-center">
                    <div className="text-gray-400 text-xs mb-0.5">{label}</div>
                    <div className="font-semibold text-gray-700 text-sm">{value}</div>
                  </div>
                ))}
              </div>
              <p>
                Monthly repayment: <strong>${calcMonthly(LOAN_AMOUNT, 9.99, TERM_MONTHS).toFixed(2)}</strong>.
                Rates available from 0% to 35.99% APR. Your actual rate is determined by your credit
                profile and the lender's offer. All credit types considered. <strong>This is not a guarantee of credit.</strong>{' '}
                Not all applicants will qualify. TPL-USA-L01 is not a direct lender.
              </p>
              <p className="text-gray-400">
                Competitor figures are for illustrative purposes based on publicly available
                national averages. APR = Annual Percentage Rate. All loans subject to lender approval and applicable state law.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
