const { Resend } = require('resend');
const User = require('../models/user');

const resend = new Resend('re_KC1QCewx_DjQAXcLQdXhVUEbkxZXjnF5M');

// Función para enviar correos electrónicos
async function sendEmail(to, subject, html) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'scorpion0846@gmail.com',
      subject: 'Bienvenido',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });

    if (error) {
      console.error(error);
      return { success: false, error };
    }

    console.log(data);
    return { success: true, data };
  } catch (err) {
    console.error(err);
    return { success: false, error: err };
  }
}

async function getMe(req, res) {
  const { user_id } = req.user;
  const user = await User.findById(user_id);

  if (!user) {
    return res.status(400).send({ msg: 'No se ha encontrado al usuario' });
  } else {
    return res.status(200).send(user);
  }
}

async function getUsers(req, res) {
  try {
    const Users = await User.find();
    res.status(200).send(Users);
  } catch (err) {
    res.status(400).send({ msg: 'Error al obtener los usuarios' });
  }
}

// Nueva función para actualizar el estado del usuario y enviar correo
async function updateUserStatus(req, res) {
  const { user_id } = req.params;
  const { newStatus } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      user_id,
      { active: newStatus },
      { new: true }
    );

    if (!user) {
      return res.status(400).send({ msg: 'No se ha encontrado al usuario' });
    }

    // Ejemplo de envío de correo electrónico cuando se actualiza el estado del usuario
    const emailTo = 'delivered@resend.dev';
    const emailSubject = 'Actualización de estado de usuario';
    const emailHtml = `<p>El estado de tu cuenta se ha actualizado a ${newStatus}</p>`;

    const emailResult = await sendEmail(emailTo, emailSubject, emailHtml);

    if (emailResult.success) {
      console.log('Correo electrónico enviado exitosamente');
    } else {
      console.error('Error al enviar correo electrónico:', emailResult.error);
    }

    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ msg: 'Error al actualizar el estado del usuario', err });
  }
}

module.exports = {
  getMe,
  getUsers,
  updateUserStatus,
};
