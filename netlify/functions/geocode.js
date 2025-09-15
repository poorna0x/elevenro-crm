// Netlify Function for geocoding (address lookup)
exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: '',
    };
  }

  // Only allow GET and POST requests
  if (!['GET', 'POST'].includes(event.httpMethod)) {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    let lat, lon, query;

    if (event.httpMethod === 'GET') {
      // For reverse geocoding (coordinates to address)
      const params = new URLSearchParams(event.queryStringParameters || {});
      lat = params.get('lat');
      lon = params.get('lon');
      
      if (!lat || !lon) {
        return {
          statusCode: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          },
          body: JSON.stringify({ error: 'Missing lat or lon parameters' }),
        };
      }
    } else {
      // For forward geocoding (address to coordinates)
      const { query: searchQuery } = JSON.parse(event.body);
      query = searchQuery;
      
      if (!query) {
        return {
          statusCode: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          },
          body: JSON.stringify({ error: 'Missing query parameter' }),
        };
      }
    }

    let url;
    if (lat && lon) {
      // Reverse geocoding
      url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1&extratags=1&namedetails=1&accept-language=en`;
    } else {
      // Forward geocoding
      url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=in&limit=5&addressdetails=1`;
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'HydrogenRO/1.0 (contact@hydrogenro.com)'
      }
    });

    if (!response.ok) {
      throw new Error(`Nominatim API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: JSON.stringify(data),
    };

  } catch (error) {
    console.error('Geocoding error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: JSON.stringify({ 
        error: 'Geocoding failed',
        details: error.message 
      }),
    };
  }
};
