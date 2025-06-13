import prisma from '../../prisma/prisma.js';
import enviarMailTurno from '../notifications/notifications.js';
import cron from 'node-cron';

const ejecutarNotificaciones = async () => {
  const ahoraUTC = new Date();
  const ahoraUTC3 = new Date(ahoraUTC.getTime() - 3 * 60 * 60 * 1000);
  const en24h = new Date(ahoraUTC3.getTime() + 24 * 60 * 60 * 1000);

  // const fecha = en24h.toISOString().split('T')[0];
  // const hora = en24h.toISOString().split('T')[1].split('.')[0];

  const fechaHoy = ahoraUTC3.toISOString().split('T')[0];
  const fechaManiana = en24h.toISOString().split('T')[0];

  // console.log(`Buscando turnos antes de ${fecha} a las ${hora}`);

  try {
    const turnos = await prisma.turnos.findMany({
      where: {
        notificado: null,
        fecha: {
          in: [new Date(fechaHoy), new Date(fechaManiana)],
        },
      },
      include: {
        usuarios_turnos_id_pacienteTousuarios: true,
      },
    });

    for (const turno of turnos) {
      if (!turno.fecha || !turno.hora) continue;

      const fechaStr = turno.fecha.toISOString().split('T')[0];
      const horaStr = turno.hora.toTimeString().split(' ')[0];
      const fechaHoraTurno = new Date(`${fechaStr}T${horaStr}`);

      console.log(fechaHoraTurno, ahoraUTC3, en24h);

      if (fechaHoraTurno > ahoraUTC3 && fechaHoraTurno <= en24h) {
        const usuario = turno.usuarios_turnos_id_pacienteTousuarios;
        if (!usuario?.mail) continue;

        await enviarMailTurno({
          to: usuario.mail,
          nombre: usuario.nombre ?? 'Paciente',
          fecha: fechaStr,
          hora: new Date(turno.hora.getTime() + 3 * 60 * 60 * 1000).toTimeString().split(' ')[0],
        });

        await prisma.turnos.update({
          where: { id_turno: turno.id_turno },
          data: { notificado: 1 },
        });

        console.log(
          `Notificado ${usuario.mail} para ${fechaStr} ${
            new Date(turno.hora.getTime() + 3 * 60 * 60 * 1000).toTimeString().split(' ')[0]
          }`
        );
      }
    }
  } catch (err) {
    console.error('Error en cron de turnos:', err);
  }
};

// setInterval(ejecutarNotificaciones, 5000);
// cron.schedule('0 * * * *', ejecutarNotificaciones);
cron.schedule('*/30 * * * *', ejecutarNotificaciones);
