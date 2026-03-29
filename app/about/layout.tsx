import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | 21 Years of Trust | Kartik Computers',
  description: 'With over 21 years of experience in Agra, Kartik Computers is your most trusted source for Laptops, CCTV, Data Recovery, and professional IT services.'
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
