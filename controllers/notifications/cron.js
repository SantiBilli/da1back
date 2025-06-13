import prisma from '../../prisma/prisma.js';
import enviarMailTurno from '../notifications/notifications.js';
import cron from 'node-cron';

const ejecutarNotificaciones = async () => {
  const ahoraUTC = new Date();
  const ahoraUTC3 = new Date(ahoraUTC.getTime() - 3 * 60 * 60 * 1000);
  const en24h = new Date(ahoraUTC3.getTime() + 24 * 60 * 60 * 1000);

  const fecha = en24h.toISOString().split('T')[0];
  const hora = en24h.toISOString().split('T')[1].split('.')[0];

  console.log(`Buscando turnos entre ${fecha} y ${hora}`);

  try {
    const turnos = await prisma.turnos.findMany({
      where: {
        notificado: null,
        fecha: new Date(fecha),
        hora: {
          lt: new Date(`${fecha}T${hora}`),
        },
      },
      include: {
        usuarios_turnos_id_pacienteTousuarios: true,
      },
    });

    for (let turno of turnos) {
      const usuario = turno.usuarios_turnos_id_pacienteTousuarios;

      console.log(usuario.mail, turno.id_turno);

      if (!usuario?.mail) continue;

      await enviarMailTurno({
        to: usuario.mail,
        nombre: usuario.nombre ?? 'Paciente',
        fecha: turno.fecha.toISOString().split('T')[0],
        hora: turno.hora.toTimeString().split(' ')[0],
      });

      console.log(`Mail enviado a ${usuario.mail} por turno ${turno.id_turno}`);

      await prisma.turnos.update({
        where: { id_turno: turno.id_turno },
        data: { notificado: 1 },
      });
    }
  } catch (err) {
    console.error('Error en cron de turnos:', err);
  }
};

// setInterval(ejecutarNotificaciones, 5000);
// cron.schedule('0 * * * *', ejecutarNotificaciones);
cron.schedule('*/30 * * * *', ejecutarNotificaciones);
