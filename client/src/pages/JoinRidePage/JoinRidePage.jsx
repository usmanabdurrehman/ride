import React, { useEffect, useState } from "react";
import styles from "./JoinRidePage.module.css";
import { Container, Ride, Card, Card2 } from "../../Components";

import axios from "axios";

import Skeleton from "react-loading-skeleton";

export default function JoinRidePage() {
	let [rides, setRides] = useState(null);
	let [canCarPool, setCanCarPool] = useState(null);

	useEffect(() => {
		axios({
			url: "/user/canCarPool",
			withCredentials: true,
		}).then((res) => {
			if (res.data?.canCarPool) {
				setCanCarPool(true);
				axios({
					url: "/user/getLatestRides",
					withCredentials: true,
				}).then((res) => {
					if (res.data.status) {
						setRides(res.data.rides);
					}
				});
			} else {
				setCanCarPool(false);
			}
		});
	}, []);

	return (
		<Container>
			<Card>
				<h2>Join a Ride</h2>
			</Card>
			<div className={styles.joinARide}>
				{canCarPool == true ? (
					rides ? (
						<div className={styles.rides}>
							{rides.map((ride) => (
								<Ride ride={ride} />
							))}
						</div>
					) : (
						<Skeleton className={styles.skeleton} height={100} />
					)
				) : canCarPool == false ? (
					<p>
						Sorry, you are not allowed to carpool as per company
						rules
					</p>
				) : null}
			</div>
		</Container>
	);
}
