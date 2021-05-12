import React from "react";
import { Container } from "../Components";
import styles from "./Layout.module.css";

import Fab from "@material-ui/core/Fab";

import DriveEtaIcon from "@material-ui/icons/DriveEta";
import EditIcon from "@material-ui/icons/Edit";
import FaceIcon from "@material-ui/icons/Face";
import AddIcon from "@material-ui/icons/Add";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

export default function Layout({ children, page }) {
	let user = useSelector((state) => state.user);

	let fabMapper = (page) => {
		switch (page) {
			case "home":
				const fabMapper = [
					{
						iconType: "profile",
						link: `/profile/${user._id}`,
					},
					{
						iconType: "joinRide",
						link: "/joinRide",
					},
				];
				user.isMember &&
					fabMapper.push({
						iconType: "createRide",
						link: "/createRide",
					});
				return fabMapper.reverse();
				break;
			case "profile":
				return [
					{
						iconType: "edit",
						link: "/editProfile",
					},
				];
				break;
			default:
				return [
					{
						iconType: "edit",
						link: "/editProfile",
					},
				];
		}
	};

	let iconSelect = (iconType) => {
		switch (iconType) {
			case "edit":
				return <EditIcon />;
				break;
			case "profile":
				return <FaceIcon />;
				break;
			case "createRide":
				return <AddIcon />;
				break;
			case "joinRide":
				return <DriveEtaIcon />;
				break;
			default:
				return <DriveEtaIcon />;
				break;
		}
	};

	return (
		<div className={styles.layout}>
			<Container className={styles.container}>{children}</Container>
			{fabMapper(page).map(({ iconType, link }, idx) => (
				<Link to={link}>
					<Fab
						color="secondary"
						className={styles.fab}
						style={{ bottom: idx ? `${20 + 76 * idx}px` : "20px" }}
					>
						{iconSelect(iconType)}
					</Fab>
				</Link>
			))}
		</div>
	);
}
