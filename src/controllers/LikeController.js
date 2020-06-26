const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { targetId } = req.params;
    const { user } = req.headers;

    try {
      const loggedUser = await User.findById(user);
      const targetUser = await User.findById(targetId);

      if (!targetUser) {
        return res.status(400).send({ error: "User not exists" });
      }

      if (targetUser.likes.includes(loggedUser._id)) {
        const loggedSocket = req.connectedUsers[user];
        const targetSocket = req.connectedUsers[targetId];

        if (loggedSocket) {
          req.io.to(loggedSocket).emit("match", targetUser);
        }

        if (targetSocket) {
          req.io.to(loggedSocket).emit("match", loggedUser);
        }

        loggedUser.matches.push(targetUser._id);
        targetUser.matches.push(targetUser._id);
      }

      loggedUser.likes.push(targetUser._id);

      await loggedUser.save();
      await targetUser.save();
    } catch (error) {
      console.log("Like error", error);
    }

    return res.json({ message: "User liked!" });
  },
};
