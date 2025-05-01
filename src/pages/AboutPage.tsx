
import Layout from "@/components/Layout";

const AboutPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">About FitVogue</h1>
        
        <div className="bg-white rounded-lg shadow-sm border p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              FitVogue was founded in 2025 with a simple mission: to help people find clothing that truly fits their unique body types. We understand that standard sizes don't work for everyone, and that finding the perfect fit can transform not only how you look, but how you feel.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Our team of fashion experts, data scientists, and tech enthusiasts came together to create an innovative platform that uses advanced AI to match your body measurements and preferences with the perfect garment.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              We envision a world where everyone can shop confidently online, knowing that what they order will fit perfectly when it arrives. By combining cutting-edge technology with fashion expertise, we're revolutionizing the way people shop for clothes.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2 text-primary">Inclusivity</h3>
                <p className="text-gray-600">We believe fashion should be accessible to everyone, regardless of body shape or size.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2 text-primary">Innovation</h3>
                <p className="text-gray-600">We constantly push the boundaries of what's possible with technology and fashion.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2 text-primary">Sustainability</h3>
                <p className="text-gray-600">We're committed to reducing waste by helping customers buy right the first time.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2 text-primary">Transparency</h3>
                <p className="text-gray-600">We believe in honest, clear communication with our customers and partners.</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <p className="text-gray-600 leading-relaxed">
              FitVogue is powered by a diverse team of fashion enthusiasts, AI specialists, and customer experience experts. We're united by our passion for solving the age-old problem of finding clothes that fit perfectly.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              We're headquartered in San Francisco, with team members across the globe, bringing together diverse perspectives and expertise.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
