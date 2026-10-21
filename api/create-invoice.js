export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const userId = req.query.userid || req.body?.userid;
  if (!userId) {
    return res.status(400).json({ error: 'Falta el userid' });
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

  const title = "Pack Reenfoque Vital";
  const description = "Desbloquea contenido exclusivo";
  const payload = `user_payment_${userId}_${Date.now()}`;
  const currency = "XTR";
  const prices = [{ label: "Estrellas", amount: 50 }];

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, payload, currency, prices })
    });

    const data = await response.json();

    if (!data.ok) {
      throw new Error(data.description || 'Error al crear la factura');
    }

    return res.status(200).json({ invoiceLink: data.result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
