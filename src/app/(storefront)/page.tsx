import Hero from '@/components/Hero';
import CategoryRibbon from '@/components/CategoryRibbon';
import FeaturedGrid from '@/components/FeaturedGrid';
import HappyCustomers from '@/components/HappyCustomers';
import AboutUs from '@/components/AboutUs';
import Services from '@/components/Services';
import HomeLeasing from '@/components/HomeLeasing';
import BrandMarquee from '@/components/BrandMarquee';

export default function Home() {
  return (
    <main>
      <Hero />
      <CategoryRibbon />
      <FeaturedGrid />
      <HappyCustomers />
      <AboutUs />
      <Services />
      <HomeLeasing />
      <BrandMarquee />
    </main>
  );
}
