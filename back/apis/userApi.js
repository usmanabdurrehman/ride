let router = require("express").Router();
let User = require("../Models/User");
let Ride = require("../Models/Ride");
let bcrypt = require("bcryptjs");
let multer = require("multer");

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./public/profileImages");
	},
	filename: function (req, file, cb) {
		let [filename, ext] = file.originalname.split(".");
		console.log(file);
		console.log(req.body);
		req.filename = `${Date.now()}.${ext}`;
		cb(null, req.filename);
	},
});

var upload = multer({ storage: storage });

/*
	Rides
*/

// tested
router.post("/getRide", (req, res) => {
	let id = req.body.id;

	Ride.findById(id)
		.lean()
		.then((ride) => {
			res.send({ ride, status: true });
		})
		.catch((err) => {
			res.send({
				status: false,
				msg: "Some unexpected error occured",
			});
		});
});

// tested
router.get("/getRidesOfUser", (req, res) => {
	let user = req.user;
	console.log(user);

	Ride.find({
		$or: [{ carPoolingParticipants: user.email }, { rider: user.email }],
	})
		.sort({ createdAt: -1 })
		.lean()
		.then((rides) => {
			console.log(user);
			console.log(rides);
			res.send({ rides, status: true });
		})
		.catch((err) => {
			res.send({
				status: false,
				msg: "Some unexpected error occured",
			});
		});
});

router.get("/getLatestRides", (req, res) => {
	let user = req.user;

	Ride.find()
		.sort({ createdAt: -1 })
		.limit(5)
		.lean()
		.then((rides) => {
			res.send({
				rides: rides.filter(
					(ride) =>
						!ride.carPoolingParticipants.includes(user.email) ||
						!ride.rider != user.email
				),
				status: true,
			});
		})
		.catch((err) => {
			res.send({
				status: false,
				msg: "Some unexpected error occured",
			});
		});
});

router.post("/canEndCarPool", (req, res) => {
	let user = req.user;
	let { id } = req.body;

	Ride.findById(id)
		.lean()
		.then((ride) => {
			if (
				(new Date() - new Date(ride.createdAt)) /
					(1000 * 60 * 60 * 24) >
				7
			) {
				console.log("allowed");
				return res.send({ canEndCarPool: true, status: true });
			} else {
				console.log("not allowed");
				return res.send({ canEndCarPool: false, status: true });
			}
		})
		.catch((err) => {
			res.send({
				status: false,
				msg: "Some unexpected error occured",
			});
		});
});

router.get("/canCarPool", (req, res) => {
	let user = req.user;

	Ride.find({ carPoolingParticipants: user.email })
		.sort({ createdAt: -1 })
		.lean()
		.then((rides) => {
			console.log(rides);
			// console.log((new Date - new Date(rides[0].createdAt))/(1000*60*60*24))
			if (
				(rides?.length == 1 &&
					(new Date() - new Date(rides[0].createdAt)) /
						(1000 * 60 * 60 * 24) >
						7) ||
				!rides?.length
			) {
				console.log("allowed");
				return res.send({ canCarPool: true, status: true });
			} else {
				console.log("not allowed");
				return res.send({ canCarPool: false, status: true });
			}
		})
		.catch((err) => {
			res.send({
				status: false,
				msg: "Some unexpected error occured",
			});
		});
});

// tested
router.post("/createRide", (req, res) => {
	console.log("yo");
	let user = req.user;

	let { from, to, carPoolingParticipants } = req.body;

	let newRide = new Ride({
		from,
		to,
		carPoolingParticipants,
		start: Date.now(),
		rider: user.email,
	});

	newRide
		.save()
		.then((ride) => {
			res.send({
				status: true,
				msg: "Ride added successfully",
			});
		})
		.catch((err) => {
			res.send({
				status: false,
				msg: "Some unexpected error occured",
			});
		});
});

router.post("/carPool", (req, res) => {

	let user = req.user;

	let { id } = req.body;
	Ride.findById(id)
		.lean()
		.then((ride) => {
			ride.carPoolingParticipants.push(user.email);
			Ride.findByIdAndUpdate(id, ride).then(() => {
				res.send({
					status: true,
					msg: "Carpooling added",
				});
			});
		})
		.catch((err) => {
			res.send({
				status: false,
				msg: "Some unexpected error occured",
			});
		});
});

router.post("/removeCarPool", (req, res) => {
	let user = req.user;

	let { id } = req.body;
	Ride.findById(id)
		.lean()
		.then((ride) => {
			ride.carPoolingParticipants = ride.carPoolingParticipants.filter(
				(part) => part != user.email
			);
			Ride.findByIdAndUpdate(id, ride).then(() => {
				res.send({
					status: true,
					msg: "Carpooling Removed",
				});
			});
		})
		.catch((err) => {
			res.send({
				status: false,
				msg: "Some unexpected error occured",
			});
		});
});

// tested
router.post("/endRide", (req, res) => {
	let { id } = req.body;

	let updatedItem = {
		end: Date.now(),
	};

	Ride.findByIdAndUpdate(id, updatedItem, { new: true })
		.then((ride) => {
			res.send({
				status: true,
				msg: "Ride updated successfully",
			});
		})
		.catch((err) => {
			res.send({
				status: false,
				msg: "Some unexpected error occured",
			});
		});
});

/*
	Users
*/

// tested
router.post("/getUser", (req, res) => {
	let id = req.body.id;

	User.findById(id)
		.lean()
		.then((user) => {
			res.send({ user, status: true });
		})
		.catch((err) => {
			res.send({
				status: false,
				msg: "Some unexpected error occured",
			});
		});
});

router.get("/getLoggedInUser", (req, res) => {
	let user = req.user;

	User.findById(user._id)
		.lean()
		.then((user) => {
			res.send({ user, status: true });
		})
		.catch((err) => {
			res.send({
				status: false,
				msg: "Some unexpected error occured",
			});
		});
});

// tested
router.post("/getUsersWithParticularEmail", (req, res) => {
	let { email } = req.body;
	User.find({ email: new RegExp(email, "i") })
		.limit(10)
		.lean()
		.then((users) => {
			console.log(users);
			console.log(users.filter((user) => user != user.email));
			res.send({
				users: users
					.filter((user) => user.email != req.user.email)
					.map((user) => ({ name: user.email })),
				status: true,
			});
		})
		.catch((err) => {
			res.send({
				status: false,
				msg: "Some unexpected error occured",
			});
		});
});

// tested
router.post("/updateUser", upload.any(), (req, res) => {
	let {
		id,
		name,
		email,
		ownsCar,
		bio,
		isCarPoolingRightNow,
		isVerified,
		isLongTermUser,
	} = req.body;

	let updateUser = {
		name,
		email,
		isMember: ownsCar,
		bio,
		isCarPoolingRightNow,
		isVerified,
		isLongTermUser,
		image: req.filename,
	};

	console.log(req.filename);

	Object.keys(updateUser).forEach(
		(k) => !updateUser[k] && delete updateUser[k]
	);

	User.findByIdAndUpdate(id, updateUser, { new: true })
		.lean()
		.then((user) => {
			res.send({ user, status: true });
		})
		.catch((err) => {
			res.send({
				status: false,
				msg: "Some unexpected error occured",
			});
		});
});

module.exports = router;
