import { useState } from "react";
import addIcon from "./assets/add.svg";
import editIcon from "./assets/edit.svg";
import deleteOutlineIcon from "./assets/delete-outline.svg";
import "./App.css";

const defaultCV = {
	name: "John Doe",
	email: "john.doe@gmail.com",
	phone: "+91 9962242844",
	address: "Bangalore, IN",
	education: [
		{
			id: crypto.randomUUID(),
			institute: "Indian Institute of Technology, Roorkee",
			degree: "B.Tech, Computer Science and Engineering",
			"start-date": "15/01/2024",
			"end-date": null,
			location: "Roorkee, IN",
		},
	],
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
			<EducationDetails data={data} setData={setData} />
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

function EducationDetails({ data, setData }) {
	const [showEducationForm, setShowEducationForm] = useState(false);

	return (
		<div className="education-details">
			<h2>Education</h2>
			{showEducationForm ? (
				<AddEducationForm setShowEducationForm={setShowEducationForm} />
			) : (
				<ViewEducation setShowEducationForm={setShowEducationForm} data={data} />
			)}
		</div>
	);
}

function ViewEducation({ data, setShowEducationForm }) {
	return (
		<>
			{data.education.map((educationItem) => {
				return <EducationItem key={educationItem.id} education={educationItem} />;
			})}
			<div className="addEducation">
				<button
					className="addEducation-btn"
					onClick={() => {
						setShowEducationForm(true);
					}}
				>
					<img src={addIcon} /> <span>Add Education</span>
				</button>
			</div>
		</>
	);
}

function EducationItem({ education }) {
	return (
		<div className="education-item">
			<div>
				<p>{education.institute}</p>
				<p>{education.degree}</p>
			</div>
			<div>
				<img src={editIcon} />
				<img src={deleteOutlineIcon} />
			</div>
		</div>
	);
}

function AddEducationForm({ setShowEducationForm }) {
	return (
		<>
			<form id="education-form">
				<InputField type="text" title="Institute" id="institute" placeholder="Enter school / university" />
				<InputField type="text" title="Degree" id="degree" placeholder="Enter Degree / Field of Study" />
				<div className="date">
					<InputField type="date" title="Start Date" id="start-date" />
					<InputField type="date" title="End Date" id="end-date" />
				</div>
				<InputField type="text" title="Location" id="location" placeholder="Enter Location" />
			</form>
			<div className="buttons">
				<button className="delete">Delete</button>
				<div className="cancel-save">
					<button className="cancel" onClick={() => setShowEducationForm(false)}>
						Cancel
					</button>
					<button form="education-form" className="save">
						Save
					</button>
				</div>
			</div>
		</>
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
