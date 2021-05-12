import React, { useState, useEffect } from "react";
import styles from "./ProfilePage.module.css";

import Layout from "../../Layout/Layout";
import { Card, Card2 } from "../../Components";

import axios from "axios";

import { useParams } from "react-router-dom";

import Skeleton from "react-loading-skeleton";

export default function ProfilePage() {
	const [user, setUser] = useState(null);

	let { id } = useParams();

	useEffect(() => {
		axios({
			url: "/user/getUser",
			method: "post",
			data: { id },
			withCredentials: true,
		}).then((res) => {
			if (res.data.status) {
				setUser(res.data.user);
			}
		});
	}, []);

	return (
		<Layout iconType="edit">
			<Card>
				<h1>Profile</h1>
			</Card>
			<div className={styles.profileInfo}>
				{user ? (
					<Card2>
						<div className={styles.imageWrapper}>
							<img
								src={
									user.image
										? `http://localhost:7000/profileImages/${user.image}`
										: "../default.jpg"
								}
							/>
						</div>
						{(user.isMember ||
							user.isVerified ||
							user.isLongTermUser) && (
							<div className={styles.badges}>
								{user.isMember && (
									<img
										src="../badges/isMember.png"
										className={styles.badge}
									/>
								)}
								{user.isVerified && (
									<img
										src="../badges/isVerified.png"
										className={styles.badge}
									/>
								)}
								{user.isLongTermUser && (
									<img
										src="../badges/isLongTermUser.png"
										className={styles.badge}
									/>
								)}
							</div>
						)}
						<h2>{user.name}</h2>
						<p>{user.address}</p>
						<p>{user.email}</p>
						<p>
							{user.bio || (
								<i>You have not entered any bio yet</i>
							)}
						</p>
					</Card2>
				) : (
					<Skeleton className={styles.skeleton} height={100} />
				)}
			</div>
		</Layout>
	);
}
