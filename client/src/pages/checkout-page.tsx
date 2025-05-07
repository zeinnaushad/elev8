import { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/use-auth";
import { Redirect, useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Check, CreditCard, Truck } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const checkoutFormSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Please enter a valid email'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  postalCode: z.string().min(5, 'Postal code must be at least 5 characters'),
  country: z.string().min(2, 'Country must be at least 2 characters'),
  paymentMethod: z.enum(['card', 'cod']),
  // Card details only required if payment method is card
  cardNumber: z.string().optional()
    .refine(val => val === undefined || val.length >= 16, {
      message: 'Card number must be at least 16 digits',
    }),
  cardName: z.string().optional()
    .refine(val => val === undefined || val.length >= 3, {
      message: 'Name on card must be at least 3 characters',
    }),
  cardExpiry: z.string().optional()
    .refine(val => val === undefined || /^\d{2}\/\d{2}$/.test(val), {
      message: 'Expiry date must be in MM/YY format',
    }),
  cardCvc: z.string().optional()
    .refine(val => val === undefined || (val.length >= 3 && val.length <= 4), {
      message: 'CVC must be 3 or 4 digits',
    }),
}).refine(data => {
  // If payment method is card, all card fields are required
  if (data.paymentMethod === 'card') {
    return !!data.cardNumber && !!data.cardName && !!data.cardExpiry && !!data.cardCvc;
  }
  return true;
}, {
  message: "Card details are required for card payment",
  path: ["paymentMethod"],
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: user?.username || '',
      email: user?.email || '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India',
      paymentMethod: 'card',
    },
  });

  const { watch } = form;
  const paymentMethod = watch('paymentMethod');

  // Calculate subtotal, tax, and total
  const subtotal = cartItems.reduce((total, item) => {
    const price = parseFloat(String(item.product?.price || 0));
    return total + price * item.quantity;
  }, 0);
  
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  // Format price in rupees
  const formatPrice = (price: number) => {
    return `₹${price.toFixed(2)}`;
  };

  // Convert from dollars to rupees (assuming 1 USD = 75 INR)
  const toRupees = (dollars: number) => {
    return dollars * 75;
  };

  // Handle form submission
  const onSubmit = async (data: CheckoutFormValues) => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call for processing order
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Order was successful
      clearCart();
      setOrderComplete(true);
      toast({
        title: "Order placed successfully!",
        description: "Thank you for shopping with ELEV8.",
      });
    } catch (error) {
      toast({
        title: "Failed to place order",
        description: "An error occurred while processing your order.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // If cart is empty (and not just ordered), redirect to home
  useEffect(() => {
    if (cartItems.length === 0 && !orderComplete && !isSubmitting) {
      setLocation("/");
    }
  }, [cartItems, orderComplete, isSubmitting, setLocation]);

  // If order is complete, show success message
  if (orderComplete) {
    return (
      <div className="cosmic-bg min-h-screen flex items-center justify-center px-4">
        <Helmet>
          <title>Order Complete | ELEV8</title>
          <meta name="description" content="Your order has been successfully placed. Thank you for shopping with ELEV8." />
        </Helmet>
        <div className="bg-black/30 backdrop-blur-sm max-w-md w-full rounded-lg border border-white/10 p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
            <Check className="h-8 w-8 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4 font-space">Order Complete!</h1>
          <p className="text-gray-300 mb-6">
            Thank you for your purchase. We've received your order and will process it shortly.
            A confirmation email has been sent to your email address.
          </p>
          <Button
            className="bg-white text-black hover:bg-gray-200 font-medium"
            onClick={() => setLocation("/")}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="cosmic-bg min-h-screen pb-12">
      <Helmet>
        <title>Checkout | ELEV8</title>
        <meta name="description" content="Complete your purchase at ELEV8. Fast, secure checkout with multiple payment options." />
      </Helmet>

      <div className="container mx-auto px-4 pt-8">
        <h1 className="text-3xl font-bold text-white mb-8 font-space">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 rounded overflow-hidden shrink-0">
                      <img 
                        src={item.product?.imageUrl} 
                        alt={item.product?.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{item.product?.name}</h3>
                      <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
                      <p className="text-white font-medium mt-1">
                        {formatPrice(toRupees(parseFloat(String(item.product?.price || 0))))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="mb-4 bg-white/10" />
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Subtotal</span>
                  <span className="text-white">{formatPrice(toRupees(subtotal))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">GST (18%)</span>
                  <span className="text-white">{formatPrice(toRupees(tax))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Shipping</span>
                  <span className="text-white">Free</span>
                </div>
              </div>
              
              <Separator className="mb-4 bg-white/10" />
              
              <div className="flex justify-between mb-6">
                <span className="text-white font-semibold">Total</span>
                <span className="text-white font-bold text-xl">{formatPrice(toRupees(total))}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm mb-6">
                <Truck className="h-4 w-4 text-green-400" />
                <span className="text-green-400">Free shipping on all orders in India</span>
              </div>
            </div>
          </div>
          
          {/* Checkout Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 p-6">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-4">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-white">Full Name</Label>
                    <Input
                      id="fullName"
                      {...form.register('fullName')}
                      className="bg-black/50 border-gray-700 text-white"
                      placeholder="Your full name"
                    />
                    {form.formState.errors.fullName && (
                      <p className="text-red-400 text-sm">{form.formState.errors.fullName.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register('email')}
                      className="bg-black/50 border-gray-700 text-white"
                      placeholder="your.email@example.com"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-400 text-sm">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address" className="text-white">Address</Label>
                    <Input
                      id="address"
                      {...form.register('address')}
                      className="bg-black/50 border-gray-700 text-white"
                      placeholder="Street address"
                    />
                    {form.formState.errors.address && (
                      <p className="text-red-400 text-sm">{form.formState.errors.address.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-white">City</Label>
                    <Input
                      id="city"
                      {...form.register('city')}
                      className="bg-black/50 border-gray-700 text-white"
                      placeholder="City"
                    />
                    {form.formState.errors.city && (
                      <p className="text-red-400 text-sm">{form.formState.errors.city.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-white">State</Label>
                    <Input
                      id="state"
                      {...form.register('state')}
                      className="bg-black/50 border-gray-700 text-white"
                      placeholder="State"
                    />
                    {form.formState.errors.state && (
                      <p className="text-red-400 text-sm">{form.formState.errors.state.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="postalCode" className="text-white">Postal Code</Label>
                    <Input
                      id="postalCode"
                      {...form.register('postalCode')}
                      className="bg-black/50 border-gray-700 text-white"
                      placeholder="Postal code"
                    />
                    {form.formState.errors.postalCode && (
                      <p className="text-red-400 text-sm">{form.formState.errors.postalCode.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-white">Country</Label>
                    <Input
                      id="country"
                      {...form.register('country')}
                      className="bg-black/50 border-gray-700 text-white"
                      placeholder="Country"
                    />
                    {form.formState.errors.country && (
                      <p className="text-red-400 text-sm">{form.formState.errors.country.message}</p>
                    )}
                  </div>
                </div>
                
                <Separator className="bg-white/10 my-6" />
                
                <h2 className="text-xl font-semibold text-white mb-4">Payment Method</h2>
                
                <RadioGroup
                  {...form.register('paymentMethod')}
                  defaultValue="card"
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2 bg-black/50 border border-gray-700 rounded-lg p-3">
                    <RadioGroupItem value="card" id="payment-card" />
                    <Label htmlFor="payment-card" className="flex items-center text-white cursor-pointer">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Credit / Debit Card
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 bg-black/50 border border-gray-700 rounded-lg p-3">
                    <RadioGroupItem value="cod" id="payment-cod" />
                    <Label htmlFor="payment-cod" className="text-white cursor-pointer">
                      Cash on Delivery
                    </Label>
                  </div>
                </RadioGroup>
                
                {/* Card details section (only shown if card payment is selected) */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4 mt-4 p-4 border border-gray-700 rounded-lg bg-black/30">
                    <h3 className="text-white font-medium">Card Details</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber" className="text-white">Card Number</Label>
                      <Input
                        id="cardNumber"
                        {...form.register('cardNumber')}
                        className="bg-black/50 border-gray-700 text-white"
                        placeholder="1234 5678 9012 3456"
                        maxLength={16}
                      />
                      {form.formState.errors.cardNumber && (
                        <p className="text-red-400 text-sm">{form.formState.errors.cardNumber.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardName" className="text-white">Name on Card</Label>
                      <Input
                        id="cardName"
                        {...form.register('cardName')}
                        className="bg-black/50 border-gray-700 text-white"
                        placeholder="JOHN SMITH"
                      />
                      {form.formState.errors.cardName && (
                        <p className="text-red-400 text-sm">{form.formState.errors.cardName.message}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardExpiry" className="text-white">Expiry Date</Label>
                        <Input
                          id="cardExpiry"
                          {...form.register('cardExpiry')}
                          className="bg-black/50 border-gray-700 text-white"
                          placeholder="MM/YY"
                        />
                        {form.formState.errors.cardExpiry && (
                          <p className="text-red-400 text-sm">{form.formState.errors.cardExpiry.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardCvc" className="text-white">CVC</Label>
                        <Input
                          id="cardCvc"
                          {...form.register('cardCvc')}
                          className="bg-black/50 border-gray-700 text-white"
                          placeholder="123"
                          maxLength={4}
                        />
                        {form.formState.errors.cardCvc && (
                          <p className="text-red-400 text-sm">{form.formState.errors.cardCvc.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-gray-200 font-medium mt-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : `Place Order - ${formatPrice(toRupees(total))}`}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}