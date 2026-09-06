import './globals.css';
import { CartProvider } from '../lib/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'AURA Lifestyle | Modern Contemporary Clothing Bangladesh',
  description: 'Clean, elegant, contemporary fashion e-commerce inspired by modern lifestyle aesthetics. Shop Men, Women, Kids & Accessories with Cash on Delivery in Bangladesh.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
        <CartProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
