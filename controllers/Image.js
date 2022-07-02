const handleImage = (db)=> (req,res) => {
	//DESTRUCTURING
	const { id } = req.body;

	//KNEX UPDATE. Update entries in the database.
	db('users').where('id','=',id)
		.increment('entries',1)
		.returning('*')
		.then(user => res.json(user[0]))
		.catch(err=>res.status(404).json('Error User'))
}

export default {handleImage}