import React, { useState, useEffect } from "react";
import styles from "./EditProfilePage.module.css";

import { TextField, Button } from "@material-ui/core";
import { Container, Card, Card2 } from "../../Components";
import axios from "axios";

import { Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { useSelector, useDispatch } from "react-redux";

import Skeleton from "react-loading-skeleton";

export default function EditProfile() {

	const id = useSelector(state=>state.user)._id

	const [fields, setFields] = useState(null);

	const dispatch = useDispatch()

	useEffect(() => {
		axios({
			url: "/user/getUser",
			method: "post",
			data: { id },
			withCredentials: true,
		}).then((res) => {
			if (res.data.status) {
				setFields({
					...res.data.user,
					imgUrl: "",
					ownsCar: res.data.user.isMember,
				});
			}
		});
	}, []);

	let [status, setStatus] = useState(false);

	let imageOnChange = (e) => {
		if (e.target.files[0]) {
			let imgUrl = URL.createObjectURL(e.target.files[0]);
			setFields({ ...fields, image: e.target.files[0], imgUrl });
		}
	};

	let submitHandler = (e) => {
		e.preventDefault();

		let {
			_id,
			name,
			email,
			password,
			address,
			ownsCar,
			image,
			bio,
		} = fields;

		let formdata = new FormData();
		formdata.append("name", name);
		formdata.append("email", email);
		formdata.append("password", password);
		formdata.append("address", address);
		formdata.append("ownsCar", ownsCar);
		formdata.append("bio", bio);
		formdata.append("image", image);
		formdata.append("id", _id);

		console.log(formdata);
		console.log(image);
		axios({
			method: "post",
			url: "/user/updateUser",
			data: formdata,
			withCredentials: true,
		}).then((res) => {
			if (res.data.status) {
				dispatch({type:'SET_USER',payload:res.data.user})
				console.log("yay");
				console.log(res.data)
				setStatus(true);
			} else {
				console.log("nay");
			}
		});
	};

	return (
		<Container className={styles.editProfile}>
			<Card>
				<h1>Edit Profile</h1>
			</Card>
			{fields ? <Card2>
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
										fields.imgUrl || fields.image
											? fields.imgUrl || (fields.image ? `http://localhost:7000/profileImages/${fields.image}` : null)
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
						value={fields.name}
						onChange={(e) =>
							setFields({ ...fields, name: e.target.value })
						}
						label="Name"
					/>
					<TextField
						fullWidth
						className={styles.formField}
						variant="outlined"
						value={fields.email}
						onChange={(e) =>
							setFields({ ...fields, email: e.target.value })
						}
						label="Email"
					/>
					<TextField
						fullWidth
						className={styles.formField}
						variant="outlined"
						value={fields.password}
						onChange={(e) =>
							setFields({ ...fields, password: e.target.value })
						}
						label="Password"
						type="password"
					/>
					<TextField
						fullWidth
						className={styles.formField}
						value={fields.address}
						variant="outlined"
						onChange={(e) =>
							setFields({ ...fields, address: e.target.value })
						}
						label="Address"
					/>
					<TextField
						fullWidth
						className={styles.formField}
						value={fields?.bio}
						variant="outlined"
						multiline
						rows={4}
						onChange={(e) =>
							setFields({ ...fields, bio: e.target.value })
						}
						label="Bio"
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
								setFields({
									...fields,
									ownsCar: e.target.value,
								})
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
						Save
					</Button>
				</form>
			</Card2> : <Skeleton className={styles.skeleton} height={100} />}
			{status && <Redirect to={`/profile/${id}`} />}
		</Container>
	);
}
