export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const userId = req.query.userid || req.body?.userid;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

  if (!BOT_TOKEN) {
    return res.status(500).json({ error: 'Telegram Bot Token is not configured' });
  }

  try {
    // Solicitud oficial a la API de Telegram para crear un enlace de factura por suscripción mensual
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: "Suscripción Mensual - Reenfoque Vital",
        description: "Acceso ilimitado sin anuncios y soporte completo en la app.",
        payload: `sub_monthly_${userId}_${Date.now()}`,
        provider_token: "", // Debe ir vacío obligatoriamente para pagos con Telegram Stars (XTR)
        currency: "XTR",
        prices: [
          { label: "Suscripción Mensual (Sin Anuncios)", amount: 300 } // 300 Telegram Stars
        ],
        subscription_period: 2592000 // Periodo de suscripción en segundos (30 días exactos)
      })
    });

    const data = await response.json();

    if (!data.ok) {
      console.error('Telegram API Error:', data);
      return res.status(500).json({ error: 'Failed to create invoice link with Telegram' });
    }

    return res.status(200).json({ invoiceLink: data.result });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return res.status(200).json({ error: 'Internal server error' });
  }
}
