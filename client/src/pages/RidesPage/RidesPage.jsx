import React, { useEffect, useState } from "react";
import styles from "./RidesPage.module.css";
import { Container, Ride, Card } from "../../Components";

import axios from "axios";

export default function Rides() {
	let [rides, setRides] = useState([]);

	useEffect(() => {
		axios({
			url: "/user/getRidesOfUser",
			withCredentials: true,
		}).then((res) => {
			if (res.data.status) {
				setRides(res.data.rides);
			}
		});
	}, []);

	return (
		<Container className={styles.rides}>
			{rides.map((ride) => (
				<Ride ride={ride} />
			))}
		</Container>
	);
}
