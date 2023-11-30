
const hostname = '127.0.0.1';
const port = 3000;
const express=require('express')
let app=express()
const path=require("path")
app.use("/static",express.static("static"))

app.set('view engine', 'pug')

app.set("views",path.join(__dirname,"views"))
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contact');
    console.log("connected")

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String

},
    {
        versionKey: false
    }
)

const userModel = mongoose.model("userModel", userSchema)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/contact',(req,res)=>{
  res.render('contact')
})
app.post('/contact', async (req, res) => {
  try {

      const data = new userModel(req.body);
      await data.save();
      console.log('User saved successfully!');
      // Respond with a success message or any necessary data
      res.status(200).redirect('/');
  } catch (error) {
      console.error('Error saving user:', error.message);
      // Respond with an error status and message
      res.status(500).send('Error saving user: ' + error.message);
  }
});





app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
app.get('/about',(req,res)=>{
  res.render('about')
})
app.get('/services',(req,res)=>{
  res.render('services')
})


//app.post('/contact', (req, res) => {
 // const { name, email, message } = req.body;

  // Here, you can process the contact form data (e.g., send an email, save to a database, etc.)
  // For this example, let's just log the received data.
  //console.log('Received:', { name, email, message });

  // Assuming the data was received successfully, send a success response.
 // res.json({ success: true });
//});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});