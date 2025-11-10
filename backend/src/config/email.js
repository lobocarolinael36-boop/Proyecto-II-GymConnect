// src/config/email.js
import nodemailer from 'nodemailer';

// Configuración del transporter (usa Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'wearegymconnect@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'nubobnqorphifdxk'
  }
});

// IMPORTANTE: Para Gmail, necesitas crear una "Contraseña de aplicación"
// Instrucciones: https://support.google.com/accounts/answer/185833

export const enviarEmailAprobacion = async (datosProfesor) => {
  const { nombre, apellido, email_personal, email_corporativo, password_temporal } = datosProfesor;

  const mailOptions = {
    from: process.env.EMAIL_USER || 'tu-email@gmail.com',
    to: email_personal,
    subject: '🎉 Tu solicitud como Profesor en GymConnect fue aprobada',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 32px;">GymConnect</h1>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #00ff87; margin-top: 0;">¡Felicidades, ${nombre} ${apellido}!</h2>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Tu solicitud para ser profesor en <strong>GymConnect</strong> ha sido aprobada exitosamente. 
            Ahora formas parte de nuestro equipo de profesionales.
          </p>
          
          <div style="background: #f0f0f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #667eea; margin-top: 0;">📧 Tus credenciales de acceso:</h3>
            <p style="margin: 10px 0;"><strong>Email corporativo:</strong><br/>
              <code style="background: white; padding: 8px 12px; border-radius: 4px; display: inline-block; margin-top: 5px; color: #00ff87; font-size: 14px;">${email_corporativo}</code>
            </p>
            <p style="margin: 10px 0;"><strong>Contraseña temporal:</strong><br/>
              <code style="background: white; padding: 8px 12px; border-radius: 4px; display: inline-block; margin-top: 5px; color: #ff4444; font-size: 14px;">${password_temporal}</code>
            </p>
          </div>
          
          <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #856404; font-size: 14px;">
              ⚠️ <strong>Importante:</strong> Por seguridad, te recomendamos cambiar tu contraseña temporal al iniciar sesión por primera vez.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="http://localhost:5173/login" 
               style="background: linear-gradient(135deg, #00ff87 0%, #60efff 100%); 
                      color: #0a0a0a; 
                      padding: 15px 40px; 
                      text-decoration: none; 
                      border-radius: 25px; 
                      font-weight: bold; 
                      display: inline-block;
                      font-size: 16px;">
              Iniciar Sesión Ahora
            </a>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
          
          <p style="color: #666; font-size: 14px; text-align: center; margin: 0;">
            Si tienes alguna pregunta, no dudes en contactarnos.<br/>
            <strong>GymConnect Team</strong>
          </p>
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email enviado:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error enviando email:', error);
    throw error;
  }
};

export default transporter;
