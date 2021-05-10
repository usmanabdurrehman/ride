let express = require('express')
let app = express()
let cors = require('cors')
let jwt = require('jsonwebtoken')
let db = require('./config/db')
let cookieParser = require('cookie-parser')

app.use(cors({
	origin:true,
	credentials:true
}))

app.use(cookieParser())
app.use(express.json())

app.use(express.static(__dirname + '/public'))

app.use('/user',(req,res,next)=>{
	let token = req.cookies['token']
	console.log(token)
	if(token){
		jwt.verify(token,'secret',(err,decoded)=>{
			if(err) return res.sendStatus(403)
			req.user = decoded
			return next()
		})
	}
	else{
		return res.sendStatus(403)
	}
})

app.use('/',(req,res,next)=>{
	console.log(`${req.path} got hit`)
	next()
})


app.use('/',require('./apis/generalApi'))
app.use('/user',require('./apis/userApi'))


app.listen(7000,()=>{
	console.log('Listening on port 7000')
})
