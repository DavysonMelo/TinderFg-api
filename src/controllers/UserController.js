const User = require('../models/User');

module.exports = {


    async index(req, res) {
        try{
            const { gender, age} = req.query;

            let users;

            if(gender === 'Female, Male' || gender === 'Male, Female'){
                users = await User.find({ age: { $lte: age } }); 
            }else{
                users = await User.find({ gender, age: {$lte: age} });
            }

        return res.json(users);
        
        }catch(error){
            console.log('Search error');
        }
    },


    async store(req, res) {
        const request = req.body;

        const { email } = request;

        try{

        let user = await User.findOne({ email });

        if(!user){

            user = await User.create({
                name: request.name,
                email: request.email,
                password: request.password,
                gender: request.gender,
                interest: request.interest,
                instagram: request.instagram,
                age: request.age,
                photos: request.photos,
                bio: request.bio
            });

        }else{
            return res.json({message: 'User already exists'});
        }

        return res.json(user);

        }catch(error){
            console.log('insert error');
        }

    }
};