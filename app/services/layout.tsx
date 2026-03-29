import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best CCTV Shop & Laptop Repair in Agra | Kartik Services',
  description: 'Pro installation for CCTV surveillance, laptop maintenance, and data recovery. Best CCTV shop in Agra for security solutions.'
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
