const handleSignin = (db,bcrypt) => (req,res) => {
	//DESTRUCTURING
	const {email,password} = req.body;
	//COMPARE HASH
	db.select('*').from('users')
		.where({'email':email})
		.then(user=>{
			bcrypt.compareSync(password,user[0].password)
				? res.json(user[0])
				: res.status(400).json('User not found')
		})
		.catch(err=> res.status(400).json('Error'))
}

export default {handleSignin}