export default function handler(req, res) {
  const { userid } = req.query;

  if (!userid) {
    return res.status(400).json({ error: 'Falta el parámetro userid' });
  }

  // Registro de control de la recompensa
  console.log(`Recompensa entregada al usuario ID: ${userid}`);

  return res.status(200).json({ success: true, message: 'Recompensa procesada correctamente' });
}