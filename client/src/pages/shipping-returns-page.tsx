import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Newsletter from '@/components/home/Newsletter';
import { Separator } from '@/components/ui/separator';

export default function ShippingReturnsPage() {
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
              <span>Shipping & Returns</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-montserrat font-bold mb-8">Shipping & Returns</h1>
          
          <div className="space-y-8 text-neutral-200">
            <section>
              <h2 className="text-2xl font-montserrat font-semibold mb-4">Shipping Information</h2>
              <div className="space-y-4">
                <p>
                  At ELEV8, we strive to deliver your orders promptly and securely. We ship to locations across India and select international destinations.
                </p>
                
                <h3 className="text-xl font-medium mt-6 mb-2">Domestic Shipping (within India)</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Standard Shipping: 3-5 business days (₹99 for orders under ₹1,000, free for orders over ₹1,000)</li>
                  <li>Express Shipping: 1-2 business days (₹199)</li>
                  <li>Same-day Delivery: Available for select locations if ordered before 12 PM (₹299)</li>
                </ul>
                
                <h3 className="text-xl font-medium mt-6 mb-2">International Shipping</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Standard International: 7-14 business days (₹1,499)</li>
                  <li>Express International: 3-5 business days (₹2,499)</li>
                </ul>
                
                <p className="italic mt-4">
                  Please note that international shipments may be subject to customs duties and taxes imposed by the destination country. 
                  These charges are the responsibility of the recipient and are not included in our shipping fees.
                </p>
                
                <h3 className="text-xl font-medium mt-6 mb-2">Order Tracking</h3>
                <p>
                  Once your order is shipped, you will receive a confirmation email with tracking information. 
                  You can also track your order status by logging into your account on our website.
                </p>
              </div>
            </section>
            
            <Separator className="my-8" />
            
            <section>
              <h2 className="text-2xl font-montserrat font-semibold mb-4">Returns & Exchanges</h2>
              <div className="space-y-4">
                <p>
                  We want you to be completely satisfied with your ELEV8 purchase. If for any reason you're not happy with your order, 
                  we offer a straightforward return and exchange policy.
                </p>
                
                <h3 className="text-xl font-medium mt-6 mb-2">Return Policy</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Returns are accepted within 30 days of delivery</li>
                  <li>Items must be unworn, unwashed, and with original tags attached</li>
                  <li>Original receipt or proof of purchase is required</li>
                  <li>Sale items marked as "Final Sale" are not eligible for return</li>
                </ul>
                
                <h3 className="text-xl font-medium mt-6 mb-2">Exchange Process</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Exchanges can be processed for different sizes or colors of the same item</li>
                  <li>Exchange requests must be made within 30 days of delivery</li>
                  <li>If the desired exchange item is of higher value, you will need to pay the difference</li>
                  <li>If the desired exchange item is of lower value, you will receive store credit for the difference</li>
                </ul>
                
                <h3 className="text-xl font-medium mt-6 mb-2">How to Initiate a Return or Exchange</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Log into your account on our website</li>
                  <li>Navigate to your order history and select the order containing the item(s) you wish to return</li>
                  <li>Select the specific item(s) and reason for return</li>
                  <li>Choose your preferred refund method (original payment method, store credit, or exchange)</li>
                  <li>Print the prepaid return shipping label and return instructions</li>
                  <li>Package the item(s) securely with all original packaging and attach the return shipping label</li>
                  <li>Drop off the package at the nearest authorized shipping location</li>
                </ol>
                
                <h3 className="text-xl font-medium mt-6 mb-2">Refund Processing</h3>
                <p>
                  Once we receive and inspect your return, we will process your refund. Please allow 7-10 business days for the refund to appear in your account.
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li>Original payment method refunds: 5-7 business days after return approval</li>
                  <li>Store credit: Issued immediately after return approval</li>
                  <li>Exchanges: Processed and shipped within 1-2 business days after return approval</li>
                </ul>
                
                <p className="italic mt-4">
                  Return shipping costs are the responsibility of the customer unless the return is due to our error (damaged, defective, or incorrect item shipped).
                </p>
              </div>
            </section>
            
            <Separator className="my-8" />
            
            <section>
              <h2 className="text-2xl font-montserrat font-semibold mb-4">Contact Our Support Team</h2>
              <p>
                If you have any questions about our shipping or return policies, please don't hesitate to contact our customer service team:
              </p>
              <ul className="mt-4 space-y-2">
                <li>Email: support@elev8fashion.com</li>
                <li>Phone: +91 8156857704 (Monday-Saturday, 10 AM - 6 PM IST)</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
      
      <Newsletter />
    </>
  );
}