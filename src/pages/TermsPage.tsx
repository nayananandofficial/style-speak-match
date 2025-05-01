
import Layout from "@/components/Layout";

const TermsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
        
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <p className="text-sm text-muted-foreground mb-8 text-center">
            Last updated: May 1, 2025
          </p>
          
          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p>
                Welcome to FitVogue. These Terms of Service ("Terms") govern your use of the FitVogue website, mobile application, and services (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Service.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
              <p>
                <strong>"FitVogue"</strong> refers to our company, website, mobile application, and services.<br />
                <strong>"User"</strong> refers to any individual who accesses or uses the Service.<br />
                <strong>"Content"</strong> refers to all text, images, videos, and other materials available on the Service.<br />
                <strong>"User Content"</strong> refers to any content uploaded, shared, or created by users, including reviews, comments, and feedback.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
              <p>
                To access certain features of the Service, you may need to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding the password that you use to access the Service. You agree not to disclose your password to any third party and assume full responsibility for all activities that occur under your account.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Use of the Service</h2>
              <p>
                FitVogue grants you a limited, non-exclusive, non-transferable, and revocable license to access and use the Service for personal, non-commercial purposes. You agree not to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Use the Service in any way that violates any applicable law or regulation;</li>
                <li>Use the Service for any harmful or fraudulent purpose;</li>
                <li>Attempt to gain unauthorized access to any part of the Service;</li>
                <li>Interfere with or disrupt the Service;</li>
                <li>Copy, modify, or create derivative works of the Service or its content;</li>
                <li>Use any robot, spider, or other automated device to access or scrape the Service.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">5. User Content</h2>
              <p>
                By submitting User Content to the Service, you grant FitVogue a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute such content. You represent and warrant that you own or have the necessary rights to such User Content and that it does not violate the rights of any third party.
              </p>
              <p className="mt-2">
                FitVogue reserves the right to remove any User Content that violates these Terms or is otherwise objectionable, at our sole discretion.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Payments and Purchases</h2>
              <p>
                By making a purchase through the Service, you agree to provide accurate and complete payment information. You authorize FitVogue to charge your payment method for all purchases you make. Prices for products are subject to change without notice. All purchases are final and non-refundable, except as required by law or as outlined in our Return Policy.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Privacy</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy, which explains how we collect, use, and disclose information about you.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Disclaimer of Warranties</h2>
              <p>
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
              <p>
                IN NO EVENT SHALL FITVOGUE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
              <p>
                FitVogue reserves the right to modify these Terms at any time. We will provide notice of significant changes by posting the updated Terms on the Service and updating the "Last updated" date. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at legal@fitvogue.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;
