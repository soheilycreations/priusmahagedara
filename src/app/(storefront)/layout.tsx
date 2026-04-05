import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FloatingWidgets from '../../components/FloatingWidgets';

export default function StorefrontLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <FloatingWidgets />
    </>
  );
}
