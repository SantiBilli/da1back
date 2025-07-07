import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'smartswapsip@gmail.com',
    pass: 'errz tzzp rija oxkn',
  },
});

const enviarMailTurno = async ({ to, nombre, fecha, hora }) => {
  const mailOptions = {
    from: 'smartswapsip@gmail.com',
    to,
    subject: '🩺 Recordatorio de turno médico',
    text: `Hola ${nombre},\n\nEste es un recordatorio de que tenés un turno el día ${fecha} a las ${hora}.\n\nSaludos.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #3AB4E5;">🩺 Recordatorio de Turno Médico</h2>
        <p>Hola <strong>${nombre}</strong>,</p>
        <p>Este es un recordatorio de que tenés un turno programado.</p>
        <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #ddd; margin: 20px 0;">
          <p><strong>📅 Fecha:</strong> ${fecha}</p>
          <p><strong>⏰ Hora:</strong> ${hora}</p>
        </div>
        <p style="margin-bottom: 30px;">Si no podés asistir, te recomendamos reprogramarlo con anticipación.</p>
        <p style="font-size: 0.9em; color: #555;">Gracias por confiar en nuestro sistema de salud.</p>
        <hr style="margin: 20px 0;" />
        <p style="font-size: 0.8em; color: #aaa;">Este es un mensaje automático. Por favor, no respondas a este correo.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
export default enviarMailTurno;
