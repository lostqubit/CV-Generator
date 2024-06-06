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
			<h1 style={{ textAlign: "center" }}>CV Generator</h1>
			<p>Create your CV by filling out the fields below! Your CV will be dynamically updated in the preview.</p>
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
