import prisma from '../../prisma/prisma.js';

export const emailExistsSVC = async mail => {
  try {
    const validateEmail = await prisma.usuarios.findFirst({
      where: {
        mail: mail,
      },
      select: {
        mail: true,
      },
    });

    return validateEmail && 409;
  } catch (error) {
    console.error(error);
    return 500;
  }
};

export const registerUserSVC = async (userId, nombre, apellido, mail, contrasenia) => {
  try {
    const registerUser = await prisma.usuarios.create({
      data: {
        id_usuario: userId,
        nombre: nombre,
        apellido: apellido,
        mail: mail,
        contrasenia: contrasenia,
        rol: 'paciente',
      },
    });

    return 201;
  } catch (error) {
    console.error(error);
    return 500;
  }
};
