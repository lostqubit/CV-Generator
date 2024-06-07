import { useState } from "react";
import "./App.css";

const defaultCV = {
	name: "John Doe",
	email: "john.doe@gmail.com",
	phone: "+91 9962242844",
	address: "Bangalore, IN",
};

function App() {
	const [data, setData] = useState(defaultCV);

	return (
		<>
			<InfoForm data={data} setData={setData} />
			<Preview data={data} />
		</>
	);
}

function InfoForm({ data, setData }) {
	return (
		<div className="information">
			<Header />
			<PersonalDetails data={data} setData={setData} />
		</div>
	);
}

function Header() {
	return (
		<>
			<h1 style={{ textAlign: "center" }}>CV Generator</h1>
			<p>Create your CV by filling out the fields below! Your CV will be dynamically updated in the preview.</p>
		</>
	);
}

function PersonalDetails({ data, setData }) {
	return (
		<div className="personal-details">
			<h2>Personal Details</h2>
			<InputField
				type="text"
				title="Full Name"
				id="name"
				placeholder="John Doe"
				maxLength="15"
				data={data}
				setData={setData}
			/>
			<InputField
				type="email"
				title="Email"
				id="email"
				placeholder="john.doe@gmail.com"
				maxLength="30"
				data={data}
				setData={setData}
			/>
			<InputField
				type="text"
				title="Phone number"
				id="phone"
				placeholder="+91 9851254786"
				maxLength="14"
				data={data}
				setData={setData}
			/>
			<InputField
				type="text"
				title="Address"
				id="address"
				placeholder="Bangalore, IN"
				maxLength="20"
				data={data}
				setData={setData}
			/>
		</div>
	);
}

function InputField({ type, title, id, placeholder, maxLength, data, setData }) {
	const onChange = (event) => {
		setData({ ...data, [`${id}`]: `${event.target.value ? event.target.value : defaultCV[id]}` });
	};

	return (
		<div className="input-field">
			<label htmlFor={id}>{title}</label>
			<input onChange={onChange} type={type} placeholder={placeholder} id={id} maxLength={maxLength} />
		</div>
	);
}

function Preview({ data }) {
	return (
		<div className="preview">
			<div className="cv">
				{data.name}
				{data.email}
				{data.phone}
				{data.address}
			</div>
		</div>
	);
}

export default App;
