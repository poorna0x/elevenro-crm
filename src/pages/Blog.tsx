import React from 'react';

const Blog = () => {
  return (
    <div className="min-h-screen bg-white">
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
              <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
              <a href="/blog" className="text-blue-600 font-medium">Blog</a>
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
          Hydrogen RO Blog
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Expert insights, maintenance tips, and the latest news on water purification 
          technology in Bengaluru.
        </p>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Latest Articles</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                How to Maintain Your RO Purifier at Home - Complete Guide
              </h3>
              <p className="text-sm text-gray-600 mb-2">January 20, 2025 • Maintenance • 8 min read</p>
              <p className="text-gray-700">
                Learn the essential steps to keep your RO water purifier running efficiently and extend its lifespan with our comprehensive home maintenance guide.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                RO vs UV vs UF Water Purifiers - Which is Best for Bengaluru Water?
              </h3>
              <p className="text-sm text-gray-600 mb-2">January 15, 2025 • Comparison • 6 min read</p>
              <p className="text-gray-700">
                Confused about RO, UV, and UF? This guide helps you choose the best water purification technology for Bengaluru's unique water quality.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Why Water Softeners are Important in Karnataka Homes
              </h3>
              <p className="text-sm text-gray-600 mb-2">January 10, 2025 • Water Treatment • 5 min read</p>
              <p className="text-gray-700">
                Hard water is a common problem in Karnataka. Discover why water softeners are crucial for your home and health.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                RO Filter Replacement Schedule for Bengaluru Water Quality
              </h3>
              <p className="text-sm text-gray-600 mb-2">January 05, 2025 • Maintenance • 7 min read</p>
              <p className="text-gray-700">
                Understand when and why to replace your RO filters based on Bengaluru's specific water conditions to ensure pure drinking water.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                10 Signs Your RO Purifier Needs Repair - Bengaluru Guide
              </h3>
              <p className="text-sm text-gray-600 mb-2">December 28, 2024 • Repair • 4 min read</p>
              <p className="text-gray-700">
                Don't wait for a complete breakdown. Learn the top 10 warning signs that indicate your RO water purifier needs professional repair.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Best RO Water Purifier Brands in Bengaluru 2025
              </h3>
              <p className="text-sm text-gray-600 mb-2">December 20, 2024 • Buying Guide • 10 min read</p>
              <p className="text-gray-700">
                A comprehensive review of the top RO water purifier brands available in Bengaluru, helping you make an informed purchase decision.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Categories</h2>
          <div className="flex flex-wrap gap-2">
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Maintenance</span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Comparison</span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Water Treatment</span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Repair</span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Buying Guide</span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Tips & Tricks</span>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-900">Stay Updated</h3>
          <p className="text-gray-700 mb-4">
            Subscribe to our newsletter for exclusive maintenance guides, product reviews, and special offers.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Subscribe
            </button>
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

export default Blog;