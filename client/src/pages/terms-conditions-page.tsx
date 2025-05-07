import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Newsletter from '@/components/home/Newsletter';
import { Separator } from '@/components/ui/separator';

export default function TermsConditionsPage() {
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
              <span>Terms & Conditions</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-montserrat font-bold mb-8">Terms & Conditions</h1>
          
          <div className="space-y-6 text-neutral-200">
            <p className="italic">Last Updated: May 5, 2023</p>
            
            <p>
              Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the ELEV8 website.
              Your access to and use of the service is conditioned on your acceptance of and compliance with these Terms.
              These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
            
            <p>
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
            </p>
            
            <Separator className="my-6" />
            
            <section>
              <h2 className="text-2xl font-montserrat font-semibold mb-4">1. Accounts</h2>
              <p>
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
                Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
              </p>
              
              <p className="mt-3">
                You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
                You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
            </section>
            
            <Separator className="my-6" />
            
            <section>
              <h2 className="text-2xl font-montserrat font-semibold mb-4">2. Products and Services</h2>
              <p>
                All products and services displayed on our website are subject to availability. We reserve the right to discontinue any product or service at any time.
              </p>
              
              <p className="mt-3">
                Prices for our products are subject to change without notice. We reserve the right to modify or discontinue the Service (or any part or content thereof) without notice at any time.
              </p>
              
              <p className="mt-3">
                We shall not be liable to you or to any third party for any modification, price change, suspension, or discontinuance of the Service.
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-2">Product Descriptions</h3>
              <p>
                We strive to be as accurate as possible with our product descriptions, including colors, sizes, and materials. 
                However, we do not warrant that product descriptions or other content of this website is accurate, complete, reliable, current, or error-free.
                The actual colors you see will depend on your monitor, and we cannot guarantee that your monitor's display of any color will be accurate.
              </p>
            </section>
            
            <Separator className="my-6" />
            
            <section>
              <h2 className="text-2xl font-montserrat font-semibold mb-4">3. Orders and Payments</h2>
              <p>
                We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order.
                These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address.
              </p>
              
              <p className="mt-3">
                In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made.
              </p>
              
              <p className="mt-3">
                We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers, or distributors.
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-2">Payment Processing</h3>
              <p>
                We accept various payment methods as indicated on our website. By providing a payment method, you represent and warrant that you are authorized to use the designated payment method.
              </p>
              
              <p className="mt-3">
                If the payment method you provide cannot be verified, is invalid, or is otherwise not acceptable, your order may be suspended or canceled. 
                You agree to resolve any problems we encounter in order to proceed with your order.
              </p>
            </section>
            
            <Separator className="my-6" />
            
            <section>
              <h2 className="text-2xl font-montserrat font-semibold mb-4">4. Shipping and Delivery</h2>
              <p>
                We will make our best efforts to ship products in accordance with the estimated delivery times provided at checkout. 
                However, we do not guarantee delivery times, and delays may occur due to various factors beyond our control.
              </p>
              
              <p className="mt-3">
                Risk of loss and title for items purchased from our website pass to you upon delivery of the items to the carrier.
                You are responsible for filing any claims with carriers for damaged and/or lost shipments.
              </p>
            </section>
            
            <Separator className="my-6" />
            
            <section>
              <h2 className="text-2xl font-montserrat font-semibold mb-4">5. Returns and Refunds</h2>
              <p>
                Please refer to our <a href="/shipping-returns" className="text-pink-400 hover:underline">Shipping & Returns</a> page for detailed information about our return and refund policies.
              </p>
            </section>
            
            <Separator className="my-6" />
            
            <section>
              <h2 className="text-2xl font-montserrat font-semibold mb-4">6. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are and will remain the exclusive property of ELEV8 and its licensors. 
                The Service is protected by copyright, trademark, and other laws of both India and foreign countries.
              </p>
              
              <p className="mt-3">
                Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of ELEV8.
              </p>
            </section>
            
            <Separator className="my-6" />
            
            <section>
              <h2 className="text-2xl font-montserrat font-semibold mb-4">7. Links To Other Web Sites</h2>
              <p>
                Our Service may contain links to third-party websites or services that are not owned or controlled by ELEV8.
              </p>
              
              <p className="mt-3">
                ELEV8 has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. 
                You further acknowledge and agree that ELEV8 shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
              </p>
              
              <p className="mt-3">
                We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or services that you visit.
              </p>
            </section>
            
            <Separator className="my-6" />
            
            <section>
              <h2 className="text-2xl font-montserrat font-semibold mb-4">8. Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              
              <p className="mt-3">
                Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
              </p>
            </section>
            
            <Separator className="my-6" />
            
            <section>
              <h2 className="text-2xl font-montserrat font-semibold mb-4">9. Limitation of Liability</h2>
              <p>
                In no event shall ELEV8, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, 
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-roman pl-5 space-y-2 mt-2">
                <li>Your access to or use of or inability to access or use the Service;</li>
                <li>Any conduct or content of any third party on the Service;</li>
                <li>Any content obtained from the Service; and</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
              </ul>
            </section>
            
            <Separator className="my-6" />
            
            <section>
              <h2 className="text-2xl font-montserrat font-semibold mb-4">10. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>
              
              <p className="mt-3">
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. 
                If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
              </p>
            </section>
            
            <Separator className="my-6" />
            
            <section>
              <h2 className="text-2xl font-montserrat font-semibold mb-4">11. Changes to These Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. 
                What constitutes a material change will be determined at our sole discretion.
              </p>
              
              <p className="mt-3">
                By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. 
                If you do not agree to the new terms, please stop using the Service.
              </p>
            </section>
            
            <Separator className="my-6" />
            
            <section>
              <h2 className="text-2xl font-montserrat font-semibold mb-4">12. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us:
              </p>
              <ul className="mt-4 space-y-2">
                <li>Email: legal@elev8fashion.com</li>
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