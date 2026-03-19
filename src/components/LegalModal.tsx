import { useEffect } from 'react';
import { X, PawPrint } from 'lucide-react';

type PageKey =
  | 'about'
  | 'privacy'
  | 'terms'
  | 'disclosures'
  | 'licensing'
  | 'donotsell';

interface LegalModalProps {
  page: PageKey;
  onClose: () => void;
}

const CONTENT: Record<PageKey, { title: string; body: React.ReactNode }> = {
  about: {
    title: 'About Us',
    body: (
      <div className="space-y-5 text-gray-700 text-sm leading-relaxed">
        <p>
          <strong className="text-gray-900">TPL-USA-L01</strong> is an online loan-matching platform
          and marketing service that connects consumers with a network of independent third-party
          lenders who may be able to provide installment loan offers for pet care and veterinary
          expenses.
        </p>
        <p>
          We are <strong>not a direct lender, bank, credit union, broker, or financial advisor.</strong>{' '}
          TPL-USA-L01 does not make credit or lending decisions, does not issue loans, and does not
          collect loan payments. All credit decisions, interest rates, fees, repayment terms, and
          conditions are determined solely by the individual lender you may be matched with.
        </p>
        <h2 className="text-gray-900 font-semibold text-base pt-2">Our Mission</h2>
        <p>
          We believe every pet deserves access to quality veterinary care, regardless of a pet
          owner's immediate financial situation. Our platform is designed to simplify the process
          of finding installment loan options — giving pet owners a fast, transparent starting
          point when unexpected or planned pet care costs arise.
        </p>
        <h2 className="text-gray-900 font-semibold text-base pt-2">How the Matching Process Works</h2>
        <p>
          When you submit a loan inquiry through TPL-USA-L01, we share your information with our
          network of lenders. If a lender is interested in working with you, they will present
          you with a loan offer. You are under no obligation to accept any offer. We strongly
          encourage you to review all loan terms carefully before signing any agreement.
        </p>
        <h2 className="text-gray-900 font-semibold text-base pt-2">Compensation Disclosure</h2>
        <p>
          TPL-USA-L01 may receive compensation from lenders in our network. This compensation
          may influence which lenders appear on our platform but does not affect the loan terms
          offered to you.
        </p>
        <h2 className="text-gray-900 font-semibold text-base pt-2">Contact Us</h2>
        <p>
          Email:{' '}
          <a href="mailto:support@tpl-usa-l01.com" className="text-teal-700 underline">
            support@tpl-usa-l01.com
          </a>
          <br />
          Hours: Mon–Fri 8:00 AM – 8:00 PM EST | Sat 9:00 AM – 5:00 PM EST
        </p>
      </div>
    ),
  },

  privacy: {
    title: 'Privacy Policy',
    body: (
      <div className="space-y-5 text-gray-700 text-sm leading-relaxed">
        <p className="text-xs text-gray-700">Effective Date: January 1, 2025 | Last Updated: March 1, 2025</p>

        <p>
          TPL-USA-L01 ("we," "our," or "us") is committed to protecting your personal information.
          This Privacy Policy explains how we collect, use, share, and safeguard information when
          you visit our website or submit a loan inquiry.
        </p>

        <h2 className="text-gray-900 font-semibold text-base pt-2">1. Information We Collect</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Personal Identifiers:</strong> name, email address, phone number, mailing address, ZIP code, state of residence</li>
          <li><strong>Financial Information:</strong> requested loan amount, self-reported income, employment status</li>
          <li><strong>Device &amp; Technical Data:</strong> IP address, browser type, device identifiers, cookies, session data</li>
          <li><strong>Usage Data:</strong> pages visited, links clicked, time on site</li>
        </ul>

        <h2 className="text-gray-900 font-semibold text-base pt-2">2. How We Use Your Information</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>To match you with lenders in our network who may offer you a loan</li>
          <li>To communicate with you about your loan inquiry or application status</li>
          <li>To improve the performance and user experience of our website</li>
          <li>To comply with applicable laws and regulations</li>
          <li>To detect and prevent fraud or unauthorized access</li>
        </ul>

        <h2 className="text-gray-900 font-semibold text-base pt-2">3. Sharing of Your Information</h2>
        <p>
          We share your personal information with lenders in our network for the purpose of
          presenting you with loan offers. We may also share data with:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Service providers who assist with website operations, analytics, and marketing</li>
          <li>Government authorities or regulators when required by law</li>
          <li>Successor entities in the event of a merger, acquisition, or asset sale</li>
        </ul>
        <p>
          We do not sell your personal information to unaffiliated third parties for their own
          direct marketing purposes without your explicit consent.
        </p>

        <h2 className="text-gray-900 font-semibold text-base pt-2">4. Cookies &amp; Tracking Technologies</h2>
        <p>
          We use cookies and similar tracking technologies to improve your experience, analyze
          site traffic, and serve relevant advertisements. You may disable cookies through your
          browser settings; however, some features of the site may not function properly.
        </p>

        <h2 className="text-gray-900 font-semibold text-base pt-2">5. Data Retention</h2>
        <p>
          We retain personal information for as long as necessary to fulfill the purposes outlined
          in this policy or as required by law.
        </p>

        <h2 className="text-gray-900 font-semibold text-base pt-2">6. Security</h2>
        <p>
          We implement 256-bit SSL encryption and industry-standard security measures to protect
          your information. No method of transmission over the Internet is 100% secure, and we
          cannot guarantee absolute security.
        </p>

        <h2 className="text-gray-900 font-semibold text-base pt-2">7. Your Rights</h2>
        <p>
          Depending on your state of residence, you may have rights to access, correct, delete,
          or restrict the processing of your personal information. California residents have
          additional rights under the CCPA (see "Do Not Sell My Info" section).
        </p>

        <h2 className="text-gray-900 font-semibold text-base pt-2">8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically. Continued use of our website after
          changes are posted constitutes acceptance of the updated policy.
        </p>

        <h2 className="text-gray-900 font-semibold text-base pt-2">9. Contact</h2>
        <p>
          Privacy questions:{' '}
          <a href="mailto:privacy@tpl-usa-l01.com" className="text-teal-700 underline">
            privacy@tpl-usa-l01.com
          </a>
        </p>
      </div>
    ),
  },

  terms: {
    title: 'Terms of Service',
    body: (
      <div className="space-y-5 text-gray-700 text-sm leading-relaxed">
        <p className="text-xs text-gray-700">Effective Date: January 1, 2025 | Last Updated: March 1, 2025</p>

        <p>
          Please read these Terms of Service ("Terms") carefully before using the TPL-USA-L01
          website. By accessing or using our site, you agree to be bound by these Terms.
        </p>

        <h2 className="text-gray-900 font-semibold text-base pt-2">1. Nature of Service — Not a Lender</h2>
        <p>
          TPL-USA-L01 is a <strong>loan-matching and marketing platform only</strong>. We are not a
          lender, broker, or financial institution. We do not make credit decisions, issue loans,
          determine interest rates, or set repayment terms. Those decisions are made solely by the
          independent third-party lenders in our network.
        </p>

        <h2 className="text-gray-900 font-semibold text-base pt-2">2. No Guarantee of Matching or Approval</h2>
        <p>
          Submitting a loan inquiry through our platform does not guarantee that you will be
          matched with a lender, receive a loan offer, or be approved for a loan. Lender
          availability varies by state and individual eligibility.
        </p>

        <h2 className="text-gray-900 font-semibold text-base pt-2">3. Loan Terms</h2>
        <p>
          Loan amounts in our network range from $200 to $10,000. APRs range from 0% to 35.99%.
          Repayment terms range from 61 to 2,190 days. Actual APR, fees, and terms are determined
          by the lender based on your creditworthiness, income, and applicable law.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <strong className="text-amber-800 block mb-1">Representative Example</strong>
          <p className="text-amber-800">
            A $3,000 loan over 24 months at a representative APR of 9.99% (fixed) results in
            24 monthly payments of approximately $138.32, with a total amount repayable of $3,319.68.
            Rates and terms vary by lender and applicant profile.
          </p>
        </div>

        <h2 className="text-gray-900 font-semibold text-base pt-2">4. Credit Inquiries</h2>
        <p>
          TPL-USA-L01 uses a <strong>soft credit inquiry</strong> that does not impact your credit
          score. If you proceed with a lender, that lender may conduct a hard credit inquiry, which
          may affect your credit score.
        </p>

        <h2 className="text-gray-900 font-semibold text-base pt-2">5. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Provide false or misleading information in your loan inquiry</li>
          <li>Use the site for any unlawful purpose</li>
          <li>Attempt to gain unauthorized access to our systems</li>
        </ul>

        <h2 className="text-gray-900 font-semibold text-base pt-2">6. Disclaimer of Warranties</h2>
        <p>
          The site and services are provided "as is" without warranties of any kind. We do not
          warrant that the site will be uninterrupted or error-free.
        </p>

        <h2 className="text-gray-900 font-semibold text-base pt-2">7. Limitation of Liability</h2>
        <p>
          TPL-USA-L01 is not liable for any indirect, incidental, or consequential damages arising
          from your use of the platform or any loan agreement entered into with a third-party lender.
        </p>

        <h2 className="text-gray-900 font-semibold text-base pt-2">8. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the United States and the state in which you
          reside, without regard to conflict of law principles.
        </p>

        <h2 className="text-gray-900 font-semibold text-base pt-2">9. Contact</h2>
        <p>
          Legal inquiries:{' '}
          <a href="mailto:legal@tpl-usa-l01.com" className="text-teal-700 underline">
            legal@tpl-usa-l01.com
          </a>
        </p>
      </div>
    ),
  },

  disclosures: {
    title: 'Important Disclosures',
    body: (
      <div className="space-y-5 text-gray-700 text-sm leading-relaxed">
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
          <strong className="text-teal-900 block mb-1">TPL-USA-L01 is NOT a Direct Lender</strong>
          <p className="text-teal-800">
            TPL-USA-L01 is a loan-matching platform and marketing service, not a direct lender,
            broker, or agent. We connect consumers with independent third-party lenders. We do not
            make credit decisions or issue loans.
          </p>
        </div>

        <h2 className="text-gray-900 font-semibold text-base pt-2">Loan Range &amp; APR Disclosure</h2>
        <p>
          Loan amounts available through our network: <strong>$200 – $10,000</strong><br />
          APR range: <strong>0% – 35.99%</strong><br />
          Repayment terms: <strong>61 – 2,190 days (approximately 2 months to 6 years)</strong>
        </p>

        <h2 className="text-gray-900 font-semibold text-base pt-2">Representative Example</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
            <span className="text-gray-500">Loan Amount</span><span className="font-semibold text-gray-900">$3,000.00</span>
            <span className="text-gray-500">Repayment Term</span><span className="font-semibold text-gray-900">24 months</span>
            <span className="text-gray-500">Representative APR</span><span className="font-semibold text-gray-900">9.99% (fixed)</span>
            <span className="text-gray-500">Monthly Payment</span><span className="font-semibold text-gray-900">~$138.32</span>
            <span className="text-gray-500">Total Interest</span><span className="font-semibold text-gray-900">$319.68</span>
            <span className="text-gray-500">Total Repayable</span><span className="font-semibold text-gray-900">$3,319.68</span>
          </div>
          <p className="text-xs text-gray-500 pt-1">
            This is a representative example only. Actual rates and terms depend on your credit
            profile, income, requested loan amount, and lender policies.
          </p>
        </div>

        <h2 className="text-gray-900 font-semibold text-base pt-2">Credit Inquiry Disclosure</h2>
        <p>
          TPL-USA-L01 performs a <strong>soft credit inquiry</strong> during your request process.
          Soft inquiries do not affect your credit score and are not visible to other lenders.
          If you are matched with a lender and proceed with an application, that lender may perform
          a <strong>hard credit inquiry</strong>, which may temporarily affect your credit score.
        </p>

        <h2 className="text-gray-900 font-semibold text-base pt-2">State Availability</h2>
        <p>
          Loan products and availability vary by state. This service is not available in all
          states. Residents of certain states may not be eligible for any loan offers through
          our network. State-specific APR caps and terms may apply.
        </p>

        <h2 className="text-gray-900 font-semibold text-base pt-2">No Guarantee Disclosure</h2>
        <p>
          Submitting a request does not guarantee you will be matched with a lender or receive a
          loan offer. Not all applicants qualify. Loan decisions are made solely by the third-party
          lenders in our network.
        </p>

        <h2 className="text-gray-900 font-semibold text-base pt-2">Third-Party Lender Disclaimer</h2>
        <p>
          TPL-USA-L01 is not responsible for the actions, terms, communications, or decisions of
          any third-party lender. You should review all loan documents carefully before signing.
          If you have concerns about your loan terms or lender conduct, contact the lender directly
          or file a complaint with the Consumer Financial Protection Bureau (CFPB) at
          consumerfinance.gov.
        </p>

        <h2 className="text-gray-900 font-semibold text-base pt-2">Predatory Lending Warning</h2>
        <p>
          Be aware of the total cost of credit. Always compare APRs and total repayable amounts
          across multiple lenders. If you are having difficulty repaying a loan, contact your
          lender immediately to discuss repayment options.
        </p>
      </div>
    ),
  },

  licensing: {
    title: 'Licensing Disclosures',
    body: (
      <div className="space-y-5 text-gray-700 text-sm leading-relaxed">
        <p>
          TPL-USA-L01 operates as a loan-matching and marketing platform. The following disclosures
          outline our licensing status and regulatory compliance.
        </p>

        <h2 className="text-gray-900 font-semibold text-base pt-2">Nature of Business</h2>
        <p>
          TPL-USA-L01 is not a licensed lender, mortgage broker, or financial institution. We
          do not solicit loan applications on behalf of licensed lenders. We operate as a
          marketing platform that connects consumers with independent third-party lenders who
          hold their own applicable licenses.
        </p>

        <h2 className="text-gray-900 font-semibold text-base pt-2">Third-Party Lender Licensing</h2>
        <p>
          Lenders in our network are responsible for maintaining all required state and federal
          licenses to offer consumer loans. Each lender is independently licensed and regulated
          in the states where they operate. TPL-USA-L01 does not warrant or represent the
          licensing status of any third-party lender.
        </p>

        <h2 className="text-gray-900 font-semibold text-base pt-2">Federal Compliance</h2>
        <p>
          Third-party lenders in our network are required to comply with applicable federal
          consumer protection laws, including:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Truth in Lending Act (TILA):</strong> Requires clear disclosure of loan terms, APR, and total costs</li>
          <li><strong>Equal Credit Opportunity Act (ECOA):</strong> Prohibits discrimination in lending</li>
          <li><strong>Fair Credit Reporting Act (FCRA):</strong> Governs use of consumer credit information</li>
          <li><strong>Gramm-Leach-Bliley Act (GLBA):</strong> Governs privacy of consumer financial information</li>
          <li><strong>Electronic Signatures in Global and National Commerce Act (E-SIGN):</strong> Enables electronic agreements</li>
        </ul>

        <h2 className="text-gray-900 font-semibold text-base pt-2">State Licensing Variability</h2>
        <p>
          Loan availability and terms are subject to state law. Lenders in our network may not
          be licensed in every state. Submitting a request does not guarantee the availability
          of loan offers in your state.
        </p>

        <h2 className="text-gray-900 font-semibold text-base pt-2">Regulatory Contacts</h2>
        <p>
          If you have concerns about a lender's conduct or licensing, you may contact:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Consumer Financial Protection Bureau (CFPB): consumerfinance.gov | 1-855-411-2372</li>
          <li>Your state's Department of Financial Institutions or Banking Regulator</li>
          <li>Federal Trade Commission (FTC): ftc.gov</li>
        </ul>

        <h2 className="text-gray-900 font-semibold text-base pt-2">Advertising Compliance</h2>
        <p>
          All advertising and marketing materials produced by TPL-USA-L01 are intended to be
          truthful, non-deceptive, and compliant with applicable federal and state advertising
          laws, including guidelines set forth by the FTC and CFPB.
        </p>

        <h2 className="text-gray-900 font-semibold text-base pt-2">Contact</h2>
        <p>
          Compliance inquiries:{' '}
          <a href="mailto:compliance@tpl-usa-l01.com" className="text-teal-700 underline">
            compliance@tpl-usa-l01.com
          </a>
        </p>
      </div>
    ),
  },

  donotsell: {
    title: 'Do Not Sell My Personal Information',
    body: (
      <div className="space-y-5 text-gray-700 text-sm leading-relaxed">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <strong className="text-amber-800 block mb-1">California Residents — CCPA Rights</strong>
          <p className="text-amber-800">
            Under the California Consumer Privacy Act (CCPA), California residents have the right
            to opt out of the "sale" of their personal information to third parties.
          </p>
        </div>

        <h2 className="text-gray-900 font-semibold text-base pt-2">What "Sale" Means Under CCPA</h2>
        <p>
          Under the CCPA, "sale" broadly includes sharing personal information with third parties
          for monetary or other valuable consideration. When we share your information with lenders
          in our network in exchange for compensation, this may constitute a "sale" under California
          law.
        </p>

        <h2 className="text-gray-900 font-semibold text-base pt-2">Your Right to Opt Out</h2>
        <p>
          You have the right to direct us to not sell your personal information. To exercise this
          right, you may:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Email us at: <a href="mailto:privacy@tpl-usa-l01.com" className="text-teal-700 underline">privacy@tpl-usa-l01.com</a> with the subject line "Do Not Sell My Information"</li>
          <li>Include your full name, email address, and state of residence in your request</li>
        </ul>
        <p>
          We will process your request within 45 days. We will not discriminate against you for
          exercising your CCPA rights.
        </p>

        <h2 className="text-gray-900 font-semibold text-base pt-2">Additional CCPA Rights</h2>
        <p>California residents also have the right to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Right to Know:</strong> Request disclosure of the categories and specific pieces of personal information we have collected about you</li>
          <li><strong>Right to Delete:</strong> Request deletion of personal information we have collected, subject to certain exceptions</li>
          <li><strong>Right to Correct:</strong> Request correction of inaccurate personal information</li>
          <li><strong>Right to Non-Discrimination:</strong> We will not deny services or charge different prices because you exercised your privacy rights</li>
        </ul>

        <h2 className="text-gray-900 font-semibold text-base pt-2">Information We May Share</h2>
        <p>
          We may share the following categories of personal information with our lender network:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Identifiers (name, email, phone, address, IP address)</li>
          <li>Financial information (loan amount requested, income, employment status)</li>
          <li>Internet or network activity (browsing behavior on our site)</li>
          <li>Geolocation data (state/ZIP code)</li>
        </ul>

        <h2 className="text-gray-900 font-semibold text-base pt-2">For All Other Residents</h2>
        <p>
          Even if you are not a California resident, you may request that we limit the sharing of
          your personal information by contacting us at the email above. We will make reasonable
          efforts to honor such requests.
        </p>

        <h2 className="text-gray-900 font-semibold text-base pt-2">Contact for Privacy Requests</h2>
        <p>
          <a href="mailto:privacy@tpl-usa-l01.com" className="text-teal-700 underline">
            privacy@tpl-usa-l01.com
          </a>
          <br />
          Response time: within 45 days of receipt
        </p>
      </div>
    ),
  },
};

export default function LegalModal({ page, onClose }: LegalModalProps) {
  const { title, body } = CONTENT[page];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto py-8 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl animate-fade-up">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-teal-800 px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center shrink-0">
                <PawPrint size={16} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-base leading-tight" id="legal-modal-title">
                  {title}
                </p>
                <p className="text-teal-300 text-xs mt-0.5">TPL-USA-L01 — Legal &amp; Compliance</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-teal-700 hover:bg-teal-600 rounded-lg flex items-center justify-center text-white transition-colors shrink-0"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
            {body}
          </div>

          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-4">
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} TPL-USA-L01. TPL-USA-L01 is not a direct lender.
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
