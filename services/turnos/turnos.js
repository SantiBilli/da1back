import prisma from '../../prisma/prisma.js';

// export const getTurnosMedicoSVC = async id_medico => {
//   try {
//     const turnos = await prisma.turnos.findMany({
//       where: {
//         id_medico: id_medico,
//         estado: 'disponible',
//       },
//       select: {
//         id_turno: true,
//         fecha: true,
//         hora: true,
//         estado: true,
//       },
//     });

//     return turnos;
//   } catch (error) {
//     console.log(error);
//     return 500;
//   }
// };

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
        estado: 'disponible',
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
            pfp: true,
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

export const getTurnosFechasSVC = async id_medico => {
  try {
    const today = new Date();

    let fechasMedico = await prisma.turnos.findMany({
      where: {
        id_medico: id_medico,
        fecha: {
          gte: today,
        },
        estado: 'disponible',
      },
      select: {
        fecha: true,
      },
      distinct: ['fecha'],
      orderBy: {
        fecha: 'asc',
      },
    });

    if (fechasMedico.length != 0) {
      fechasMedico = fechasMedico.map(f => ({
        fecha: f.fecha.toISOString().split('T')[0], // "YYYY-MM-DD"
      }));
    }

    return fechasMedico;
  } catch (error) {
    console.log(error);
    return 500;
  }
};

export const getTurnosHorariosSVC = async (fecha, id_medico) => {
  try {
    let horariosMedico = await prisma.turnos.findMany({
      where: {
        fecha: new Date(fecha),
        id_medico: id_medico,
        estado: 'disponible',
      },
      select: {
        id_turno: true,
        hora: true,
      },
      orderBy: {
        hora: 'asc',
      },
    });

    if (horariosMedico.length !== 0) {
      horariosMedico = horariosMedico.map(t => ({
        id_turno: t.id_turno,
        hora: t.hora.toISOString().split('T')[1], // Formato: "HH:mm:ss"
      }));
    }

    return horariosMedico;
  } catch (error) {
    console.log(error);
    return 500;
  }
};

export const getTurnoByIdSVC = async id_turno => {
  try {
    const turno = await prisma.turnos.findUnique({
      where: {
        id_turno: id_turno,
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
            pfp: true,
            direccion: true,
          },
        },
      },
    });

    const notas = await prisma.notas.findMany({
      where: {
        id_turno: id_turno,
      },
      select: {
        id_nota: true,
        nota: true,
        fecha: true,
        imagenes: {
          select: {
            id_imagen: true,
            imagen: true,
          },
        },
      },
      orderBy: {
        fecha: 'desc',
      },
    });

    return { turno: turno, notas: notas };
  } catch (error) {
    console.log(error);
    return 500;
  }
};
