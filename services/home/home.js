import prisma from '../../prisma/prisma.js';

export const getMedicosPorEspecialidadSVC = async especialidad => {
  try {
    const medicos = await prisma.usuarios.findMany({
      where: {
        especialidad: especialidad,
        rol: 'medico',
      },
      select: {
        id_usuario: true,
        nombre: true,
        apellido: true,
        especialidad: true,
        disponibilidad: true,
        direccion: true,
        pfp: true,
      },
    });
    return medicos;
  } catch (error) {
    console.error(error);
    return 500;
  }
};

export const getMedicoPorIdSVC = async id => {
  try {
    const medico = await prisma.usuarios.findUnique({
      where: {
        id_usuario: id,
        rol: 'medico',
      },
      select: {
        id_usuario: true,
        nombre: true,
        apellido: true,
        especialidad: true,
        mail: true,
        direccion: true,
      },
    });
    return medico;
  } catch (error) {
    console.error(error);
    return 500;
  }
};
