import React, { useState, useRef, useEffect } from "react";
import { Container, Search } from "../";
import { Redirect, Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./Navbar.css";

import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import StarIcon from "@material-ui/icons/Star";
import AddIcon from "@material-ui/icons/Add";

import { useSelector, useDispatch } from "react-redux";

export default function Navbar() {
	let [redirect, setRedirect] = useState(false);

	let user = useSelector((state) => state.user);
	let dispatch = useDispatch();

	let sidebarRef = useRef(null);

	let [sidebarOpen, setSidebarOpen] = useState(false);

	let clickHandler = () => {
		if (sidebarOpen) {
			sidebarRef.current.classList.add("sidebarOpen");
		} else {
			sidebarRef.current.classList.remove("sidebarOpen");
		}
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<div className="navbar">
			<Container className="navWrapper">
				<div className="logo">
					<h2>
						<Link to="/">Sellaway</Link>
					</h2>
				</div>
				<Search className="nav-search" />
				<div className="nav">
					<div>
						<Link to="/addItem">
							<AddIcon style={{color:'#008ecc'}}/> <p>Add An Item</p>
						</Link>
					</div>
					<div>
						<Link to="/favItems">
							<StarIcon style={{color:'#ffd700'}}/> <p>Favourite Items</p>
						</Link>
					</div>
					<div>
						<Link to="/profile">
							<img
								src={
									user?.profileImg
										? `http://localhost:7000/profileImages/${user.profileImg}`
										: "default.jpg"
								}
								className="profileImage"
							/>
							<p>Profile</p>
						</Link>
					</div>
					<div
						className="logout"
						onClick={(e) => {
							Cookies.remove("token");
							setRedirect(true);
						}}
					>
						<ExitToAppIcon />
					</div>
				</div>
				<IconButton className="hamburger" onClick={clickHandler}>
					{sidebarOpen ? (
						<MenuIcon className="menu-icon" />
					) : (
						<CloseIcon className="menu-icon" />
					)}
				</IconButton>
			</Container>
			{redirect ? <Redirect to="/signin" /> : null}
			<div className="sidebar" ref={sidebarRef}>
				<div>
					<div>
						<Link to="/addItem">
							<AddIcon style={{color:'#008ecc'}}/> <p>Add An Item</p>
						</Link>
					</div>
					<div>
						<Link to="/favItems">
							<StarIcon style={{color:'#ffd700'}}/> <p>Fav Items</p>
						</Link>
					</div>
					<div>
						<Link to="/profile">
							<img
								src={
									user?.profileImg
										? `http://localhost:7000/profileImages/${user.profileImg}`
										: "default.jpg"
								}
								className="profileImage"
							/>
							<p>Profile</p>
						</Link>
					</div>
					<div>
						<div
							className="logout"
							onClick={(e) => {
								Cookies.remove("token");
								dispatch({ type: "LOGOUT" });
								setRedirect(true);
							}}
						>
							<ExitToAppIcon />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
