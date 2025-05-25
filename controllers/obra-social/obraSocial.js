import {
  validarObraSocialSVC,
  getObrasSocialesSVC,
  getPlanesObraSocialSVC,
  registrarObraSocialSVC,
  deleteOldObraSocialSVC,
} from '../../services/obra-social/obraSocial.js';

import { v4 } from 'uuid';

export const validarObraSocialCTL = async (req, res) => {
  const id_usuario = req.jwtData.id_usuario;
  const tieneObraSocial = await validarObraSocialSVC(id_usuario);
  if (tieneObraSocial === 500) return res.status(500).json({ message: 'Error inesperado' });
  return res
    .status(200)
    .json({ data: { tieneObra: tieneObraSocial }, message: 'El usuario tiene obra social' });
};

export const getObrasSocialesCTL = async (req, res) => {
  const obrasSociales = await getObrasSocialesSVC();
  if (obrasSociales === 500) return res.status(500).json({ message: 'Error inesperado' });
  return res.status(200).json({ data: obrasSociales, message: 'Obras sociales obtenidas' });
};

export const getPlanesObraSocialCTL = async (req, res) => {
  const id_obra_social = req.params.id;
  const planesObraSocial = await getPlanesObraSocialSVC(id_obra_social);
  if (planesObraSocial.length === 0) return res.status(404).json({ message: 'Obra social no encontrada' });
  if (planesObraSocial === 500) return res.status(500).json({ message: 'Error inesperado' });
  return res.status(200).json({ data: planesObraSocial, message: 'Planes de obra social obtenidos' });
};

export const registrarObraSocialCTL = async (req, res) => {
  const { id_obra_social, id_plan, nro_credencial } = req.body;
  const id_usuario = req.jwtData.id_usuario;

  const deleteOldObraSocial = await deleteOldObraSocialSVC(id_usuario);

  const id = v4();

  const registrarObraSocial = await registrarObraSocialSVC(
    id,
    id_usuario,
    id_obra_social,
    id_plan,
    nro_credencial
  );

  if (registrarObraSocial === 500) return res.status(500).json({ message: 'Error inesperado' });

  return res.status(200).json({ message: 'Obra social registrada correctamente' });
};
