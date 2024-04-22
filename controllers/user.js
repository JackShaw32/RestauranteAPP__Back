const User = require("../models/user");

async function getMe(req, res) {
  const { user_id } = req.user;
  const user = await User.findById(user_id);

  if (!user) {
    return res.status(400).send({ msg: "No se ha encontrado al usuario" });
  } else {
    return res.status(200).send(user);
  }
}

async function getUsers(req, res) {
  try {
    const Users = await User.find();
    res.status(200).send(Users);
  } catch (err) {
    res.status(400).send({ msg: "Error al obtener los usuarios" });
  }
}

// Nueva función para actualizar el estado del usuario
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
      return res.status(400).send({ msg: "No se ha encontrado al usuario" });
    }

    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ msg: "Error al actualizar el estado del usuario", err });
  }
}

module.exports = {
  getMe,
  getUsers,
  updateUserStatus,
};
