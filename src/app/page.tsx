import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className="homepage-container">
      {/* Header Section */}
      <header className="header-section bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-12">
        <h1 className="text-4xl font-bold mb-4 ">Build Your Dream Portfolio</h1>
        <p className="text-lg mb-6 transition-transform">
          Showcase your work, skills, and achievements with ease.
        </p>
        <Link
          href="/login"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg font-medium transition-transform hover:scale-105 animate-pulse"
        >
          Get Started
        </Link>
      </header>

      {/* Features Section */}
      <section className="features-section py-12">
        <h2 className="text-3xl font-bold text-center mb-8 ">Why Choose Us?</h2>
        <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div className="feature-card text-center transform transition-transform duration-500 hover:scale-110">
            <Image
              src="/images/customizable.svg"
              alt="Customizable"
              width={80}
              height={80}
            />
            <h3 className="text-xl font-semibold mt-4">
              Customizable Templates
            </h3>
            <p className="mt-2 text-gray-600">
              Choose from a wide range of stunning templates.
            </p>
          </div>
          <div className="feature-card text-center transform transition-transform duration-500 hover:scale-110">
            <Image
              src="/images/easy-publish.svg"
              alt="Easy Publish"
              width={80}
              height={80}
            />
            <h3 className="text-xl font-semibold mt-4">Easy to Publish</h3>
            <p className="mt-2 text-gray-600">
              Publish your portfolio with just a few clicks.
            </p>
          </div>
          <div className="feature-card text-center transform transition-transform duration-500 hover:scale-110">
            <Image
              src="/images/analytics.svg"
              alt="Analytics"
              width={80}
              height={80}
            />
            <h3 className="text-xl font-semibold mt-4">Detailed Analytics</h3>
            <p className="mt-2 text-gray-600">
              Track visits and engagement with built-in analytics.
            </p>
          </div>
        </div>
      </section>

      {/* Templates Preview Section */}
      <section className="templates-preview py-12 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8 ">
          Explore Our Templates
        </h2>
        <div className="templates-grid grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          <div className="template-card transform transition-transform duration-500 hover:scale-110">
            <Image
              src="/images/template1.png"
              alt="Template 1"
              width={300}
              height={200}
              className="rounded-md"
            />
            <p className="text-center mt-4 font-medium">Modern Design</p>
          </div>
          <div className="template-card transform transition-transform duration-500 hover:scale-110">
            <Image
              src="/images/template2.png"
              alt="Template 2"
              width={300}
              height={200}
              className="rounded-md"
            />
            <p className="text-center mt-4 font-medium">Creative Style</p>
          </div>
          <div className="template-card transform transition-transform duration-500 hover:scale-110">
            <Image
              src="/images/template3.png"
              alt="Template 3"
              width={300}
              height={200}
              className="rounded-md"
            />
            <p className="text-center mt-4 font-medium">Professional Look</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section py-12">
        <h2 className="text-3xl font-bold text-center mb-8 ">
          What Our Users Say
        </h2>
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          <div className="testimonial-card bg-white p-6 rounded-lg shadow-md transform transition-transform duration-500 hover:scale-105">
            <p className="text-gray-600">
              &quot;This platform made it so easy to create a stunning
              portfolio!&quot;
            </p>
            <h4 className="mt-4 font-semibold">- Alex Johnson</h4>
          </div>
          <div className="testimonial-card bg-white p-6 rounded-lg shadow-md transform transition-transform duration-500 hover:scale-105">
            <p className="text-gray-600">
              &quot;I love the templates and how customizable everything
              is!&quot;
            </p>
            <h4 className="mt-4 font-semibold">- Priya Sharma</h4>
          </div>
          <div className="testimonial-card bg-white p-6 rounded-lg shadow-md transform transition-transform duration-500 hover:scale-105">
            <p className="text-gray-600">
              &quot;The analytics feature helped me understand my audience
              better.&quot;
            </p>
            <h4 className="mt-4 font-semibold">- Mark Lee</h4>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section bg-gray-800 text-white py-6 text-center">
        <p className="">
          &copy; {new Date().getFullYear()} Portfolio Builder. All rights
          reserved.
        </p>
        <div className="mt-4">
          <Link
            href="/about"
            className="text-blue-400 mx-2 transition-transform duration-500 hover:scale-110"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-blue-400 mx-2 transition-transform duration-500 hover:scale-110"
          >
            Contact
          </Link>
          <Link
            href="/terms"
            className="text-blue-400 mx-2 transition-transform duration-500 hover:scale-110"
          >
            Terms
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default page;
