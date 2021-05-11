import React from "react";
import { Container } from "../Components";
import styles from "./Layout.module.css";

import Fab from "@material-ui/core/Fab";

import DriveEtaIcon from "@material-ui/icons/DriveEta";
import EditIcon from '@material-ui/icons/Edit';
import FaceIcon from '@material-ui/icons/Face';

import {Link} from 'react-router-dom'

import {useSelector} from 'react-redux'

export default function Layout({ children, iconType, home }) {

	let user = useSelector(state=>state.user)

	let iconSelect = (iconType) => {
		switch(iconType){
			case "edit":
				return 	<EditIcon/>
				break
			default:
				return <DriveEtaIcon />
				break
		}
	}

	let linkSelect = (iconType) => {
		switch(iconType){
			case "edit":
				return `/editProfile`
				break
			default:
				return user.isMember ? "/createRide" : "/joinRide"
				break
		}
	}

	return (
		<div className={styles.layout}>
			<Container className={styles.container}>{children}</Container>
			{home && <Link to={`/profile/${user._id}`}>
				<Fab color="secondary" className={styles.fabHome}>
					<FaceIcon/>
				</Fab>
			</Link>}
			<Link to={linkSelect(iconType)}>
				<Fab color="secondary" className={styles.fab}>
					{iconSelect(iconType)}
				</Fab>
			</Link>
		</div>
	);
}
