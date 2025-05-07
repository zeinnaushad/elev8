import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/use-auth";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, User, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  toggleCart: () => void;
}

const Header = ({ toggleCart }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { cartItems } = useCart();
  const { user, logoutMutation } = useAuth();

  // Track scroll position to add shadow when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate total quantity of items in cart
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className={`sticky top-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm transition-shadow ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/">
            <a className="font-space font-bold text-2xl tracking-wider text-white">ELEV8</a>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            <NavLink href="/" active={location === "/"}>HOME</NavLink>
            <NavLink href="/category/women" active={location === "/category/women"}>SHOP</NavLink>
            <NavLink href="/features" active={location === "/features"}>FEATURES</NavLink>
            <NavLink href="/contact" active={location === "/contact"}>CONTACT</NavLink>
          </nav>
          
          {/* Icons */}
          <div className="flex items-center space-x-5">
            <Button variant="ghost" size="icon" aria-label="Search" className="text-white hover:text-pink-400">
              <Search className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" aria-label="Account" className="text-white hover:text-pink-400">
              <User className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-white hover:text-pink-400" 
              aria-label="Shopping cart"
              onClick={toggleCart}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-pink-600 text-white"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-white hover:text-pink-400" 
              aria-label="Menu" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden cosmic-section"
            >
              <div className="py-4 space-y-4">
                <MobileNavLink 
                  href="/" 
                  active={location === "/"} 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  HOME
                </MobileNavLink>
                
                <MobileNavLink 
                  href="/category/women" 
                  active={location === "/category/women"} 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  SHOP
                </MobileNavLink>
                
                <MobileNavLink 
                  href="/features" 
                  active={location === "/features"} 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FEATURES
                </MobileNavLink>
                
                <MobileNavLink 
                  href="/contact" 
                  active={location === "/contact"} 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  CONTACT
                </MobileNavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink = ({ href, active, children }: NavLinkProps) => (
  <Link href={href}>
    <a className={`font-space text-sm font-medium tracking-wide transition-colors ${active ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
      {children}
    </a>
  </Link>
);

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink = ({ href, active, onClick, children }: MobileNavLinkProps) => (
  <Link href={href}>
    <a 
      className={`block font-space text-sm font-medium tracking-wide py-2 transition-colors ${active ? 'text-white' : 'text-gray-400 hover:text-white'}`}
      onClick={onClick}
    >
      {children}
    </a>
  </Link>
);

export default Header;
