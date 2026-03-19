import { PawPrint, Mail, Facebook, Twitter, Linkedin, Clock } from 'lucide-react';
import { config } from '../lib/fusionops';

type PageKey = 'about' | 'privacy' | 'terms' | 'disclosures' | 'licensing' | 'donotsell';

interface FooterProps {
  onOpenLegal: (page: PageKey) => void;
}

export default function Footer({ onOpenLegal }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const brand = config.brand;

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          <div>
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-teal-700 rounded-xl flex items-center justify-center">
                <PawPrint size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {brand}
              </span>
            </a>
            <p className="text-sm leading-relaxed text-gray-400 mb-5">
              Flexible payment plans and installment loans for pet care expenses. Helping pet owners get the care their animals deserve without financial stress.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Facebook social media link" className="w-9 h-9 bg-gray-800 hover:bg-teal-700 rounded-lg flex items-center justify-center transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" aria-label="Twitter social media link" className="w-9 h-9 bg-gray-800 hover:bg-teal-700 rounded-lg flex items-center justify-center transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" aria-label="LinkedIn social media link" className="w-9 h-9 bg-gray-800 hover:bg-teal-700 rounded-lg flex items-center justify-center transition-colors">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">For Pet Parents</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'How It Works', href: '#how-it-works' },
                { label: 'Payment Options', href: '#features' },
                { label: 'Eligible Expenses', href: '#expenses' },
                { label: 'FAQ', href: '#faq' },
                { label: 'Check Eligibility', href: '#apply' },
              ].map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    aria-label={`Navigate to ${link.label}`}
                    className="text-sm text-gray-400 hover:text-teal-400 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Support</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-teal-500 shrink-0" />
                <a href="mailto:support@tpl-usa-l01.com" className="hover:text-teal-400 transition-colors">support@tpl-usa-l01.com</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={15} className="mt-0.5 text-teal-500 shrink-0" />
                <span>
                  Mon–Fri: 8:00 AM – 8:00 PM EST<br />
                  Sat: 9:00 AM – 5:00 PM EST
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onOpenLegal('about')} aria-label="Open About Us" className="text-gray-400 hover:text-teal-400 transition-colors text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('privacy')} aria-label="Open Privacy Policy" className="text-gray-400 hover:text-teal-400 transition-colors text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('terms')} aria-label="Open Terms of Service" className="text-gray-400 hover:text-teal-400 transition-colors text-left">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('disclosures')} aria-label="Open Disclosures" className="text-gray-400 hover:text-teal-400 transition-colors text-left">
                  Disclosures
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="bg-gray-900 rounded-xl p-5 mb-8 text-xs text-gray-500 leading-relaxed space-y-3">
            <strong className="text-gray-400 block">Important Disclosures — Not a Direct Lender</strong>
            <p>
              {brand} is a loan-matching platform and marketing service, <strong className="text-gray-400">not a direct lender, broker, or agent</strong>. We connect consumers with a network of independent third-party lenders. We do not make credit decisions or issue loans. Submission of a request does not guarantee you will be matched with a lender or receive a loan offer.
            </p>
            <p>
              Installment loan amounts available through our network range from <strong className="text-gray-400">$200 to $10,000</strong>, with Annual Percentage Rates (APR) ranging from <strong className="text-gray-400">0% to 35.99%</strong> and repayment terms of <strong className="text-gray-400">61 to 2,190 days</strong>. Representative example: borrowing $3,000 over 24 months at a representative APR of 9.99% (fixed) results in monthly repayments of approximately $138.32, with a total amount repayable of $3,319.68. Actual rates and terms are set solely by the lender and depend on your credit profile, income, and applicable state law.
            </p>
            <p>
              <strong className="text-gray-400">All credit types considered.</strong> We use a soft credit inquiry during the request process — this does not impact your credit score. If you are matched with a lender, that lender may perform a hard credit inquiry which could affect your score. This is not a commitment to lend. Loan availability, amounts, and rates vary by state. Residents of certain states may not be eligible. Not all applicants will qualify or receive the lowest APR.
            </p>
            <p className="text-gray-400">
              {brand} is not a bank. This service is not available in all states. We are not responsible for the actions, terms, or decisions of any third-party lender. Please review all loan documents carefully before signing. If you have concerns about your loan, contact your lender directly.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-400">
              &copy; {currentYear} {brand}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <button onClick={() => onOpenLegal('privacy')} aria-label="Open Privacy Policy" className="text-gray-400 hover:text-gray-400 transition-colors">
                Privacy Policy
              </button>
              <button onClick={() => onOpenLegal('terms')} aria-label="Open Terms of Service" className="text-gray-400 hover:text-gray-400 transition-colors">
                Terms of Service
              </button>
              <button onClick={() => onOpenLegal('licensing')} aria-label="Open Licensing Disclosures" className="text-gray-400 hover:text-gray-400 transition-colors">
                Licensing Disclosures
              </button>
              <button onClick={() => onOpenLegal('donotsell')} aria-label="Open Do Not Sell My Info" className="text-gray-400 hover:text-gray-400 transition-colors">
                Do Not Sell My Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
