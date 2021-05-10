import React,{useState} from "react";
import styles from "./CreateRidePage.module.css";

import { Card, Container } from "../../Components";

import { TextField, Button } from "@material-ui/core";

export default function CreateRidePage() {

	const [fields,setFields] = useState({
		to:"",
		from:"",
		carPoolingParticipants:""
	})

	let submitHandler = (e) => {
		e.preventDefault()
	}

	return (
		<Container className={styles.createRide}>
			<Card>
				<h2>Create Ride</h2>
			</Card>
			<div>
				<form className={styles.signinForm} onSubmit={submitHandler}>
					<TextField
						fullWidth
						className={styles.formField}
						variant="outlined"
						onChange={(e) =>
							setFields({ ...fields, email: e.target.value })
						}
						label="From"
					/>
					<TextField
						fullWidth
						className={styles.formField}
						variant="outlined"
						onChange={(e) =>
							setFields({ ...fields, password: e.target.value })
						}
						label="To"
					/>
					<TextField
						fullWidth
						className={styles.formField}
						variant="outlined"
						onChange={(e) =>
							setFields({ ...fields, password: e.target.value })
						}
						label="CarPooling Participants"
					/>
					<Button
						fullWidth
						className={styles.formButton}
						type="submit"
						color="primary"
						variant="contained"
					>
						Create
					</Button>
				</form>
			</div>
		</Container>
	);
}
