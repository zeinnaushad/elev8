import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const contactFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    // Simulate API call for sending message
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cosmic-bg min-h-screen py-12">
      <Helmet>
        <title>Contact Us | ELEV8</title>
        <meta name="description" content="Get in touch with ELEV8 for any questions, feedback, or support. Our team is here to help you with your fashion needs." />
      </Helmet>

      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-white mb-12 font-space">CONTACT US</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="order-2 lg:order-1">
            <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Get In Touch</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-white/10 rounded-full p-3 mr-4">
                    <MapPin className="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Our Location</h3>
                    <p className="text-gray-300 mt-1">Potheri, Chennai, India</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/10 rounded-full p-3 mr-4">
                    <Phone className="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Phone Number</h3>
                    <p className="text-gray-300 mt-1">+91 8156857704</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/10 rounded-full p-3 mr-4">
                    <Mail className="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Email Address</h3>
                    <p className="text-gray-300 mt-1">info@elev8fashion.com</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-white/10 pt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Working Hours</h3>
                <div className="space-y-2 text-gray-300">
                  <p>Monday - Friday: 10:00 AM - 8:00 PM</p>
                  <p>Saturday - Sunday: 11:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="order-1 lg:order-2">
            <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Send Us A Message</h2>
              
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Your Name</Label>
                  <Input
                    id="name"
                    {...form.register('name')}
                    className="bg-black/50 border-gray-700 text-white"
                    placeholder="Enter your name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-400 text-sm">{form.formState.errors.name.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Your Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register('email')}
                    className="bg-black/50 border-gray-700 text-white"
                    placeholder="Enter your email"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-400 text-sm">{form.formState.errors.email.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-white">Subject</Label>
                  <Input
                    id="subject"
                    {...form.register('subject')}
                    className="bg-black/50 border-gray-700 text-white"
                    placeholder="Enter message subject"
                  />
                  {form.formState.errors.subject && (
                    <p className="text-red-400 text-sm">{form.formState.errors.subject.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">Message</Label>
                  <Textarea
                    id="message"
                    {...form.register('message')}
                    className="bg-black/50 border-gray-700 text-white resize-none h-40"
                    placeholder="Type your message here..."
                  />
                  {form.formState.errors.message && (
                    <p className="text-red-400 text-sm">{form.formState.errors.message.message}</p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-gray-200 font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Map Section (For visual only) */}
        <div className="mt-12">
          <div className="h-96 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center">
            <div className="text-center p-8">
              <h3 className="text-xl font-semibold text-white mb-2">Map View</h3>
              <p className="text-gray-300 mb-4">Find us easily with our store location</p>
              <p className="text-pink-500">(Interactive map would be displayed here)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}