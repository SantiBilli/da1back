import {
  cancelarTurnoSVC,
  getTurnosMedicoSVC,
  getTurnosStatusSVC,
  reservarTurnoSVC,
} from '../../services/turnos/turnos.js';

export const getTurnosMedicoCTL = async (req, res) => {
  const { id_medico } = req.params;

  const turnos = await getTurnosMedicoSVC(id_medico);

  if (turnos == 500) return res.status(500).json({ message: 'Internal Server Error' });

  return res.status(200).json(turnos);
};

export const reservarTurnoCTL = async (req, res) => {
  const { id_turno } = req.params;
  const id_usuario = req.jwtData.id_usuario;

  const reservarTurno = await reservarTurnoSVC(id_turno, id_usuario);

  if (reservarTurno == 500) return res.status(500).json({ message: 'Internal Server Error' });

  res.status(200).json({ message: 'Turno reservado' });
};

export const cancelarTurnoCTL = async (req, res) => {
  const { id_turno } = req.params;

  const cancelarTurno = await cancelarTurnoSVC(id_turno);

  if (cancelarTurno == 500) return res.status(500).json({ message: 'Internal Server Error' });

  res.status(200).json({ message: 'Turno cancelado' });
};

export const turnosStatusCTL = async (req, res) => {
  const { status } = req.params;
  const id_usuario = req.jwtData.id_usuario;

  const turnos = await getTurnosStatusSVC(status, id_usuario);

  if (turnos == 500) return res.status(500).json({ message: 'Internal Server Error' });

  return res.status(200).json(turnos);
};
