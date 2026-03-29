import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | 21+ Years of Trust | Best Computer Shop in Agra',
  description: 'With over two decades of leading experience, Kartik Computers is the most trusted source for Laptops, CCTV, and IT services in Agra. Visit us today.'
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
