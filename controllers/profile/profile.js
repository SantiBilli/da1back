import {
  getProfilesSVC,
  updateProfileSVC,
  deleteOldPfpSVC,
  deleteProfileSVC,
} from '../../services/profile/profile.js';
import { emailExistsSVC } from '../../services/auth/register.js';
import fs from 'fs';

export const getProfilesCTL = async (req, res) => {
  const id_usuario = req.jwtData.id_usuario;
  const profiles = await getProfilesSVC(id_usuario);
  if (profiles == 500) return res.status(500).json({ message: 'Internal Server Error' });
  res.status(200).json({ data: profiles, message: 'Profiles obtained successfully' });
};

export const updateProfileCTL = async (req, res) => {
  const { nombre, apellido, mail } = req.body;
  const image = req.file;
  const id_usuario = req.jwtData.id_usuario;

  if (mail) {
    const verifyEmailExists = await emailExistsSVC(mail);
    if (verifyEmailExists === 500) return res.status(500).json({ message: 'Internal Server Error' });
    if (verifyEmailExists === 409) return res.status(409).json({ message: 'Email already exists' });
  }

  if (image) {
    const oldPfp = await deleteOldPfpSVC(id_usuario);

    if (oldPfp == 500) return res.status(500).json({ message: 'Internal Server Error' });

    if (oldPfp.pfp != null) {
      fs.unlinkSync('uploads/pfp/' + oldPfp.pfp);
    }
  }

  const updateProfile = await updateProfileSVC(
    id_usuario,
    nombre,
    apellido,
    mail,
    image ? image.filename : null
  );
  if (updateProfile == 500) return res.status(500).json({ message: 'Internal Server Error' });
  res.status(200).json({ data: { pfp: image?.filename }, message: 'Profile updated successfully' });
};

export const deleteProfileCTL = async (req, res) => {
  const id_usuario = req.jwtData.id_usuario;
  const oldPfp = await deleteOldPfpSVC(id_usuario);
  if (oldPfp == 500) return res.status(500).json({ message: 'Internal Server Error' });

  if (oldPfp.pfp != null) {
    fs.unlinkSync('uploads/pfp/' + oldPfp.pfp);
  }

  const deleteProfile = await deleteProfileSVC(id_usuario);
  if (deleteProfile == 500) return res.status(500).json({ message: 'Internal Server Error' });
  res.status(200).json({ message: 'Profile deleted successfully' });
};
