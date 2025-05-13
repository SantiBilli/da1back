import { validarObraSocialSVC, getObrasSocialesSVC, getPlanesObraSocialSVC } from '../../services/obra-social/obraSocial.js';

export const validarObraSocialCTL = async (req, res) => {
    const id_usuario = req.jwtData.id_usuario;
    const tieneObraSocial = await validarObraSocialSVC(id_usuario);
    if (tieneObraSocial === 500) return res.status(500).json({ message: 'Error inesperado' });
    return res.status(200).json({ tieneObraSocial: tieneObraSocial });
};

export const getObrasSocialesCTL = async (req, res) => {
    const obrasSociales = await getObrasSocialesSVC();
    if (obrasSociales === 500) return res.status(500).json({ message: 'Error inesperado' });
    return res.status(200).json({ obrasSociales });
};

export const getPlanesObraSocialCTL = async (req, res) => {
    const id_obra_social = req.params.id;
    const planesObraSocial = await getPlanesObraSocialSVC(id_obra_social);
    if (planesObraSocial.length === 0) return res.status(404).json({ message: 'Obra social no encontrada' });
    if (planesObraSocial === 500) return res.status(500).json({ message: 'Error inesperado' });
    return res.status(200).json({ planesObraSocial });
}


