import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Second Hand Laptop Shop in Agra | Buy Laptops & Computers',
  description: 'Wide range of products including new and refurbished laptops, desktops, and CCTV systems. Best second hand laptop shop in Agra with warranty.'
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
