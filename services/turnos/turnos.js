import prisma from '../../prisma/prisma.js';

export const getTurnosMedicoSVC = async id_medico => {
  try {
    const turnos = await prisma.turnos.findMany({
      where: {
        id_medico: id_medico,
        estado: 'disponible',
      },
      select: {
        id_turno: true,
        fecha: true,
        hora: true,
        estado: true,
      },
    });

    return turnos;
  } catch (error) {
    console.log(error);
    return 500;
  }
};

//Que no se muestren turnos pasados. fecha > new Date()

export const reservarTurnoSVC = async (id_turno, id_usuario) => {
  try {
    const turno = await prisma.turnos.update({
      where: {
        id_turno: id_turno,
      },
      data: {
        estado: 'reservado',
        id_paciente: id_usuario,
      },
    });

    return turno;
  } catch (error) {
    console.log(error);
    return 500;
  }
};

export const cancelarTurnoSVC = async id_turno => {
  try {
    const turno = await prisma.turnos.update({
      where: {
        id_turno: id_turno,
      },
      data: {
        estado: 'cancelado',
      },
    });

    return turno;
  } catch (error) {
    console.log(error);
    return 500;
  }
};

export const getTurnosStatusSVC = async (status, id_usuario) => {
  try {
    const turnos = await prisma.turnos.findMany({
      where: {
        id_paciente: id_usuario,
        estado: status,
      },
      select: {
        id_turno: true,
        fecha: true,
        hora: true,
        estado: true,
        info_medico: {
          select: {
            especialidad: true,
            nombre: true,
            apellido: true,
          },
        },
      },
    });

    return turnos;
  } catch (error) {
    console.log(error);
    return 500;
  }
};
