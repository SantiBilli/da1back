import prisma from '../../prisma/prisma.js';

export const getProfilesSVC = async id_usuario => {
  try {
    const profiles = await prisma.usuarios.findUnique({
      where: {
        id_usuario: id_usuario,
      },
      select: {
        id_usuario: true,
        nombre: true,
        apellido: true,
        mail: true,
        pfp: true,
        afiliaciones: {
          select: {
            nro_credencial: true,
            obras_sociales: {
              select: {
                id_obra_social: true,
                nombre: true,
              },
            },
            planes_obras_sociales: {
              select: {
                id_plan: true,
                nombre_plan: true,
              },
            },
          },
        },
      },
    });
    return profiles;
  } catch (error) {
    console.log(error);
    return 500;
  }
};

export const updateProfileSVC = async (id_usuario, nombre, apellido, mail, pfp) => {
  try {
    const dataUpdate = {};
    if (nombre != '') dataUpdate.nombre = nombre;
    if (apellido != '') dataUpdate.apellido = apellido;
    if (mail) dataUpdate.mail = mail;
    if (pfp) dataUpdate.pfp = pfp;

    const profile = await prisma.usuarios.update({
      where: {
        id_usuario: id_usuario,
      },
      data: dataUpdate,
    });
    return profile;
  } catch (error) {
    console.log(error);
    return 500;
  }
};

export const deleteOldPfpSVC = async id_usuario => {
  try {
    const profile = await prisma.usuarios.findUnique({
      where: {
        id_usuario: id_usuario,
      },
      select: {
        pfp: true,
      },
    });
    return profile;
  } catch (error) {
    console.log(error);
    return 500;
  }
};

export const deleteProfileSVC = async id_usuario => {
  try {
    const profile = await prisma.usuarios.delete({
      where: {
        id_usuario: id_usuario,
      },
    });
    return profile;
  } catch (error) {
    console.log(error);
    return 500;
  }
};

export const liberarTurnosDeUsuarioSVC = async id_usuario => {
  try {
    const turnosActualizados = await prisma.turnos.updateMany({
      where: {
        id_paciente: id_usuario,
        estado: 'reservado',
      },
      data: {
        estado: 'disponible',
        id_paciente: null,
      },
    });

    return turnosActualizados;
  } catch (error) {
    console.error('Error al liberar turnos:', error);
    return 500;
  }
};
