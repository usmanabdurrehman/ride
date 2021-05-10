let router = require('express').Router()
let User = require('../Models/User')
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
let multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/profileImages')
  },
  filename: function (req, file, cb) {
  	let [filename,ext] = file.originalname.split('.')
  	console.log(file)
  	console.log(req.body)
  	req.filename = `${req.body.email}.${ext}`
    cb(null, req.filename)
  }
})
 
var upload = multer({ storage: storage })

// tested
router.post('/signin',(req,res)=>{
	let {email,password} = req.body

	User.findOne({email}).lean()
	.then(user=>{
		if(user){
			if(bcrypt.compareSync(password, user.password)){
				delete user.password
				jwt.sign(user,'secret',(err,token)=>{
					if(err) return res.send({auth:false})
					return res.send({auth:true,user,token})
				})
			}
			else{
				return res.send({auth:false})
			}
		}
		else{
			res.send({auth:false})
		}
	})
})

// tested
router.post('/signup',upload.any(),(req,res)=>{
	let {name,password,email,ownsCar,address} = req.body
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(password, salt);

	console.log(req.filename)

	let newUser = new User({
		name,
		email,
		address,
		password:hash,
		isMember:ownsCar,
		image:req.filename
	})

	newUser.save()
	.then((user)=>{
		res.send({status:true,user})
	})
	.catch(err=>{
		res.send({status:false,msg:'The user was not created'})
	})
})

module.exports = router