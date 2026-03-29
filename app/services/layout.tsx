import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services | Kartik Computers',
  description: 'Expert computer, laptop, networking, and CCTV services in Agra. Quick and reliable tech support.'
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
