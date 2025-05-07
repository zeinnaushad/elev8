import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/cart/CartSidebar";
import { queryClient } from "./lib/queryClient";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import Home from "@/pages/Home";
import ProductDetails from "@/pages/ProductDetails";
import Category from "@/pages/Category";
import AuthPage from "@/pages/auth-page";
import CheckoutPage from "@/pages/checkout-page";
import ContactPage from "@/pages/contact-page";
import FeaturesPage from "@/pages/features-page";
import NotFound from "@/pages/not-found";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Prevent scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <div className="flex flex-col min-h-screen">
              <Header toggleCart={toggleCart} />
              <main className="flex-grow">
                <Switch>
                  <Route path="/" component={Home} />
                  <Route path="/auth" component={AuthPage} />
                  <Route path="/checkout" component={CheckoutPage} />
                  <Route path="/product/:slug">
                    {params => <ProductDetails slug={params.slug} />}
                  </Route>
                  <Route path="/category/:slug">
                    {params => <Category slug={params.slug} />}
                  </Route>
                  <Route component={NotFound} />
                </Switch>
              </main>
              <Footer />
              <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
              <Toaster />
            </div>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
