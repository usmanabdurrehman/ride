import React from "react";
import { Container } from "../Components";
import styles from "./Layout.module.css";

import Fab from "@material-ui/core/Fab";
import DriveEtaIcon from "@material-ui/icons/DriveEta";

import {Link} from 'react-router-dom'

export default function Layout({ children }) {
	return (
		<div className={styles.layout}>
			<Container className={styles.container}>{children}</Container>
			<Link to="/createRide">
				<Fab color="secondary" aria-label="edit" className={styles.fab}>
					<DriveEtaIcon />
				</Fab>
			</Link>
		</div>
	);
}
