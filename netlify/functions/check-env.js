// Simple function to check environment variables
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

  try {
    const envCheck = {
      hasUser: !!process.env.HOSTINGER_EMAIL_USER,
      hasPass: !!process.env.HOSTINGER_EMAIL_PASS,
      user: process.env.HOSTINGER_EMAIL_USER ? 'Set' : 'Not Set',
      pass: process.env.HOSTINGER_EMAIL_PASS ? 'Set' : 'Not Set',
      nodeVersion: process.version,
      timestamp: new Date().toISOString()
    };

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: JSON.stringify({
        message: 'Environment check',
        environment: envCheck,
        allSet: envCheck.hasUser && envCheck.hasPass
      }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: JSON.stringify({ 
        error: 'Environment check failed',
        details: error.message 
      }),
    };
  }
};
