import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
	SigninPage,
	SignupPage,
	HomePage,
	RidesPage,
	RidePage,
	CreateRidePage,
	ProfilePage,
	EditProfilePage,
	JoinRidePage,
} from "./pages";

import { PrivateRoute, PublicRoute } from "./Routes";

function App() {
	return (
		<div className="App">
			<Router>
				<Route path="/signin" component={SigninPage} />
				<Route path="/signup" component={SignupPage} />

				<Route path="/" exact component={HomePage} />
				<Route path="/rides" component={RidesPage} />
				<Route path="/ride/:id" component={RidePage} />
				<Route path="/createRide" component={CreateRidePage} />
				<Route path="/profile/:id" component={ProfilePage} />
				<Route path="/editProfile" component={EditProfilePage} />

				<Route path="/joinRide" component={JoinRidePage} />
			</Router>
		</div>
	);
}

export default App;
