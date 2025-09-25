import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags - These will be handled by the main index.html */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Hydrogen RO",
          "description": "Learn about Hydrogen RO, your trusted partner for RO water purifier services in Bengaluru, Karnataka",
          "mainEntity": {
            "@type": "LocalBusiness",
            "name": "Hydrogen RO",
            "description": "Professional RO water purifier installation, repair, and maintenance services in Bengaluru, Karnataka",
            "foundingDate": "2019",
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
            "areaServed": {
              "@type": "City",
              "name": "Bengaluru"
            },
            "numberOfEmployees": "15-20",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "127",
              "bestRating": "5",
              "worstRating": "1"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "RO Water Purifier Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "RO Installation"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "RO Repair"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Filter Replacement"
                  }
                }
              ]
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
              <a href="/about" className="text-blue-600 font-medium">About</a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
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
          About Hydrogen RO - Water Purifier Services
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Hydrogen RO is your trusted partner for clean water solutions in Bengaluru, Karnataka. 
          We've been serving the community with professional RO water purifier services since 2019.
        </p>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            To provide clean, safe drinking water to every home in Bengaluru through professional 
            RO water purifier installation, repair, and maintenance services.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Our Story</h2>
          <p className="text-gray-700 mb-4">
            Founded in 2019, Hydrogen RO started as a small team of certified technicians with a 
            passion for water purification technology. Over the years, we've grown to become one 
            of the most trusted RO service providers in Bengaluru, serving over 3000+ satisfied 
            customers across all areas of the city.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Our Values</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Customer First - We prioritize customer satisfaction above everything else</li>
            <li>• Quality Assurance - Only genuine parts and certified technicians</li>
            <li>• Timely Service - Punctual service delivery with same-day availability</li>
            <li>• Excellence - Striving for excellence in every service we provide</li>
          </ul>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Our Team</h2>
          <p className="text-gray-700 mb-4">
            Our team consists of certified and experienced technicians who are dedicated to 
            providing the best RO water purifier services in Bengaluru. All our technicians 
            undergo regular training to stay updated with the latest technology and techniques.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Certifications & Awards</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• ISO Certified - Quality management system certification</li>
            <li>• Certified Technicians - All technicians are certified and trained</li>
            <li>• Customer Choice - Most trusted RO service provider in Bengaluru</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-900">Contact Us</h3>
          <p className="text-gray-700 mb-2">Phone: +91-8884944288</p>
          <p className="text-gray-700">Email: info@hydrogenro.com</p>
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

export default About;
