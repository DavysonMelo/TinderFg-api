const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    async index(req, res) {
        try{
            const { email, password } = req.body;

            const user = await User.findOne({ email }).select('+password');

            if(!user) {
              return res.json({ error: 'User not fount' });
            }

            if(!await bcrypt.compare(password, user.password)) {
              res.json({ error: 'Invalid password' });
            }

            user.password = undefined;

            return res.json(user);
        }catch(error){
            console.log('Login error');
        }
    }
};