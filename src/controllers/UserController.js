const User = require("../models/User");
const hashPass = require("../controllers/utils/hashPass");

module.exports = {
  async index(req, res) {
    try {
      const { id } = req.headers;
      const { gender, age } = req.query;

      let users;

      const loggedUser = await User.findById(id);

      if (gender === "Female, Male" || gender === "Male, Female") {
        users = await User.find({
          age: { $lte: age },
          $and: [
            { _id: { $ne: id } },
            { _id: { $nin: loggedUser.likes } },
            { _id: { $nin: loggedUser.matches } },
          ],
        });
      } else {
        users = await User.find({
          gender,
          age: { $lte: age },
          $and: [
            { _id: { $nin: loggedUser.likes } },
            { _id: { $nin: loggedUser.matches } },
          ],
        });
      }
      return res.json(users);
    } catch (error) {
      console.log("Search error", error);
    }
  },

  async store(req, res) {
    const request = req.body;

    const { email } = request;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        const password = request.password;

        user = await User.create({
          name: request.name,
          email: request.email,
          password: await hashPass(password),
          gender: request.gender,
          interest: request.interest,
          instagram: request.instagram,
          age: request.age,
          photos: request.photos,
          bio: request.bio,
        });
      } else {
        return res.json({ message: "User already exists" });
      }

      user.password = undefined;

      return res.json(user);
    } catch (error) {
      console.log("insert error", error);
    }
  },
};
