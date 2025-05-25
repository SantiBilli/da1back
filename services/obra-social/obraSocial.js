import prisma from '../../prisma/prisma.js';

export const validarObraSocialSVC = async id_usuario => {
  try {
    const usuario = await prisma.usuarios.findUnique({
      where: {
        id_usuario: id_usuario,
      },
      select: {
        id_afiliacion: true,
      },
    });
    return !!usuario.id_afiliacion;
  } catch (error) {
    console.log(error);
    return 500;
  }
};

export const getObrasSocialesSVC = async () => {
  try {
    const obrasSociales = await prisma.obras_sociales.findMany({
      select: {
        id_obra_social: true,
        nombre: true,
      },
    });
    return obrasSociales;
  } catch (error) {
    console.log(error);
    return 500;
  }
};

export const getPlanesObraSocialSVC = async id_obra_social => {
  try {
    const planesObraSocial = await prisma.planes_obras_sociales.findMany({
      where: {
        id_obra_social: id_obra_social,
      },
      select: {
        id_plan: true,
        nombre_plan: true,
      },
    });
    return planesObraSocial;
  } catch (error) {
    console.log(error);
    return 500;
  }
};

export const registrarObraSocialSVC = async (id, id_usuario, id_obra_social, id_plan, nro_credencial) => {
  try {
    const obraSocial = await prisma.$transaction([
      prisma.afiliaciones.create({
        data: {
          id_afiliaciones: id,
          id_obra_social: id_obra_social,
          id_plan: id_plan,
          nro_credencial: Number(nro_credencial),
        },
      }),
      prisma.usuarios.update({
        where: {
          id_usuario: id_usuario,
        },
        data: {
          id_afiliacion: id,
        },
      }),
    ]);
    return obraSocial;
  } catch (error) {
    console.log(error);
    return 500;
  }
};

export const deleteOldObraSocialSVC = async id_usuario => {
  try {
    const usuario = await prisma.usuarios.findUnique({
      where: { id_usuario },
      select: { id_afiliacion: true },
    });

    if (!usuario?.id_afiliacion) {
      return null;
    }

    const idAfiliacion = usuario.id_afiliacion;

    const resultado = await prisma.$transaction([
      prisma.usuarios.update({
        where: { id_usuario },
        data: { id_afiliacion: null },
      }),

      prisma.afiliaciones.delete({
        where: { id_afiliaciones: idAfiliacion },
      }),
    ]);

    return resultado;
  } catch (error) {
    console.log(error);
    return 500;
  }
};
