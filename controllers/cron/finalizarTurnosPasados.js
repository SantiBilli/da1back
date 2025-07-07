import prisma from '../../prisma/prisma.js';
import cron from 'node-cron';

const finalizarTurnosPasados = async () => {
  const ahoraUTC = new Date();
  const ahoraUTC3 = new Date(ahoraUTC.getTime() - 3 * 60 * 60 * 1000);

  const hoyUTC3 = new Date(ahoraUTC3.toISOString().split('T')[0]);
  const manianaUTC3 = new Date(hoyUTC3.getTime() + 24 * 60 * 60 * 1000);

  console.log(`Turnos desde: ${hoyUTC3.toISOString()} hasta ${manianaUTC3.toISOString()}`);

  try {
    const turnos = await prisma.turnos.findMany({
      where: {
        estado: 'reservado',
        fecha: hoyUTC3,
      },
    });

    for (const turno of turnos) {
      const fechaStr = turno.fecha.toISOString().split('T')[0];
      const horaStr = turno.hora.toTimeString().split(' ')[0];

      const fechaHoraTurno = new Date(`${fechaStr}T${horaStr}`);

      console.log(
        `Turno ID: ${
          turno.id_turno
        }, Fecha y Hora: ${fechaHoraTurno.toISOString()}, Ahora: ${ahoraUTC3.toISOString()}`
      );

      if (fechaHoraTurno <= ahoraUTC3) {
        await prisma.turnos.update({
          where: {
            id_turno: turno.id_turno,
          },
          data: {
            estado: 'finalizado',
          },
        });

        console.log(`Turno ${turno.id_turno} finalizado.`);
      }
    }
  } catch (err) {
    console.error('Error al finalizar turnos:', err);
  }
};

cron.schedule('*/30 * * * *', finalizarTurnosPasados);
// setInterval(finalizarTurnosPasados, 5000); // Solo para testing
