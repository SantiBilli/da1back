import { getMedicoPorEspecialidadSVC, getMedicoPorIdSVC } from '../../services/home/home.js';

export const getDoctorPorEspecialidadCTL = async (req, res) => {
  const { especialidad } = req.params;
  const doctors = await getMedicoPorEspecialidadSVC(especialidad);
  if (doctors === 500) return res.status(500).json({ message: 'Error interno del servidor' });
  if (!doctors) return res.status(404).json({ message: 'No se encontraron medicos para esta especialidad' });
  return res.status(200).json(doctors);
}

export const getMedicoPorIdCTL = async (req, res) => {
  const { id } = req.params;
  const doctor = await getMedicoPorIdSVC(id);
  if (doctor === 500) return res.status(500).json({ message: 'Error inesperado' });
  if (!doctor) return res.status(404).json({ message: 'Medico no encontrado' });
  return res.status(200).json(doctor);
}
