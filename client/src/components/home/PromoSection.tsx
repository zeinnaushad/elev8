import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const PromoSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-xl h-[400px]">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800')" }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          
          {/* Content */}
          <div className="relative h-full flex items-center px-6 md:px-12 lg:px-24">
            <div className="max-w-lg">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="font-montserrat font-light text-white text-3xl md:text-4xl lg:text-5xl leading-tight mb-4"
              >
                Exclusive <span className="font-semibold">Sale</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-white text-lg mb-6"
              >
                Get up to 50% off on selected items. Limited time offer.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Button 
                  className="bg-accent text-white font-montserrat font-medium px-8 py-6 h-auto hover:bg-white hover:text-primary"
                >
                  Shop the Sale
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
