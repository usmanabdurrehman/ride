let router = require('express').Router()
let User = require('../Models/User')
let Ride = require('../Models/Ride')
let bcrypt = require('bcryptjs')
let multer = require('multer')

/*
	Rides
*/

// tested
router.post('/getRide',(req,res)=>{

	let id = req.body.id

	Ride.findById(id).lean()
	.then(ride=>{
		res.send({ride,status:true})
	})
	.catch(err=>{
		res.send({
			status:false,
			msg:'Some unexpected error occured'
		})
	})
})

// tested
router.get('/getRidesOfUser',(req,res)=>{

	let user = req.user
	console.log(user)

	Ride.find({'carPoolingParticipants':user.email}).lean()
	.then(rides=>{
		console.log(user)
		console.log(rides)
		res.send({rides,status:true})
	})
	.catch(err=>{
		res.send({
			status:false,
			msg:'Some unexpected error occured'
		})
	})
})

router.get('/getLatestRides',(req,res)=>{
	Ride.find().sort({createdAt:-1}).limit(5).lean()
	.then(rides=>{
		res.send({rides,status:true})
	})
	.catch((err)=>{
		res.send({
			status:false,
			msg:'Some unexpected error occured'
		})
	})
})

router.get('/canCarPool',(req,res)=>{

	let user = req.user

	Ride.find({'carPoolingParticipants':user.email}).lean()
	.then(rides=>{
		if((rides.length==1 && ((new Date - new Date(rides[0].createAt))/(1000*60*60*24)>7)) || !rides){
			return res.send({canCarPool:true,status:true})
		}else{
			return res.send({canCarPool:false,status:true})
		}
	})
	.catch(err=>{
		res.send({
			status:false,
			msg:'Some unexpected error occured'
		})
	})
})

// tested
router.post('/createRide',(req,res)=>{
	console.log('yo')
	let user = req.user

	let {from,to,carPoolingParticipants} = req.body

	let newRide = new Ride({
		from,to,carPoolingParticipants,start:Date.now()
	})

	newRide.save()
	.then(ride=>{
		res.send({
			status:true,
			msg:'Ride added successfully'
		})
	})
	.catch(err=>{
		res.send({
			status:false,
			msg:'Some unexpected error occured'
		})
	})	
})

// tested
router.post('/endRide',(req,res)=>{

	let {id} = req.body

	let updatedItem = {
		end: Date.now()
	}

	Ride.findByIdAndUpdate(id,updatedItem)
	.then(ride=>{
		res.send({
			status:true,
			msg:'Ride updated successfully'
		})
	})
	.catch(err=>{
		res.send({
			status:false,
			msg:'Some unexpected error occured'
		})
	})	
})

/*
	Users
*/

// tested
router.post('/getUser',(req,res)=>{

	let id = req.body.id

	User.findById(id).lean()
	.then(user=>{
		res.send({user,status:true})
	})
	.catch(err=>{
		res.send({
			status:false,
			msg:'Some unexpected error occured'
		})
	})
})

// tested
router.post('/updateUser',(req,res)=>{

	let {id,name,email,ownsCar,isCarPoolingRightNow,isVerified,isLongTermUser} = req.body

	let updateUser = {
		name,
		email,
		isMember:ownsCar,
		isCarPoolingRightNow,
		isVerified,
		isLongTermUser
	}

	Object.keys(updateUser).forEach((k) => !updateUser[k] && delete updateUser[k]);

	User.findByIdAndUpdate(id,updateUser).lean()
	.then(user=>{
		res.send({user,status:true})
	})
	.catch(err=>{
		res.send({
			status:false,
			msg:'Some unexpected error occured'
		})
	})
})

module.exports = router