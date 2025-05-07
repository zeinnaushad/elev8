import { Helmet } from "react-helmet";
import HeroSlider from "@/components/home/HeroSlider";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoSection from "@/components/home/PromoSection";
import TrendingSection from "@/components/home/TrendingSection";
import Newsletter from "@/components/home/Newsletter";
import InstagramFeed from "@/components/home/InstagramFeed";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>ELEV8 - Premium Fashion Brand</title>
        <meta name="description" content="Discover premium fashion at ELEV8. Shop our exclusive collection of women's and men's clothing, accessories, and more with worldwide shipping." />
      </Helmet>
      
      <HeroSlider />
      <CategoryGrid />
      <FeaturedProducts />
      <PromoSection />
      <TrendingSection />
      <Newsletter />
      <InstagramFeed />
    </>
  );
};

export default Home;
