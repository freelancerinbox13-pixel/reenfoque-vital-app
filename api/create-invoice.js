export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const userId = req.query.userid || req.body?.userid;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    // Aquí puedes configurar la creación del enlace de factura (invoice link) 
    // usando la API de Telegram con los parámetros de la suscripción mensual de 300 Stars.
    
    // Ejemplo de la estructura que devolvería el enlace de pago:
    const invoiceLink = "https://t.me/$invoice_example_link"; 

    return res.status(200).json({ invoiceLink });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
