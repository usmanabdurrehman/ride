import React, { useState, useEffect } from "react";
import styles from "./RidePage.module.css";
import { Container, Card, Card2 } from "../../Components";

import Layout from "../../Layout/Layout";

import { useParams, Redirect } from "react-router-dom";

import moment from "moment";

import axios from "axios";

import Fab from "@material-ui/core/Fab";

import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

import Skeleton from "react-loading-skeleton";

import { useSelector } from "react-redux";

export default function RidePage() {
	let user = useSelector((state) => state.user);

	let { id } = useParams();
	let [ride, setRide] = useState(null);

	let [canJoin, setCanJoin] = useState(null);

	let [status, setStatus] = useState(false);

	let [canEndCarPool, setCanEndCarPool] = useState(null);

	useEffect(() => {
		axios({
			url: "/user/canEndCarPool",
			withCredentials: true,
			method: "post",
			data: { id },
		}).then((res) => {
			setCanEndCarPool(res.data.canEndCarPool);
			axios({
				method: "post",
				url: "/user/getRide",
				withCredentials: true,
				data: { id },
			}).then((res) => {
				if (res.data.status) {
					setRide(res.data.ride);
				}
			});
		});
	}, []);

	let addClickHandler = () => {
		axios({
			url: "/user/carPool",
			withCredentials: true,
			method: "post",
			data: { id: ride._id},
		}).then((res) => {
			setStatus(res.data.status);
		});
	};

	let removeClickHandler = () => {
		axios({
			url: "/user/removeCarPool",
			withCredentials: true,
			method: "post",
			data: { id: ride._id},
		}).then((res) => {
			setStatus(res.data.status);
		});
	};

	return (
		<Container className={styles.ride}>
			<Card>
				<h1>Ride Detail</h1>
				<p>Ride ID: {id}</p>
			</Card>
			{ride ? (
				<Card2>
					<h2>Route</h2>
					<p>From: {ride.from}</p>
					<p>To: {ride.to}</p>

					<div className={styles.seperator}></div>

					<h2>Time</h2>
					<p>
						Start:{" "}
						{ride.start
							? moment(ride.start).format(
									"DD MMMM, YYYY | HH:mm:ss"
							  )
							: ""}
					</p>
					<p>
						End:{" "}
						{ride.end
							? moment(ride.end).format(
									"DD MMMM, YYYY | HH:mm:ss"
							  )
							: ""}
					</p>

					<div className={styles.seperator}></div>

					<h2>CarPooling Participants</h2>
					{ride.carPoolingParticipants.map((part) => (
						<p>{part}</p>
					))}
				</Card2>
			) : (
				<Skeleton className={styles.skeleton} height={100} />
			)}
			{ride &&
				!ride.carPoolingParticipants.includes(user.email) &&
				ride.rider != user.email && (
					<Fab
						color="secondary"
						className={styles.fab}
						onClick={addClickHandler}
					>
						<CheckIcon />
					</Fab>
				)}
			{ride &&
				ride.carPoolingParticipants.includes(user.email) &&
				canEndCarPool && (
					<Fab
						color="secondary"
						className={styles.fab}
						onClick={removeClickHandler}
					>
						<ClearIcon />
					</Fab>
				)}
			{status && <Redirect to="/" />}
		</Container>
	);
}
