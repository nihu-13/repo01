const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/practice01');
    console.log("connected")

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = new mongoose.Schema({
    name: String
},
    {
        versionKey: false
    }
)

const userModel = mongoose.model("userModel", userSchema)

async function saveUser() {
    try {
        const newUser = new userModel({
            name: 'niharika sahu',
            // Other fields
        });

        // Save the document
        await newUser.save();
        console.log('User saved successfully!');
        // Continue with other operations after saving
    } catch (error) {
        console.error('Error saving user:', error.message);
    }
}

saveUser();
// find data 
async function getUsers() {
    let users;
    try {
        users = await userModel.find();
        if (!users) {
            throw Error('No Users Found')
        } else {
            return users;
        }
    } catch (error) {
        console.log(error.message);
    }
}
getUsers().then((data) => { console.log(data) })

