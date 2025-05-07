import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Helmet } from 'react-helmet';
import { useToast } from '@/hooks/use-toast';
import { Redirect } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { insertUserSchema } from '@shared/schema';

const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = insertUserSchema
  .extend({
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const { user, loginMutation, registerMutation } = useAuth();
  const { toast } = useToast();

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onLoginSubmit = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

  const onRegisterSubmit = (data: RegisterForm) => {
    const { confirmPassword, ...userData } = data;
    registerMutation.mutate(userData);
  };

  // If user is logged in, redirect to home page
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Helmet>
        <title>{activeTab === 'login' ? 'Login' : 'Register'} | ELEV8</title>
        <meta name="description" content="Sign in to your ELEV8 account or create a new one. Enjoy exclusive member benefits, track orders, and save your favorite products." />
      </Helmet>

      <div className="cosmic-bg min-h-screen flex flex-col md:flex-row">
        {/* Auth Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="max-w-md mx-auto bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-white/10">
            <h1 className="text-3xl font-bold mb-8 text-white text-center font-space">
              {activeTab === 'login' ? 'Sign In' : 'Create Account'}
            </h1>

            {/* Tab buttons */}
            <div className="flex mb-8 border-b border-gray-700">
              <button
                className={`flex-1 pb-3 text-center ${
                  activeTab === 'login' 
                    ? 'text-white border-b-2 border-white font-medium' 
                    : 'text-gray-400'
                }`}
                onClick={() => setActiveTab('login')}
              >
                Sign In
              </button>
              <button
                className={`flex-1 pb-3 text-center ${
                  activeTab === 'register' 
                    ? 'text-white border-b-2 border-white font-medium' 
                    : 'text-gray-400'
                }`}
                onClick={() => setActiveTab('register')}
              >
                Create Account
              </button>
            </div>

            {/* Login Form */}
            {activeTab === 'login' && (
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white">Username</Label>
                  <Input
                    id="username"
                    {...loginForm.register('username')}
                    className="bg-black/50 border-gray-700 text-white"
                    placeholder="Your username"
                  />
                  {loginForm.formState.errors.username && (
                    <p className="text-red-400 text-sm mt-1">{loginForm.formState.errors.username.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...loginForm.register('password')}
                    className="bg-black/50 border-gray-700 text-white"
                    placeholder="••••••••"
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-red-400 text-sm mt-1">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-white text-black hover:bg-gray-200 font-medium"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            )}

            {/* Register Form */}
            {activeTab === 'register' && (
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white">Username</Label>
                  <Input
                    id="reg-username"
                    {...registerForm.register('username')}
                    className="bg-black/50 border-gray-700 text-white"
                    placeholder="Choose a username"
                  />
                  {registerForm.formState.errors.username && (
                    <p className="text-red-400 text-sm mt-1">{registerForm.formState.errors.username.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...registerForm.register('email')}
                    className="bg-black/50 border-gray-700 text-white"
                    placeholder="your.email@example.com"
                  />
                  {registerForm.formState.errors.email && (
                    <p className="text-red-400 text-sm mt-1">{registerForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-password" className="text-white">Password</Label>
                  <Input
                    id="reg-password"
                    type="password"
                    {...registerForm.register('password')}
                    className="bg-black/50 border-gray-700 text-white"
                    placeholder="••••••••"
                  />
                  {registerForm.formState.errors.password && (
                    <p className="text-red-400 text-sm mt-1">{registerForm.formState.errors.password.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...registerForm.register('confirmPassword')}
                    className="bg-black/50 border-gray-700 text-white"
                    placeholder="••••••••"
                  />
                  {registerForm.formState.errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1">{registerForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-white text-black hover:bg-gray-200 font-medium"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <div className="hidden md:flex w-1/2 cosmic-bg">
          <div className="flex items-center justify-center p-16 w-full h-full">
            <div className="max-w-lg">
              <h2 className="text-4xl font-bold mb-6 text-white font-space">ELEVATE YOUR STYLE</h2>
              <p className="text-xl text-gray-200 mb-8">
                Join ELEV8 to enjoy exclusive member benefits, faster checkout, order tracking and more.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-black/30 backdrop-blur-sm p-4 rounded border border-white/10">
                  <h3 className="text-white font-medium mb-2">Exclusive Offers</h3>
                  <p className="text-gray-300 text-sm">Get early access to new collections and special promotions</p>
                </div>
                <div className="bg-black/30 backdrop-blur-sm p-4 rounded border border-white/10">
                  <h3 className="text-white font-medium mb-2">Express Checkout</h3>
                  <p className="text-gray-300 text-sm">Save your shipping and payment details for faster shopping</p>
                </div>
                <div className="bg-black/30 backdrop-blur-sm p-4 rounded border border-white/10">
                  <h3 className="text-white font-medium mb-2">Order History</h3>
                  <p className="text-gray-300 text-sm">Track all your orders and reorder your favorite items</p>
                </div>
                <div className="bg-black/30 backdrop-blur-sm p-4 rounded border border-white/10">
                  <h3 className="text-white font-medium mb-2">Wishlist</h3>
                  <p className="text-gray-300 text-sm">Save your favorite items to purchase them later</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}