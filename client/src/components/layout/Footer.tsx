import { Link } from "wouter";
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="font-montserrat font-semibold text-xl mb-4 text-pink-500">ELEV8</h3>
            <p className="text-neutral-400 mb-4">
              Premium fashion brand offering timeless designs and exceptional quality for the fashion-conscious individual.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Shopping Links */}
          <div>
            <h3 className="font-montserrat font-medium text-lg mb-4">Shopping</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/women">
                  <a className="text-neutral-400 hover:text-white transition-colors">Women</a>
                </Link>
              </li>
              <li>
                <Link href="/category/men">
                  <a className="text-neutral-400 hover:text-white transition-colors">Men</a>
                </Link>
              </li>
              <li>
                <Link href="/category/accessories">
                  <a className="text-neutral-400 hover:text-white transition-colors">Accessories</a>
                </Link>
              </li>
              <li>
                <Link href="/#new-arrivals">
                  <a className="text-neutral-400 hover:text-white transition-colors">New Arrivals</a>
                </Link>
              </li>
              <li>
                <Link href="/sale">
                  <a className="text-neutral-400 hover:text-white transition-colors">Sale</a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Information */}
          <div>
            <h3 className="font-montserrat font-medium text-lg mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">Contact Us</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">Shipping & Returns</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">Terms & Conditions</a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-montserrat font-medium text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-neutral-400">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1 shrink-0" />
                <span>Potheri, Chennai, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 shrink-0" />
                <span>+91 8156857704</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 shrink-0" />
                <span>info@elev8fashion.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ELEV8. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/196/196578.png" 
              alt="Visa" 
              className="h-6 w-auto opacity-70" 
            />
            <img 
              src="https://cdn-icons-png.flaticon.com/512/196/196561.png" 
              alt="Mastercard" 
              className="h-6 w-auto opacity-70" 
            />
            <img 
              src="https://cdn-icons-png.flaticon.com/512/196/196565.png" 
              alt="PayPal" 
              className="h-6 w-auto opacity-70" 
            />
            <img 
              src="https://cdn-icons-png.flaticon.com/512/196/196586.png" 
              alt="American Express" 
              className="h-6 w-auto opacity-70" 
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
