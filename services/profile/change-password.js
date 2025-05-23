import prisma from '../../prisma/prisma.js';

export const getActualPassword = async id_usuario => {
  try {
    const password = await prisma.usuarios.findUnique({
      where: {
        id_usuario: id_usuario,
      },
      select: {
        contrasenia: true,
      },
    });
    return password;
  } catch (error) {
    console.log(error);
    return 500;
  }
};

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
