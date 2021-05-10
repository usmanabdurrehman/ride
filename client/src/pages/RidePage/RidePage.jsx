import React, { useState, useEffect } from "react";
import styles from "./RidePage.module.css";
import { Container, Card } from "../../Components";

import { Link, useParams } from "react-router-dom";

import moment from 'moment'

import axios from 'axios'

export default function RidePage() {
	let { id } = useParams();
	let [ride, setRide] = useState({
		from: "",
		to: "",
		start: "",
		end: "",
		carPoolingParticipants: [],
	});

	useEffect(() => {
		axios({
			method:'post',
			url: "/user/getRide",
			withCredentials: true,
			data: { id },
		}).then((res) => {
			if (res.data.status) {
				setRide(res.data.ride);
			}
		});
	}, []);
	console.log(ride.start && new Date(ride.start).getFullYear())
	return (
		<Container className={styles.ride}>
			<Card>
				<h1>Ride Detail</h1>
				<p>Ride ID: {id}</p>
			</Card>
			<div className={styles.rideInfo}>
				<h2>Route</h2>
				<p>From: {ride.from}</p>
				<p>To: {ride.to}</p>

				<div className={styles.seperator}></div>

				<h2>Time</h2>
				<p>Start: {ride.start ? moment(ride.start).format("DD MMMM, YYYY | HH:mm:ss") : ""}</p>
				<p>End: {ride.end ? moment(ride.end).format("DD MMMM, YYYY | HH:mm:ss") : ""}</p>

				<div className={styles.seperator}></div>

				<h2>CarPooling Participants</h2>
				{ride.carPoolingParticipants.map(part=><p>{part}</p>)}
			</div>
		</Container>
	);
}
