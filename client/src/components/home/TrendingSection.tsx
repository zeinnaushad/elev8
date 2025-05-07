import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

const trendingItems = [
  {
    id: 1,
    title: "Statement Sleeves",
    description: "Bold and dramatic sleeves are making waves this season.",
    image: "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
    link: "/category/women",
  },
  {
    id: 2,
    title: "Oversized Blazers",
    description: "The perfect blend of comfort and sophistication.",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
    link: "/category/men",
  },
  {
    id: 3,
    title: "Sustainable Fashion",
    description: "Eco-friendly pieces that don't compromise on style.",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
    link: "/category/women",
  },
];

const TrendingSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="font-montserrat font-semibold text-3xl md:text-4xl text-center mb-12"
        >
          Trending Now
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingItems.map((item, index) => (
            <TrendingItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface TrendingItemProps {
  item: {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
  };
  index: number;
}

const TrendingItem = ({ item, index }: TrendingItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="overflow-hidden rounded-xl mb-4">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-96 object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <h3 className="font-montserrat font-medium text-xl mb-2">{item.title}</h3>
      <p className="text-neutral-600 mb-4">{item.description}</p>
      <Link href={item.link}>
        <a className="text-primary font-medium hover:text-accent transition-colors inline-flex items-center">
          Discover More
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </Link>
    </motion.div>
  );
};

export default TrendingSection;
