
import Layout from "@/components/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQPage = () => {
  const faqs = [
    {
      question: "How does the Smart Fit Finder work?",
      answer: "Our Smart Fit Finder uses AI to analyze your voice input about preferences like size, style, fabric, and more. It then matches these preferences with items in our catalog to recommend products that will fit you perfectly."
    },
    {
      question: "Can I return items if they don't fit?",
      answer: "Yes, we offer a hassle-free 30-day return policy for items that don't fit. Simply initiate a return through your account, and we'll provide a prepaid shipping label."
    },
    {
      question: "How accurate are the fit recommendations?",
      answer: "Our fit recommendations are highly accurate, with a 95% satisfaction rate. The system gets even better at predicting your perfect fit the more you shop with us."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location. You can check specific shipping details at checkout."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can also view your order status and tracking information in the 'Orders' section of your account."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay."
    },
    {
      question: "How do I create an account?",
      answer: "Click on the 'Account' icon in the top navigation bar, then select 'Sign Up'. Follow the prompts to create your account with your email address and a secure password."
    },
    {
      question: "Can I change or cancel my order?",
      answer: "You can change or cancel your order within 1 hour of placing it. After that, the order enters our fulfillment process and cannot be modified."
    },
    {
      question: "Do you offer gift wrapping?",
      answer: "Yes, we offer gift wrapping services for an additional $5 per item. You can select this option during checkout."
    },
    {
      question: "How can I become a seller on FitVogue?",
      answer: "Interested brands and designers can apply to become a seller through our Seller Dashboard. We review all applications to ensure they meet our quality and ethical standards."
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-8 pt-6 border-t">
            <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
            <p className="text-gray-600">
              If you couldn't find the answer to your question, please contact our customer support team.
            </p>
            <div className="mt-4">
              <a href="mailto:support@fitvogue.com" className="text-primary hover:underline">
                support@fitvogue.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQPage;
