import React from 'react';

const Services = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags - These will be handled by the main index.html */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "RO Water Purifier Services",
          "description": "Professional RO water purifier installation, repair, and maintenance services in Bengaluru, Karnataka",
          "provider": {
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
            "areaServed": {
              "@type": "City",
              "name": "Bengaluru"
            },
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 12.9716,
                "longitude": 77.5946
              },
              "geoRadius": "50000"
            }
          },
          "offers": [
            {
              "@type": "Offer",
              "name": "RO Installation",
              "description": "Professional RO water purifier installation service",
              "price": "400",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock"
            },
            {
              "@type": "Offer",
              "name": "RO Repair",
              "description": "Expert RO water purifier repair and troubleshooting",
              "price": "300",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock"
            },
            {
              "@type": "Offer",
              "name": "Filter Replacement",
              "description": "RO filter replacement and maintenance service",
              "price": "200",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock"
            }
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "127",
            "bestRating": "5",
            "worstRating": "1"
          }
        })}
      </script>

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <a href="/" className="text-xl md:text-2xl font-bold text-gray-900">Hydrogen RO</a>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="text-gray-600 hover:text-gray-900 focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 lg:space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900 text-sm lg:text-base">Home</a>
              <a href="/services" className="text-blue-600 font-medium text-sm lg:text-base">Services</a>
              <a href="/about" className="text-gray-600 hover:text-gray-900 text-sm lg:text-base">About</a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900 text-sm lg:text-base">Contact</a>
              <a href="/blog" className="text-gray-600 hover:text-gray-900 text-sm lg:text-base">Blog</a>
            </nav>

            {/* Call Button */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="tel:+918884944288" className="bg-blue-600 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-blue-700 text-sm lg:text-base">
                Call +91-8884944288
              </a>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3 pt-4">
              <a href="/" className="text-gray-600 hover:text-gray-900 py-2">Home</a>
              <a href="/services" className="text-blue-600 font-medium py-2">Services</a>
              <a href="/about" className="text-gray-600 hover:text-gray-900 py-2">About</a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900 py-2">Contact</a>
              <a href="/blog" className="text-gray-600 hover:text-gray-900 py-2">Blog</a>
              <a href="tel:+918884944288" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center mt-2">
                Call +91-8884944288
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
          RO Water Purifier Services in Bengaluru | Best RO Repair & Installation
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Professional RO water purifier installation, repair, and maintenance services by certified technicians in Bengaluru, Karnataka. 
          Same-day service, 24/7 emergency support across all areas of Bangalore. Trusted by 3000+ customers.
        </p>

        {/* SEO Keywords Section */}
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Why Choose Our RO Services in Bengaluru?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>✅ Certified RO Technicians</div>
            <div>✅ Same Day Service Available</div>
            <div>✅ All RO Brands Supported</div>
            <div>✅ 24/7 Emergency Repair</div>
            <div>✅ Genuine Spare Parts</div>
            <div>✅ 1 Year Warranty</div>
            <div>✅ Free Site Survey</div>
            <div>✅ Competitive Pricing</div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900">Complete RO Water Purifier Services in Bengaluru</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">RO Installation Services</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Kent RO Installation in Bengaluru</li>
                <li>• Aquaguard RO Setup & Installation</li>
                <li>• Pureit RO Water Purifier Installation</li>
                <li>• Livpure RO Installation Service</li>
                <li>• All Brands RO Installation</li>
                <li>• Starting from ₹400 - Best Price in Bangalore</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">RO Repair & Maintenance</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• RO Water Purifier Repair Service</li>
                <li>• Filter Replacement in Bengaluru</li>
                <li>• RO Membrane Replacement</li>
                <li>• Water Softener Service</li>
                <li>• Emergency RO Repair - 24/7</li>
                <li>• Annual Maintenance Contract (AMC)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Service Areas in Bengaluru</h2>
          <p className="text-gray-700 mb-4">
            We provide RO water purifier services across all areas of Bengaluru including:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-gray-600">
            <div>Whitefield (560066)</div>
            <div>Electronic City (560100)</div>
            <div>Koramangala (560034)</div>
            <div>HSR Layout (560102)</div>
            <div>Indiranagar (560038)</div>
            <div>Marathahalli (560037)</div>
            <div>BTM Layout (560076)</div>
            <div>Jayanagar (560011)</div>
            <div>Malleshwaram (560003)</div>
            <div>Rajajinagar (560010)</div>
            <div>Bannerghatta (560076)</div>
            <div>Hebbal (560024)</div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Why Choose Hydrogen RO?</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Same-day service availability</li>
            <li>• Certified and experienced technicians</li>
            <li>• 100% satisfaction guarantee</li>
            <li>• All areas of Bengaluru covered</li>
            <li>• Genuine spare parts only</li>
            <li>• Competitive pricing</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-900">Contact Us</h3>
          <p className="text-gray-700 mb-2">Phone: +91-8884944288</p>
          <p className="text-gray-700 mb-2">Email: info@hydrogenro.com</p>
          <p className="text-gray-700">Available: 24/7 Emergency Service</p>
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

export default Services;
