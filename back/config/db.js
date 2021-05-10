const mongoose = require('mongoose');

const conn = mongoose.connect('mongodb+srv://QWERTY:QWERTY@cluster0.usc1l.mongodb.net/ridehail?retryWrites=true&w=majority',{
	useUnifiedTopology: true ,
	useNewUrlParser: true
})
.then(()=>{
	console.log('Mongodb connected')
})
