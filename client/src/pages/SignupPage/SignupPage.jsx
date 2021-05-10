import React, { useState } from "react";
import styles from "./SignupPage.module.css";
import { TextField, Button } from "@material-ui/core";
import { Container } from "../../Components";
import axios from "axios";

import { Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default function Signup() {
	const [age, setAge] = React.useState("");

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	let [fields, setFields] = useState({
		name: "",
		email: "",
		password: "",
		address: "",
		ownsCar: "",
		image:"",
		imageUrl:""
	});

	let [auth, setAuth] = useState(false);

	let imageOnChange = (e) => {
		if (e.target.files[0]) {
			let imgUrl = URL.createObjectURL(e.target.files[0]);
			setFields({ ...fields, image: e.target.files[0], imgUrl });
		}
	};

	let submitHandler = (e) => {
		e.preventDefault();

		let {name,email,password,address,ownsCar,image} = fields

		let formdata = new FormData()
		formdata.append('name',name)
		formdata.append('email',email)
		formdata.append('password',password)
		formdata.append('address',address)
		formdata.append('ownsCar',ownsCar)
		formdata.append('image',image)

		console.log(formdata)
		console.log(image)
		axios({
			method: "post",
			url: "/signup",
			data: fields,
		}).then((res) => {
			if (res.data.auth) {
				console.log("yay");
				setAuth(true);
			} else {
				console.log("nay");
			}
		});
	};

	return (
		<Container className={styles.signup}>
			<form className={styles.signinForm} onSubmit={submitHandler}>
				<div className={styles.profileImageWrapper}>
					<div className={styles.fileWrapper}>
						<input
							type="file"
							id={styles.image}
							onChange={imageOnChange}
						/>
						<label for={styles.image}>
							<img
								src={
									fields.imgUrl
										? fields.imgUrl
										: "default.jpg"
								}
							/>
						</label>
					</div>
				</div>
				<TextField
					fullWidth
					className={styles.formField}
					variant="outlined"
					onChange={(e) =>
						setFields({ ...fields, name: e.target.value })
					}
					label="Name"
				/>
				<TextField
					fullWidth
					className={styles.formField}
					variant="outlined"
					onChange={(e) =>
						setFields({ ...fields, email: e.target.value })
					}
					label="Email"
				/>
				<TextField
					fullWidth
					className={styles.formField}
					variant="outlined"
					onChange={(e) =>
						setFields({ ...fields, password: e.target.value })
					}
					label="Password"
				/>
				<TextField
					fullWidth
					className={styles.formField}
					variant="outlined"
					onChange={(e) =>
						setFields({ ...fields, address: e.target.value })
					}
					label="Address"
				/>
				<FormControl
					variant="outlined"
					fullWidth
					className={styles.formField}
				>
					<InputLabel id="demo-simple-select-outlined-label">
						Do you own a car?
					</InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						value={fields.ownsCar}
						onChange={(e) =>
							setFields({ ...fields, ownsCar: e.target.value })
						}
						label="Do you own a car?"
					>
						<MenuItem value={true}>Yes</MenuItem>
						<MenuItem value={false}>No</MenuItem>
					</Select>
				</FormControl>
				<Button
					fullWidth
					className={styles.formButton}
					type="submit"
					color="primary"
					variant="contained"
				>
					Sign Up
				</Button>
			</form>
			{auth && <Redirect to="/home" />}
		</Container>
	);
}
