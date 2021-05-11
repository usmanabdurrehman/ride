import React, { useState } from "react";
import styles from "./CreateRidePage.module.css";

import { Card, Container, Card2 } from "../../Components";

import { TextField, Button } from "@material-ui/core";

// import MultiSelect from "react-multi-select-component";
import { Multiselect } from "multiselect-react-dropdown";

import axios from 'axios'

import {Redirect} from 'react-router-dom'

export default function CreateRidePage() {
	const [options, setOptions] = useState([]);

	const [selected, setSelected] = useState([]);

	const [status,setStatus] = useState(false)

	const [fields, setFields] = useState({
		to: "",
		from: "",
		carPoolingParticipants: [],
	});

	let submitHandler = (e) => {
		e.preventDefault();
		axios({
			method:'post',
			url:'/user/createRide',
			withCredentials:true,
			data:fields
		})
		.then((res)=>{
			if(res.data.status){
				setStatus(true)
			}
		})
		.catch(err=>{
			console.log(err)
		})
	};

	let fetchUserEmails = (email) => {
		axios({
			method:'post',
			url:'/user/getUsersWithParticularEmail',
			withCredentials:true,
			data:{email}
		})
		.then((res)=>{
			if(res.data.status){
				setOptions(res.data.users)
			}
			console.log(res.data)
		})
		.catch(err=>{
			console.log(err)
		})
	}

	return (
		<Container className={styles.createRide}>
			<Card>
				<h1>Create Ride</h1>
			</Card>
			<Card2>
				<form className={styles.signinForm} onSubmit={submitHandler}>
					<TextField
						fullWidth
						className={styles.formField}
						variant="outlined"
						onChange={(e) =>
							setFields({ ...fields, from: e.target.value })
						}
						label="From"
						required
					/>
					<TextField
						fullWidth
						className={styles.formField}
						variant="outlined"
						onChange={(e) =>
							setFields({ ...fields, to: e.target.value })
						}
						label="To"
						required
					/>
					<Multiselect
						className={styles.formField}
						options={options} // Options to display in the dropdown
						// selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
						onSelect={(_,item)=>setFields({...fields,carPoolingParticipants:[...fields.carPoolingParticipants,item.name]})} // Function will trigger on select event
						onRemove={(_,item)=>setFields({...fields,carPoolingParticipants:fields.carPoolingParticipants.filter(Item=>Item!=item)})} // Function will trigger on remove event
						displayValue="name" // Property name to display in the dropdown options
						onSearch={(e=>fetchUserEmails(e))}
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
			</Card2>
			{status && <Redirect to='/'/>}
		</Container>
	);
}
