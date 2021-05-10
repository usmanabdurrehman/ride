import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { SigninPage, SignupPage, HomePage, RidesPage, RidePage, CreateRidePage } from "./pages";

function App() {
	return (
		<div className="App">
			<Router>
				<Route path="/home" exact component={HomePage} />
				<Route path="/signin" component={SigninPage} />
				<Route path="/signup" component={SignupPage} />
				<Route path="/rides" component={RidesPage} />
				<Route path="/ride/:id" component={RidePage} />
				<Route path="/createRide" component={CreateRidePage}/>
			</Router>
		</div>
	);
}

export default App;
