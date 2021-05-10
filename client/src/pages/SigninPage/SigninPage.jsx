import React, { useState } from "react";
import styles from "./SigninPage.module.css";
import { TextField, Button } from "@material-ui/core";
import {Container} from '../../Components'
import axios from 'axios'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import {useDispatch} from 'react-redux'

export default function Signin() {

	let [fields,setFields] = useState({
		email:'',
		password:''
	})

	let [auth,setAuth] = useState(false)

	let dispatch = useDispatch()

	let submitHandler = e => {
		e.preventDefault()
		axios({
			method:'post',
			url:'/signin',
			data:fields
		})
		.then(res=>{
			if(res.data.auth){
				console.log('yay')
				Cookies.set('token',res.data.token,{ expires: 7 })
				dispatch({type:'SET_USER',payload:res.data.user})
				setAuth(true)
			}else{
				console.log('nay')
			}
		})
	}

	return (
		<Container className={styles.signin}>
			<form className={styles.signinForm} onSubmit={submitHandler}>
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
				<Button fullWidth className={styles.formButton} type="submit" color="primary" variant="contained">
					Sign In
				</Button>
			</form>
			{auth && <Redirect to="/home"/>}
		</Container>
	);
}
