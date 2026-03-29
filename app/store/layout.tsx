import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop - Kartik Computers | Laptops, Desktops, CCTV',
  description: 'Browse our extensive catalog of new and refurbished laptops, powerful desktops, and high-definition CCTV security cameras.'
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
