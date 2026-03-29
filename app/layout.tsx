import type { Metadata } from 'next';
import './globals.css';
import LayoutWrapper from './components/LayoutWrapper';

export const metadata: Metadata = {
  title: {
    template: '%s | Kartik Computers Agra',
    default: 'Kartik Computers | Best Computer & Laptop Shop in Agra',
  },
  description: 'Premium Sales and Services for Desktop, Laptops, CCTV, and Data Recovery in Agra, Mathura, and Firozabad. Your trusted technology partner.',
  keywords: ['best computer shop in agra', 'best laptop shop in agra', 'best cctv shop in agra', 'best second hand laptop shop in agra', 'laptop repair agra', 'computer repair agra', 'cctv installation agra', 'data recovery agra'],
  openGraph: {
    title: 'Kartik Computers | Agra',
    description: 'Premier Technology Store and Service Center in Agra.',
    url: 'https://kartikcomputers.online',
    siteName: 'Kartik Computers',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
