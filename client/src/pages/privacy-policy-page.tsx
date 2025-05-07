import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Newsletter from '@/components/home/Newsletter';
import { Separator } from '@/components/ui/separator';

export default function PrivacyPolicyPage() {
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
              <span>Privacy Policy</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-montserrat font-bold mb-8">Privacy Policy</h1>
          
          <div className="space-y-6 text-neutral-200">
            <p className="italic">Last Updated: May 5, 2023</p>
            
            <p>
              At ELEV8 ("we", "our", or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
            
            <Separator className="my-6" />
            
            <section>
              <h2 className="text-2xl font-montserrat font-semibold mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-medium mt-6 mb-2">Personal Information</h3>
              <p>We may collect personal information that you voluntarily provide to us when you:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Register on our website</li>
                <li>Place an order</li>
                <li>Subscribe to our newsletter</li>
                <li>Participate in promotions or surveys</li>
                <li>Contact our customer service</li>
              </ul>
              <p className="mt-3">
                This information may include your name, email address, postal address, phone number, payment information, and other details you choose to provide.
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-2">Automatically Collected Information</h3>
              <p>
                When you visit our website, we may automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Operating system</li>
                <li>Pages visited</li>
                <li>Time and date of your visit</li>
                <li>Referring website</li>
                <li>Other browsing statistics</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-2">Cookies and Similar Technologies</h3>
              <p>
                We use cookies and similar tracking technologies to collect information about your browsing activities. 
                Cookies are small text files that are stored on your device when you visit our website. 
                They help us provide you with a better experience by enabling features like remembering your preferences, 
                analyzing site usage, and personalizing content.
              </p>
            </section>
            
            <Separator className="my-6" />
            
            <section>
              <h2 className="text-2xl font-montserrat font-semibold mb-4">How We Use Your Information</h2>
              <p>We may use the information we collect for various purposes, including to:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Process and fulfill your orders</li>
                <li>Create and manage your account</li>
                <li>Send you order confirmations and updates</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you marketing and promotional communications (with your consent)</li>
                <li>Personalize your shopping experience</li>
                <li>Improve our website, products, and services</li>
                <li>Protect against fraud and unauthorized transactions</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>
            
            <Separator className="my-6" />
            
            <section>
              <h2 className="text-2xl font-montserrat font-semibold mb-4">How We Share Your Information</h2>
              <p>We may share your information with third parties in the following situations:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Service Providers:</strong> We may share your information with third-party service providers who perform services on our behalf, such as payment processing, order fulfillment, customer service, and marketing assistance.</li>
                <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
              </ul>
              
              <p className="mt-4">
                We do not sell, rent, or otherwise disclose your personal information to third parties for their marketing purposes without your explicit consent.
              </p>
            </section>
            
            <Separator className="my-6" />
            
            <section>
              <h2 className="text-2xl font-montserrat font-semibold mb-4">Your Rights and Choices</h2>
              <p>You have certain rights regarding your personal information, including:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Access and Update:</strong> You can access and update your personal information through your account settings or by contacting us.</li>
                <li><strong>Marketing Communications:</strong> You can opt out of receiving marketing communications from us by following the unsubscribe instructions provided in our emails or by contacting us directly.</li>
                <li><strong>Cookies:</strong> You can set your browser to refuse all or some browser cookies or to alert you when cookies are being sent. However, some parts of the website may not function properly if you disable cookies.</li>
              </ul>
            </section>
            
            <Separator className="my-6" />
            
            <section>
              <h2 className="text-2xl font-montserrat font-semibold mb-4">Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. 
                However, no method of transmission over the Internet or electronic storage is 100% secure. 
                Therefore, while we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
            </section>
            
            <Separator className="my-6" />
            
            <section>
              <h2 className="text-2xl font-montserrat font-semibold mb-4">Children's Privacy</h2>
              <p>
                Our website is not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. 
                If you are a parent or guardian and believe that your child has provided us with personal information, please contact us, 
                and we will delete such information from our records.
              </p>
            </section>
            
            <Separator className="my-6" />
            
            <section>
              <h2 className="text-2xl font-montserrat font-semibold mb-4">Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. Any changes will be posted on this page, and the "Last Updated" date at the top will be revised accordingly. 
                We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
              </p>
            </section>
            
            <Separator className="my-6" />
            
            <section>
              <h2 className="text-2xl font-montserrat font-semibold mb-4">Contact Us</h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <ul className="mt-4 space-y-2">
                <li>Email: privacy@elev8fashion.com</li>
                <li>Phone: +91 8156857704</li>
                <li>Address: ELEV8 Fashion, Potheri, Chennai, India</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
      
      <Newsletter />
    </>
  );
}