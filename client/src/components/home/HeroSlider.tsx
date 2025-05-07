import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1534481909716-9a482087f27d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    title: "LIFE IS TOO SHORT",
    subtitle: "Explore our curated collection of stylish clothing and accessories to elevate your look",
    buttonText: "Shop Now",
    buttonLink: "/category/women",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    title: "TO DRESS BORING",
    subtitle: "Express yourself with our premium fashion pieces designed for the bold",
    buttonText: "Explore",
    buttonLink: "/category/men",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    title: "ELEVATE YOUR STYLE",
    subtitle: "Stand out from the crowd with fashion that makes a statement",
    buttonText: "Discover",
    buttonLink: "/category/accessories",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const goToPrevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  const goToNextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Auto-rotate slides
  useEffect(() => {
    const timer = setTimeout(goToNextSlide, 5000);
    return () => clearTimeout(timer);
  }, [currentSlide, goToNextSlide]);

  // Slide variants for animations
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <section className="relative overflow-hidden cosmic-bg h-[600px] sm:h-[700px]">
      
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "tween", duration: 0.5 }}
          className="absolute inset-0 z-10"
        >
          <div className="relative h-full flex items-center justify-between px-6 md:px-12 lg:px-24">
            <div className="max-w-md">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="font-serif font-light text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-4"
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-white text-lg mb-8"
              >
                {slides[currentSlide].subtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Button
                  asChild
                  className="bg-white hover:bg-gray-200 text-black font-medium px-8 py-4 h-auto rounded-none transition-colors"
                >
                  <a href={slides[currentSlide].buttonLink}>{slides[currentSlide].buttonText}</a>
                </Button>
              </motion.div>
            </div>
            <div className="hidden md:block max-w-md h-full">
              <div className="h-full flex items-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="relative overflow-hidden rounded-lg shadow-2xl"
                  style={{ width: '350px', height: '400px' }}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${slides[currentSlide].image}')` }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slider controls */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full bg-white transition-opacity ${
              index === currentSlide ? "bg-opacity-100" : "bg-opacity-50 hover:bg-opacity-75"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 transition-opacity p-2 rounded-full text-primary z-10"
        onClick={goToPrevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 transition-opacity p-2 rounded-full text-primary z-10"
        onClick={goToNextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </section>
  );
};

export default HeroSlider;
