import prisma from '../../prisma/prisma.js';

export const loginSVC = async mail => {
  try {
    const userData = await prisma.usuarios.findFirst({
      select: {
        id_usuario: true,
        contrasenia: true,
      },
      where: {
        mail: mail,
      },
    });

    return userData;
  } catch (error) {
    console.log(error);
    return 500;
  }
};
