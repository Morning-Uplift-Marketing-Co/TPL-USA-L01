/*
  # BearLoanNow Database Schema

  ## Overview
  Creates all tables needed for the BearLoanNow pet care financing website.

  ## New Tables

  ### 1. loan_applications
  Stores pre-qualification form submissions from prospective borrowers.
  - id: UUID primary key
  - first_name, last_name: Applicant name
  - email: Contact email address
  - phone: Contact phone number
  - state: US state for eligibility
  - requested_amount: Desired loan amount ($200-$10,000)
  - created_at: Submission timestamp

  ### 2. reviews
  Customer testimonials displayed on the website.
  - id: UUID primary key
  - customer_name: Reviewer name
  - rating: Star rating (1-5)
  - quote: Review text content
  - pet_type: Type of pet (e.g., "Dog", "Cat")
  - is_featured: Whether to show on homepage
  - created_at: When review was added

  ### 3. faq_items
  FAQ accordion content manageable without code changes.
  - id: UUID primary key
  - question: The FAQ question text
  - answer: The FAQ answer text
  - sort_order: Display order
  - is_active: Whether to show this FAQ

  ## Security
  - RLS enabled on all tables
  - Public can INSERT loan applications (anonymous form submission)
  - Public can SELECT featured reviews and active FAQs (public content)
  - No public UPDATE or DELETE allowed on any table
*/

CREATE TABLE IF NOT EXISTS loan_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL DEFAULT '',
  last_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  state text NOT NULL DEFAULT '',
  requested_amount numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE loan_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a loan application"
  ON loan_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL DEFAULT '',
  rating integer NOT NULL DEFAULT 5,
  quote text NOT NULL DEFAULT '',
  pet_type text NOT NULL DEFAULT '',
  is_featured boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view featured reviews"
  ON reviews
  FOR SELECT
  TO anon
  USING (is_featured = true);

CREATE TABLE IF NOT EXISTS faq_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL DEFAULT '',
  answer text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active FAQs"
  ON faq_items
  FOR SELECT
  TO anon
  USING (is_active = true);
