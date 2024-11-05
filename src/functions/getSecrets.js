// netlify/getSecrets.js
export async function handler(event, context) {
  console.log("data requested");
  
    const secrets = {
      apiKey: process.env.VITE_API_KEY,
      apiSecret: process.env.VITE_API_SECRET,
      pinataJwt: process.env.VITE_PINATA_JWT,
      contractAddress: process.env.VITE_CONTRACT_ADDRESS,
      providerLink: process.env.VITE_PROVIDER_LINK,
    };
  
    return {
      statusCode: 200,
      body: JSON.stringify(secrets),
    };
  }
  