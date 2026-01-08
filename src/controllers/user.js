import { updateUserAvatar } from '../service/users.js';

export const uploadAvatarController = async (req, res) => {
  await updateUserAvatar(req.user._id, req.file);

  res.json({
    status: 200,
    message: "Successfully updated user's avatar!",
    data: {},
  });
};
