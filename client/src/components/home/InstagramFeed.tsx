import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const instagramImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    link: "https://www.instagram.com/",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    link: "https://www.instagram.com/",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1485125639709-a60c3a500bf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    link: "https://www.instagram.com/",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    link: "https://www.instagram.com/",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    link: "https://www.instagram.com/",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1546422904-90eab23c3d7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    link: "https://www.instagram.com/",
  },
];

const InstagramFeed = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="font-montserrat font-semibold text-3xl md:text-4xl text-center mb-4"
        >
          Follow Our Style
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-neutral-600 text-center mb-12 max-w-2xl mx-auto"
        >
          Check out our Instagram for more fashion inspiration and style guides.
        </motion.p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {instagramImages.map((image, index) => (
            <InstagramImage key={image.id} image={image} index={index} />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-pink-500 font-montserrat font-medium hover:text-pink-600 transition-colors"
          >
            <Instagram className="mr-2 h-5 w-5" /> @elev8fashion
          </a>
        </motion.div>
      </div>
    </section>
  );
};

interface InstagramImageProps {
  image: {
    id: number;
    url: string;
    link: string;
  };
  index: number;
}

const InstagramImage = ({ image, index }: InstagramImageProps) => {
  return (
    <motion.a
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      viewport={{ once: true }}
      href={image.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block overflow-hidden group"
    >
      <div className="relative aspect-square">
        <img
          src={image.url}
          alt={`Instagram Feed Image ${image.id}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Instagram className="text-white h-6 w-6" />
        </div>
      </div>
    </motion.a>
  );
};

export default InstagramFeed;
