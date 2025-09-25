import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags - These will be handled by the main index.html */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Hydrogen RO",
          "description": "Contact Hydrogen RO for RO water purifier installation, repair, and maintenance services in Bengaluru",
          "mainEntity": {
            "@type": "LocalBusiness",
            "name": "Hydrogen RO",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "MG Road",
              "addressLocality": "Bengaluru",
              "addressRegion": "Karnataka",
              "postalCode": "560001",
              "addressCountry": "IN"
            },
            "telephone": "+91-8884944288",
            "email": "info@hydrogenro.com",
            "url": "https://hydrogenro.com",
            "openingHours": "Mo-Su 08:00-20:00",
            "areaServed": {
              "@type": "City",
              "name": "Bengaluru"
            }
          }
        })}
      </script>

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-gray-900">Hydrogen RO</a>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="/services" className="text-gray-600 hover:text-gray-900">Services</a>
              <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="/contact" className="text-blue-600 font-medium">Contact</a>
              <a href="/blog" className="text-gray-600 hover:text-gray-900">Blog</a>
            </nav>
            <div className="flex items-center space-x-4">
              <a href="tel:+918884944288" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Call +91-8884944288
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          Contact Hydrogen RO
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Get in touch with us for professional RO water purifier services in Bengaluru. 
          We're here to help 24/7!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Phone</h3>
                <p className="text-gray-700">+91-8884944288</p>
                <p className="text-sm text-gray-600">Call us for immediate assistance</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="text-gray-700">info@hydrogenro.com</p>
                <p className="text-sm text-gray-600">Send us an email anytime</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Working Hours</h3>
                <p className="text-gray-700">24/7 Emergency Service</p>
                <p className="text-sm text-gray-600">Mon-Sun: 8:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Service Areas</h2>
            <p className="text-gray-700 mb-4">
              We provide RO water purifier services across all areas of Bengaluru including:
            </p>
            <div className="grid grid-cols-2 gap-2 text-gray-600">
              <div>Whitefield</div>
              <div>Electronic City</div>
              <div>Koramangala</div>
              <div>HSR Layout</div>
              <div>Indiranagar</div>
              <div>Marathahalli</div>
              <div>BTM Layout</div>
              <div>Jayanagar</div>
              <div>Malleshwaram</div>
              <div>Rajajinagar</div>
              <div>Bannerghatta</div>
              <div>Hebbal</div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Emergency Service</h2>
          <p className="text-gray-700 mb-4">
            Need urgent RO repair? We provide 24/7 emergency service across Bengaluru.
          </p>
          <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Emergency Contact</h3>
            <p className="text-red-700 font-medium">+91-8884944288</p>
            <p className="text-sm text-red-600">Available 24/7 for emergency RO repairs</p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-900">Quick Contact</h3>
          <p className="text-gray-700 mb-4">
            For non-emergency services, you can reach us during business hours or send us an email.
          </p>
          <div className="space-y-2">
            <p className="text-gray-700">📞 Call: +91-8884944288</p>
            <p className="text-gray-700">✉️ Email: info@hydrogenro.com</p>
            <p className="text-gray-700">💬 WhatsApp: +91-8884944288</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Hydrogen RO</h3>
              <p className="text-gray-300 mb-4">
                Professional RO water purifier services in Bengaluru. Your trusted partner for clean water solutions.
              </p>
              <div className="space-y-2">
                <p className="text-gray-300">📞 +91-8884944288</p>
                <p className="text-gray-300">✉️ info@hydrogenro.com</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Our Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/services" className="hover:text-white">RO Installation</a></li>
                <li><a href="/services" className="hover:text-white">RO Repair</a></li>
                <li><a href="/services" className="hover:text-white">Filter Replacement</a></li>
                <li><a href="/services" className="hover:text-white">Water Softener</a></li>
                <li><a href="/services" className="hover:text-white">Emergency Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Service Areas</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/service-areas" className="hover:text-white">Whitefield</a></li>
                <li><a href="/service-areas" className="hover:text-white">Electronic City</a></li>
                <li><a href="/service-areas" className="hover:text-white">Koramangala</a></li>
                <li><a href="/service-areas" className="hover:text-white">HSR Layout</a></li>
                <li><a href="/service-areas" className="hover:text-white">Indiranagar</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/" className="hover:text-white">Home</a></li>
                <li><a href="/about" className="hover:text-white">About Us</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
                <li><a href="/blog" className="hover:text-white">Blog</a></li>
                <li><a href="/service-areas" className="hover:text-white">Service Areas</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 Hydrogen RO. All rights reserved. | Professional RO Water Purifier Services in Bengaluru, Karnataka</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
