import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Category } from "@shared/schema";

const CategoryGrid = () => {
  const { data: categories, isLoading, error } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  if (isLoading) {
    return (
      <section id="categories" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <Skeleton className="h-10 w-52 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-80 w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !categories) {
    return (
      <section id="categories" className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="font-montserrat font-semibold text-3xl md:text-4xl text-center mb-4">Shop By Category</h2>
          <p className="text-neutral-600 mb-8">Unable to load categories. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="categories" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="font-montserrat font-semibold text-3xl md:text-4xl text-center mb-12"
        >
          Shop By Category
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative overflow-hidden group h-80"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url('${category.imageUrl}')` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h3 className="font-montserrat font-semibold text-white text-2xl mb-3">
            {category.name}
          </h3>
          <Button asChild className="bg-white text-primary hover:bg-accent hover:text-white font-medium">
            <Link href={`/category/${category.slug}`}>Shop Now</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryGrid;
