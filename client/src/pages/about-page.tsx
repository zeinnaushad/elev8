import React from 'react';
import { Link } from 'wouter';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Newsletter from '@/components/home/Newsletter';

export default function AboutPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span>About Us</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-montserrat font-bold mb-8">About ELEV8</h1>
          
          <div className="space-y-6 text-neutral-200">
            <p>
              ELEV8 was founded with a simple vision: to create fashion that transcends boundaries and elevates personal style.
              Established in 2021, our journey began with a commitment to bringing cosmic-inspired designs to the fashion industry.
            </p>
            
            <h2 className="text-2xl font-montserrat font-semibold mt-8 mb-4">Our Vision</h2>
            <p>
              At ELEV8, we believe fashion should be an expression of individuality, unbounded by convention. 
              Our designs draw inspiration from the cosmos – vast, mysterious, and full of possibilities – just like personal style.
              We aim to create clothing that helps you stand out, makes you feel confident, and reflects your unique personality.
            </p>
            
            <h2 className="text-2xl font-montserrat font-semibold mt-8 mb-4">Quality & Craftsmanship</h2>
            <p>
              Each ELEV8 piece is crafted with meticulous attention to detail and commitment to quality. 
              We source the finest materials and work with skilled artisans who share our passion for excellence.
              From the initial sketch to the final stitch, every step in our production process is guided by the pursuit of perfection.
            </p>
            
            <h2 className="text-2xl font-montserrat font-semibold mt-8 mb-4">Sustainability</h2>
            <p>
              We're dedicated to reducing our environmental footprint. Our commitment to sustainability drives us to continually 
              improve our practices – from sourcing eco-friendly materials to implementing ethical manufacturing processes.
              We believe that great fashion shouldn't come at the expense of our planet.
            </p>
            
            <div className="flex justify-center my-12">
              <div className="bg-gradient-to-b from-gray-900 to-black p-1 rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="ELEV8 Team" 
                  className="rounded-lg w-full h-auto"
                />
              </div>
            </div>
            
            <h2 className="text-2xl font-montserrat font-semibold mt-8 mb-4">Our Team</h2>
            <p>
              ELEV8 is powered by a diverse team of creative minds, fashion enthusiasts, and industry experts. 
              United by our passion for innovative design and exceptional quality, we work together to bring our cosmic vision to life.
              Our headquarters in Chennai, India serves as the creative hub where ideas transform into the collections you love.
            </p>
            
            <h2 className="text-2xl font-montserrat font-semibold mt-8 mb-4">Join Our Journey</h2>
            <p>
              We invite you to be part of the ELEV8 community – a constellation of individuals who appreciate quality, 
              embrace uniqueness, and seek fashion that's truly out of this world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/contact">
                <a className="bg-white text-black py-3 px-6 rounded-md hover:bg-gray-200 transition-colors text-center font-medium">
                  Contact Us
                </a>
              </Link>
              <Link href="/shop">
                <a className="bg-transparent border border-white text-white py-3 px-6 rounded-md hover:bg-white/10 transition-colors text-center font-medium">
                  Explore Our Collections
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Newsletter />
    </>
  );
}