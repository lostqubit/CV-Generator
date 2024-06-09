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
			"start-date": "2024-01-15",
			"end-date": "",
			location: "Roorkee, IN",
		},
	],
	experience: [
		{
			id: crypto.randomUUID(),
			title: "Software Development Engineer",
			company: "Amazon",
			"start-date": "",
			"end-date": "",
			location: "Bangalore, IN",
			description: "test-1",
		},
		{
			id: crypto.randomUUID(),
			title: "DevOps Engineer",
			company: "Zomato",
			"start-date": "",
			"end-date": "",
			location: "Mumbai, IN",
			description: "test-2",
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
			<WorkDetails data={data} setData={setData} />
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
	const [showEducationForm, setShowEducationForm] = useState(0);

	return (
		<div className="education-details">
			<h2>Education</h2>
			{showEducationForm ? (
				<AddEducationForm
					id={showEducationForm}
					setShowEducationForm={setShowEducationForm}
					data={data}
					setData={setData}
				/>
			) : (
				<ViewEducation setShowEducationForm={setShowEducationForm} data={data} setData={setData} />
			)}
		</div>
	);
}

function ViewEducation({ data, setData, setShowEducationForm }) {
	return (
		<>
			{data.education.map((educationItem) => {
				return (
					<EducationItem
						id={educationItem.id}
						key={educationItem.id}
						data={data}
						setData={setData}
						setShowEducationForm={setShowEducationForm}
						education={educationItem}
					/>
				);
			})}
			<div className="addEducation">
				<button
					className="addEducation-btn"
					onClick={() => {
						setShowEducationForm(1);
					}}
				>
					<img src={addIcon} /> <span>Add Education</span>
				</button>
			</div>
		</>
	);
}

function EducationItem({ id, data, setData, setShowEducationForm, education }) {
	return (
		<div className="education-item">
			<div>
				<p>{education.institute}</p>
				<p>{education.degree}</p>
			</div>
			<div>
				<img src={editIcon} onClick={() => setShowEducationForm(id)} />
				<img
					src={deleteOutlineIcon}
					onClick={() =>
						setData({
							...data,
							education: data.education.filter((educationItem) => educationItem.id !== id),
						})
					}
				/>
			</div>
		</div>
	);
}

function AddEducationForm({ id, setShowEducationForm, data, setData }) {
	const formValue = {
		institute: "",
		degree: "",
		"start-date": "",
		"end-date": "",
		location: "",
	};

	if (id !== 1) {
		const dataItem = data.education.filter((educationItem) => educationItem.id === id)[0];
		formValue.institute = dataItem.institute;
		formValue.degree = dataItem.degree;
		formValue["start-date"] = dataItem["start-date"];
		formValue["end-date"] = dataItem["end-date"];
		formValue.location = dataItem.location;
	}

	return (
		<>
			<form
				id="education-form"
				onSubmit={(event) => {
					event.preventDefault();
					const formdata = new FormData(event.target);
					if (id === 1) {
						const newEducationItem = {
							id: crypto.randomUUID(),
							institute: formdata.get("institute"),
							degree: formdata.get("degree"),
							"start-date": formdata.get("start-date"),
							"end-date": formdata.get("end-date"),
							location: formdata.get("location"),
						};
						const newData = { ...data };
						newData.education.push(newEducationItem);
						setData(newData);
					} else {
						const editedData = data.education.map((educationItem) => {
							return educationItem.id === id
								? {
										id,
										institute: formdata.get("institute"),
										degree: formdata.get("degree"),
										"start-date": formdata.get("start-date"),
										"end-date": formdata.get("end-date"),
										location: formdata.get("location"),
								  }
								: educationItem;
						});
						const newData = { ...data };
						newData.education = editedData;
						setData(newData);
					}
					setShowEducationForm(0);
					event.target.reset();
				}}
			>
				<InputField
					type="text"
					startingValue={formValue.institute}
					title="Institute"
					id="institute"
					placeholder="Enter school / university"
				/>
				<InputField
					type="text"
					startingValue={formValue.degree}
					title="Degree"
					id="degree"
					placeholder="Enter Degree / Field of Study"
				/>
				<div className="date">
					<InputField
						type="date"
						startingValue={formValue["start-date"]}
						title="Start Date"
						id="start-date"
					/>
					<InputField
						required={false}
						type="date"
						startingValue={formValue["end-date"]}
						title="End Date"
						id="end-date"
					/>
				</div>
				<InputField
					required={false}
					type="text"
					startingValue={formValue.location}
					title="Location"
					id="location"
					placeholder="Enter Location"
				/>
			</form>
			<div className="buttons">
				<button
					className="delete"
					onClick={() => {
						if (id !== 1)
							setData({
								...data,
								education: data.education.filter((educationItem) => educationItem.id !== id),
							});
						setShowEducationForm(0);
					}}
				>
					Delete
				</button>
				<div className="cancel-save">
					<button className="cancel" onClick={() => setShowEducationForm(0)}>
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

function WorkDetails({ data, setData }) {
	const [showWorkExForm, setShowWorkExForm] = useState(0);

	return (
		<div className="work-details">
			<h2>Work Experience</h2>
			{showWorkExForm ? (
				<AddWorkExForm
					id={showWorkExForm}
					setShowWorkExForm={setShowWorkExForm}
					data={data}
					setData={setData}
				/>
			) : (
				<ViewWorkEx setShowWorkExForm={setShowWorkExForm} data={data} setData={setData} />
			)}
		</div>
	);
}

function ViewWorkEx({ data, setData, setShowWorkExForm }) {
	return (
		<>
			{data.experience.map((experienceItem) => {
				return (
					<WorkExItem
						id={experienceItem.id}
						key={experienceItem.id}
						data={data}
						setData={setData}
						setShowWorkExForm={setShowWorkExForm}
						experience={experienceItem}
					/>
				);
			})}
			<div className="addExperience">
				<button
					className="addExperience-btn"
					onClick={() => {
						setShowWorkExForm(1);
					}}
				>
					<img src={addIcon} /> <span>Add Experience</span>
				</button>
			</div>
		</>
	);
}

function WorkExItem({ id, data, setData, setShowWorkExForm, experience }) {
	return (
		<div className="experience-item">
			<div>
				<p>{experience.title}</p>
				<p>{experience.company}</p>
			</div>
			<div>
				<img src={editIcon} onClick={() => setShowWorkExForm(id)} />
				<img
					src={deleteOutlineIcon}
					onClick={() =>
						setData({
							...data,
							experience: data.experience.filter((experienceItem) => experienceItem.id !== id),
						})
					}
				/>
			</div>
		</div>
	);
}

function AddWorkExForm({ id, setShowWorkExForm, data, setData }) {
	const formValue = {
		title: "",
		company: "",
		"start-date": "",
		"end-date": "",
		location: "",
		description: "",
	};

	if (id !== 1) {
		const dataItem = data.experience.filter((experienceItem) => experienceItem.id === id)[0];
		formValue.title = dataItem.title;
		formValue.company = dataItem.company;
		formValue["start-date"] = dataItem["start-date"];
		formValue["end-date"] = dataItem["end-date"];
		formValue.location = dataItem.location;
		formValue.description = dataItem.description;
	}

	return (
		<>
			<form
				id="experience-form"
				onSubmit={(event) => {
					event.preventDefault();
					const formdata = new FormData(event.target);
					if (id === 1) {
						const newExperienceItem = {
							id: crypto.randomUUID(),
							title: formdata.get("title"),
							company: formdata.get("company"),
							"start-date": formdata.get("start-date"),
							"end-date": formdata.get("end-date"),
							location: formdata.get("location"),
							description: formdata.get("description"),
						};
						const newData = { ...data };
						newData.experience.push(newExperienceItem);
						setData(newData);
					} else {
						const editedData = data.experience.map((experienceItem) => {
							return experienceItem.id === id
								? {
										id,
										title: formdata.get("title"),
										company: formdata.get("company"),
										"start-date": formdata.get("start-date"),
										"end-date": formdata.get("end-date"),
										location: formdata.get("location"),
										description: formdata.get("description"),
								  }
								: experienceItem;
						});
						const newData = { ...data };
						newData.experience = editedData;
						setData(newData);
					}
					setShowWorkExForm(0);
					event.target.reset();
				}}
			>
				<InputField
					type="text"
					startingValue={formValue.title}
					title="Position Title"
					id="title"
					placeholder="Enter role / position"
				/>
				<InputField
					type="text"
					startingValue={formValue.company}
					title="Company"
					id="company"
					placeholder="Enter Company / Organization"
				/>
				<div className="date">
					<InputField
						type="date"
						startingValue={formValue["start-date"]}
						title="Start Date"
						id="start-date"
					/>
					<InputField
						required={false}
						type="date"
						startingValue={formValue["end-date"]}
						title="End Date"
						id="end-date"
					/>
				</div>
				<InputField
					required={false}
					type="text"
					startingValue={formValue.location}
					title="Location"
					id="location"
					placeholder="Enter Location"
				/>
				<InputField
					required={false}
					type="textarea"
					startingValue={formValue.description}
					title="Description"
					id="description"
					placeholder="Enter Description"
					maxLength="150"
				/>
			</form>
			<div className="buttons">
				<button
					className="delete"
					onClick={() => {
						if (id !== 1)
							setData({
								...data,
								experience: data.experience.filter((experienceItem) => experienceItem.id !== id),
							});
						setShowWorkExForm(0);
					}}
				>
					Delete
				</button>
				<div className="cancel-save">
					<button className="cancel" onClick={() => setShowWorkExForm(0)}>
						Cancel
					</button>
					<button form="experience-form" className="save">
						Save
					</button>
				</div>
			</div>
		</>
	);
}

function InputField({ required = true, startingValue = "", type, title, id, placeholder, maxLength, data, setData }) {
	const [value, setValue] = useState(startingValue);
	if (setData) {
		return (
			<div className="input-field">
				<label htmlFor={id}>{title}</label>
				<input
					required={required}
					onChange={(event) => {
						setValue(event.target.value);
						setData({ ...data, [`${id}`]: `${event.target.value ? event.target.value : defaultCV[id]}` });
					}}
					type={type}
					placeholder={placeholder}
					id={id}
					name={id}
					maxLength={maxLength}
					value={value}
				/>
			</div>
		);
	} else {
		return (
			<div className="input-field">
				<label htmlFor={id}>{title}</label>
				{type === "textarea" ? (
					<textarea
						onChange={(event) => setValue(event.target.value)}
						placeholder={placeholder}
						id={id}
						name={id}
						maxLength={maxLength}
						value={value}
					/>
				) : (
					<input
						required={required}
						onChange={(event) => setValue(event.target.value)}
						type={type}
						placeholder={placeholder}
						id={id}
						name={id}
						maxLength={maxLength}
						value={value}
					/>
				)}
			</div>
		);
	}
}

function Preview({ data }) {
	return (
		<div className="preview">
			<div className="cv">
				{data.name}
				{data.email}
				{data.phone}
				{data.address}
				{data.education.map((educationItem) => {
					return <div key={educationItem.id}>{educationItem.institute}</div>;
				})}
				{data.experience.map((experienceItem) => {
					return <div key={experienceItem.id}>{experienceItem.title}</div>;
				})}
			</div>
		</div>
	);
}

export default App;
