import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { toast } = useToast();
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => {
    const price = parseFloat(String(item.product?.price || 0));
    return total + price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    toast({
      title: "Checkout initiated",
      description: "This would normally take you to checkout."
    });
    // For demo purposes, we'll just clear the cart
    clearCart();
    onClose();
  };

  // Close cart with escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl z-50"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-montserrat font-semibold text-xl">
                  Shopping Cart ({cartItems.length})
                </h3>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Cart Items */}
              <div className="flex-grow overflow-auto p-4 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="mb-4 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-lg font-medium">Your cart is empty</h4>
                    <p className="text-gray-500 mt-2 mb-4">
                      Looks like you haven't added anything to your cart yet.
                    </p>
                    <Button onClick={onClose}>Continue Shopping</Button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex border-b pb-4">
                      <Link href={`/product/${item.product?.slug}`}>
                        <a className="block w-20 h-20 shrink-0">
                          <img
                            src={item.product?.imageUrl}
                            alt={item.product?.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                        </a>
                      </Link>
                      <div className="ml-4 flex-grow">
                        <Link href={`/product/${item.product?.slug}`}>
                          <a className="font-medium hover:text-accent transition-colors">
                            {item.product?.name}
                          </a>
                        </Link>
                        <p className="text-neutral-500 text-sm">
                          {item.product?.description.substring(0, 30)}...
                        </p>
                        <div className="flex justify-between mt-2">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 p-0"
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm w-4 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 p-0"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <span className="font-semibold">
                            ${parseFloat(String(item.product?.price)).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-2 h-6 w-6 text-neutral-400 hover:text-primary transition-colors"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Summary */}
              {cartItems.length > 0 && (
                <div className="p-4 border-t">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span>Shipping</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between text-lg mb-6">
                    <span className="font-medium">Total</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <Button 
                    className="w-full bg-primary hover:bg-accent text-white font-montserrat font-medium mb-3"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                    onClick={onClose}
                  >
                    Continue Shopping
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartSidebar;
