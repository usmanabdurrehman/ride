import React, { useState } from "react";
import "./InputSelect.css";
import AsyncSelect from "react-select/async";
import { TextField } from "@material-ui/core";
import axios from 'axios'

let colourOptions = [
	{ label: "red", value: "red" },
	{ label: "orange", value: "orange" },
];

const filterColors = (inputValue: string) => {
	return colourOptions.filter((i) =>
		i.label.toLowerCase().includes(inputValue.toLowerCase())
	);
};

const loadOptions = async (inputValue, callback) => {
	let apiKey = "AIzaSyB0y1H8Ke1-RwIppMZQZnH-fVXskUUVD74";
	axios({
		method: "get",
		url: 'https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=' + apiKey + '&input=' + inputValue,
		withCredentials: true,
	})
	.then((res)=>{
		let options = res.data
		console.log(options)
		callback(options)
	})
};

export default function InputSelect({
	onChange,
	seletedValue,
	options,
	...rest
}) {

	let handleInputChange = (newValue: string) => {
		const inputValue = newValue.replace(/\W/g, "");
		return inputValue;
	};

	return (
		<div className="selectWrapper">
			<AsyncSelect
				cacheOptions
				loadOptions={loadOptions}
				defaultOptions
				onInputChange={handleInputChange}
				onChange={onChange}
			/>
		</div>
	);
}
