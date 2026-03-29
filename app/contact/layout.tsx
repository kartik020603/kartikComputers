import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Kartik Computers | Agra',
  description: 'Get in touch with Kartik Computers in Agra. Call us directly at +91 84106 17268 or book an enquiry online.'
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
