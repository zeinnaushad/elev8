import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/hooks/useCart";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  toggleCart: () => void;
}

const Header = ({ toggleCart }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { cartItems } = useCart();

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
    <header className={`sticky top-0 z-50 bg-white transition-shadow ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/">
            <a className="font-montserrat font-bold text-2xl tracking-wider text-pink-600">ELEV8</a>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink href="/" active={location === "/"}>Home</NavLink>
            <NavLink href="/category/women" active={location === "/category/women"}>Women</NavLink>
            <NavLink href="/category/men" active={location === "/category/men"}>Men</NavLink>
            <NavLink href="/category/accessories" active={location === "/category/accessories"}>Accessories</NavLink>
            <NavLink href="/#new-arrivals" active={false}>New Arrivals</NavLink>
          </nav>
          
          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" aria-label="Account">
              <User className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative" 
              aria-label="Shopping cart"
              onClick={toggleCart}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent text-white"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
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
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4">
                <MobileNavLink 
                  href="/" 
                  active={location === "/"} 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </MobileNavLink>
                
                <MobileNavLink 
                  href="/category/women" 
                  active={location === "/category/women"} 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Women
                </MobileNavLink>
                
                <MobileNavLink 
                  href="/category/men" 
                  active={location === "/category/men"} 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Men
                </MobileNavLink>
                
                <MobileNavLink 
                  href="/category/accessories" 
                  active={location === "/category/accessories"} 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Accessories
                </MobileNavLink>
                
                <MobileNavLink 
                  href="/#new-arrivals" 
                  active={false} 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  New Arrivals
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
    <a className={`font-montserrat font-medium transition-colors ${active ? 'text-accent' : 'hover:text-accent'}`}>
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
      className={`block font-montserrat font-medium py-2 transition-colors ${active ? 'text-accent' : 'hover:text-accent'}`}
      onClick={onClick}
    >
      {children}
    </a>
  </Link>
);

export default Header;
