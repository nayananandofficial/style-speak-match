
import Layout from "@/components/Layout";

const PrivacyPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <p className="text-sm text-muted-foreground mb-8 text-center">
            Last updated: May 1, 2025
          </p>
          
          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p>
                At FitVogue, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our mobile application (collectively, the "Service"). Please read this policy carefully. By using the Service, you consent to the practices described in this Privacy Policy.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <p><strong>2.1 Personal Information</strong></p>
              <p>We may collect personal information that you provide directly to us, such as:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Contact information (name, email address, phone number, shipping address)</li>
                <li>Account credentials (username and password)</li>
                <li>Payment information (credit card details, billing address)</li>
                <li>Profile information (preferences, sizes, body measurements)</li>
                <li>Communication data (inquiries, support requests)</li>
                <li>Voice data when using our voice search feature</li>
              </ul>
              
              <p className="mt-4"><strong>2.2 Usage Information</strong></p>
              <p>We automatically collect certain information about your device and how you interact with the Service, including:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage data (pages visited, time spent, clicks)</li>
                <li>Location data (if enabled on your device)</li>
                <li>Cookies and similar technologies</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <p>We use the information we collect for various purposes, including:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Providing and improving the Service</li>
                <li>Processing transactions and fulfilling orders</li>
                <li>Personalizing your experience and product recommendations</li>
                <li>Communicating with you about orders, promotions, and updates</li>
                <li>Responding to your inquiries and support requests</li>
                <li>Analyzing usage patterns and optimizing the Service</li>
                <li>Protecting against fraudulent or unauthorized activity</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">4. How We Share Your Information</h2>
              <p>We may share your information in the following circumstances:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>Service Providers:</strong> We share information with third-party vendors who perform services on our behalf (payment processing, shipping, customer service, etc.)</li>
                <li><strong>Business Partners:</strong> We may share information with our business partners to offer you products or services that may interest you</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights, privacy, safety, or property</li>
                <li><strong>Business Transfers:</strong> If FitVogue is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction</li>
              </ul>
              <p className="mt-4">We do not sell your personal information to third parties.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Your Privacy Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, such as:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Accessing your personal information</li>
                <li>Correcting inaccurate information</li>
                <li>Deleting your personal information</li>
                <li>Restricting or objecting to processing</li>
                <li>Data portability</li>
                <li>Withdrawing consent</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us using the information provided in the "Contact Us" section.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
              <p>
                The Service is not intended for children under the age of 13. We do not knowingly collect information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-2">
                Email: privacy@fitvogue.com<br />
                Address: 123 Fashion Street, San Francisco, CA 94105
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPage;
