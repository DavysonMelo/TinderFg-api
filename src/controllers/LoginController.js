const User = require('../models/User');

module.exports = {
    async index(req, res) {
        try{
            const { email, password } = req.body;

            const user = await User.findOne({ email, password });

            return res.json(user);
        }catch(error){
            console.log('Login error');
        }
    },

    async locate(req, res) {
        try{
            const { _id } = req.query;

            const user = await User.findOne({ _id });

            return res.json(user);
            
        }catch(error){
            console.log('Get user logged error');
        }
    }
};