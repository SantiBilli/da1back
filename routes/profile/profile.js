import { Router } from 'express';
import { deleteProfileCTL, getProfilesCTL, updateProfileCTL } from '../../controllers/profile/profile.js';
import { validateToken } from '../../middlewares/authenticator.js';
import { upload } from '../../middlewares/fileUpload.js';

const profileRouter = Router();

profileRouter.get('/profiles', validateToken, getProfilesCTL);
profileRouter.patch('/profiles', validateToken, upload.single('image'), updateProfileCTL);
profileRouter.delete('/profiles', validateToken, deleteProfileCTL);

export default profileRouter;
