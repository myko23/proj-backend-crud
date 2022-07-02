//GLOBAL IMPORTS
import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex'

//LOCAL IMPORTS
import database from './Data/Users.js'
import Display from './controllers/Display.js'
import Signin from './controllers/Signin.js'
import Register from './controllers/Register.js'
import Image from './controllers/Image.js'

//INITIALIZATION
const app = express();

//SETTING THE DATABASE
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '1234',
    database : 'db-crud'
  }
});


//BODY PARSER
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors())

//INITIAL REQUEST
app.get('/', Display.handleDisplay(db))
// //SIGNIN REQUEST
app.post('/signin', Signin.handleSignin(db,bcrypt))
//REGISTER NEW USER REQUEST
app.post('/register', Register.handleRegister(db,bcrypt))
//GETTING PROFILE RECORD
app.get('/profile/:id',(req,res)=>{
	//DESTRUCTURING
	const { id } = req.params;
	db.select('*').from('users').where({id:id})
		.then(user => {
			user.length 
				? res.json(user[0])
				: res.status(400).json('User not found')
		})
		.catch(err=> res.status(400).json('Error'))


})

//PUT. Adding entries inside the user
app.put('/image',Image.handleImage(db))


const PORT = process.env.PORT;

app.listen(PORT || 3000, ()=>{
	console.log(`app is running on port ${PORT}`)
})



/*
/ -default
/signin - post - signin the user in his account
/register - post - create new user
/profile/:userId - get - get new user check
/entries - gets the entries.

*/