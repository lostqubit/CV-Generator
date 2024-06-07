import "./App.css";

function App() {
	return (
		<>
			<InfoForm />
			<Preview />
		</>
	);
}

function InfoForm() {
	return (
		<div className="information">
			<Header />
			<PersonalDetails />
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

function PersonalDetails() {
	return (
		<div className="personal-details">
			<h2>Personal Details</h2>
			<InputField type="text" title="Full Name" id="name" placeholder="John Doe" maxLength="15" />
			<InputField type="email" title="Email" id="email" placeholder="johndoe@gmail.com" maxLength="30" />
			<InputField type="text" title="Phone number" id="phone" placeholder="+91 9851254786" maxLength="14" />
			<InputField type="text" title="Address" id="address" placeholder="Bangalore, IN" maxLength="20" />
		</div>
	);
}

function InputField({ type, title, id, placeholder, maxLength }) {
	return (
		<div className="input-field">
			<label htmlFor={id}>{title}</label>
			<input type={type} placeholder={placeholder} id={id} maxLength={maxLength} />
		</div>
	);
}

function Preview() {
	return (
		<div className="preview">
			<div className="cv"></div>
		</div>
	);
}

export default App;
