import { Router } from 'express';
import { uploadAvatarController } from '../controllers/user.js';
import { upload } from '../middlewares/multer.js';
import { authenticate } from '../middlewares/authenticate.js';

const usersRouter = Router();
usersRouter.use('/users', authenticate);

usersRouter.post(
  '/users/upload-avatar',
  upload.single('avatar'),
  uploadAvatarController,
);

export default usersRouter;
