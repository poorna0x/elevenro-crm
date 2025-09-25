import React from 'react';

const ServiceAreas = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          Service Areas in Bengaluru
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          We provide professional RO water purifier services across all areas of Bengaluru. 
          Find your area and book service today!
        </p>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Our Service Areas</h2>
          <p className="text-gray-700 mb-6">
            Professional RO services available in all major areas of Bengaluru:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900">Whitefield (560066)</h3>
              <p className="text-sm text-gray-600">Response Time: 30 minutes</p>
              <p className="text-sm text-gray-600">Rating: 4.9/5</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900">Electronic City (560100)</h3>
              <p className="text-sm text-gray-600">Response Time: 45 minutes</p>
              <p className="text-sm text-gray-600">Rating: 4.8/5</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900">Koramangala (560034)</h3>
              <p className="text-sm text-gray-600">Response Time: 25 minutes</p>
              <p className="text-sm text-gray-600">Rating: 4.9/5</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900">HSR Layout (560102)</h3>
              <p className="text-sm text-gray-600">Response Time: 35 minutes</p>
              <p className="text-sm text-gray-600">Rating: 4.8/5</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900">Indiranagar (560038)</h3>
              <p className="text-sm text-gray-600">Response Time: 20 minutes</p>
              <p className="text-sm text-gray-600">Rating: 4.9/5</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900">Marathahalli (560037)</h3>
              <p className="text-sm text-gray-600">Response Time: 40 minutes</p>
              <p className="text-sm text-gray-600">Rating: 4.7/5</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900">BTM Layout (560076)</h3>
              <p className="text-sm text-gray-600">Response Time: 30 minutes</p>
              <p className="text-sm text-gray-600">Rating: 4.8/5</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900">Jayanagar (560011)</h3>
              <p className="text-sm text-gray-600">Response Time: 25 minutes</p>
              <p className="text-sm text-gray-600">Rating: 4.9/5</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900">Malleshwaram (560003)</h3>
              <p className="text-sm text-gray-600">Response Time: 35 minutes</p>
              <p className="text-sm text-gray-600">Rating: 4.8/5</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900">Rajajinagar (560010)</h3>
              <p className="text-sm text-gray-600">Response Time: 30 minutes</p>
              <p className="text-sm text-gray-600">Rating: 4.7/5</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900">Bannerghatta (560076)</h3>
              <p className="text-sm text-gray-600">Response Time: 50 minutes</p>
              <p className="text-sm text-gray-600">Rating: 4.6/5</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900">Hebbal (560024)</h3>
              <p className="text-sm text-gray-600">Response Time: 45 minutes</p>
              <p className="text-sm text-gray-600">Rating: 4.7/5</p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Services We Offer</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• RO Installation</li>
            <li>• RO Repair & Maintenance</li>
            <li>• Filter Replacement</li>
            <li>• Water Softener Service</li>
            <li>• Emergency Repair</li>
            <li>• Annual Maintenance</li>
          </ul>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Why Choose Us?</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Quick Response - Average response time of 30 minutes</li>
            <li>• Certified Technicians - All technicians are certified and experienced</li>
            <li>• Quality Guarantee - 100% satisfaction guarantee on all services</li>
            <li>• Local Expertise - Deep understanding of local water quality</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-900">Contact Us</h3>
          <p className="text-gray-700 mb-2">Phone: +91-8884944288</p>
          <p className="text-gray-700 mb-2">Email: info@hydrogenro.com</p>
          <p className="text-gray-700">Available: 24/7 Emergency Service</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceAreas;
