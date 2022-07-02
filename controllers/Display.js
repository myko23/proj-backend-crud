const handleDisplay = (db) => (req,res)=> {
	db.select('*').from('users').orderBy('id')
		.then(users => res.json(users))
		.catch(err=>res.json('Error'))
}

export default {handleDisplay};

