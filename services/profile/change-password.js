import prisma from "../../prisma/prisma.js";
export const changePasswordSVC = async (id_usuario, password) => {
    try {
        const changePassword = await prisma.usuarios.update({
            where: {
                id_usuario: id_usuario,
            },
            data: {
                contrasenia: password,
            },
        });
        return changePassword;
    } catch (error) {
        console.log(error);
        return 500;
    }
};