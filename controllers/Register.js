const handleRegister = (db,bcrypt) => (req,res) => {
	//DESTRUCTURING
	const { email, name, password } = req.body
	//HASHING THE PASSWORD
	const hash = bcrypt.hashSync(password);
	//ADDING NEW USER IN DATABASE
	db('users')
		.returning('*')
		.insert({
		email: email,
		name: name,
		password: hash
	})
		.then(user=>{
			res.json(user[0]);
		})
		.catch(err=> res.status(400).json('Unable to Register'))
}

export default {handleRegister}
