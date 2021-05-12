import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import { Container, Ride, Card } from "../../Components";

import Layout from '../../Layout/Layout'

import axios from "axios";

import { useSelector } from "react-redux";

import Skeleton from "react-loading-skeleton";

import Fab from "@material-ui/core/Fab";
import DriveEtaIcon from "@material-ui/icons/DriveEta";

export default function Home() {
	let user = useSelector((state) => state.user);
	let [isLoading, setIsLoading] = useState(false);

	let [rides, setRides] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		axios({
			url: "/user/getRidesOfUser",
			withCredentials: true,
		}).then((res) => {
			setIsLoading(false);
			if (res.data.status) {
				setRides(res.data.rides)
			}
		});
	}, []);

	return (
		<Layout page="home">
			<Card>
				<h1>Welcome {user.name}</h1>
				<div className={styles.badges}>
					{user.isMember && (
						<img
							src="badges/isMember.png"
							className={styles.badge}
						/>
					)}
					{user.isVerified && (
						<img
							src="badges/isVerified.png"
							className={styles.badge}
						/>
					)}
					{user.isLongTermUser && (
						<img
							src="badges/isLongTermUser.png"
							className={styles.badge}
						/>
					)}
				</div>
				{user.isCarPoolingRightNow && (
					<p>You are carpooling right now</p>
				)}
			</Card>
			{isLoading ? (
				<Skeleton className={styles.skeleton} height={100} />
			) : (
				<div>
					<h2>Your Previous Rides</h2>
					<div className={styles.rides}>
						{rides ? (
							rides?.length ? (
								rides.map((ride) => <Ride ride={ride} />)
							) : (
								<p>You havent booked any rides yet</p>
							)
						) : null}
					</div>
				</div>
			)}
		</Layout>
	);
}
