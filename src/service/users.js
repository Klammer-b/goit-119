import { User } from '../db/models/user.js';
import { saveFile } from '../helper/saveFile.js';

export const updateUserAvatar = async (userId, avatar) => {
  const fileUrl = await saveFile(avatar);

  await User.findByIdAndUpdate(userId, { avatarUrl: fileUrl });
};
