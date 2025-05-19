import { changePasswordSVC } from "../../services/profile/change-password.js";
import bcrypt from 'bcrypt';
export const changePasswordCTL = async (req, res) => {
    const id_usuario= req.jwtData.id_usuario;
    const password = req.body.contrasenia;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const changePassword = await changePasswordSVC(id_usuario, hashPassword);

    if (changePassword == 500) return res.status(500).json({ message: 'Internal Server Error' });
    res.status(200).json({ message: 'Contraseña cambiada correctamente' });
};