import type { Metadata } from 'next';
import './globals.css';
import LayoutWrapper from './components/LayoutWrapper';

export const metadata: Metadata = {
  title: 'Kartik Computers | Agra',
  description: 'Premium Sales and Services for Desktop, Laptops, CCTV, and Data Recovery in Agra, Mathura, and Firozabad.',
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
