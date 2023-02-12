import logo from './logo.png';
import React, { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter, Link, Route, Routes, useLocation} from "react-router-dom";



function Home() {
	return (
		<header className="App-header">
            <h2>Welcome to my Personal Website!</h2>

            <p>My name is [Your Name], and I am a software engineer with [X] years of experience in the industry. I am passionate about using technology to solve complex problems and improve the lives of people.</p>

            <p>With a strong foundation in computer science, I have a track record of delivering high-quality software solutions on time and within budget. I have a versatile skill set that includes [list your technical skills]. I am constantly striving to learn and improve, staying up to date with the latest developments in the field.</p>

            <p>On this website, you will find information about my background, education, experience, and projects. You can also check out my blog, where I write about my experiences and share my thoughts on various topics in the tech industry.</p>

            <p>Feel free to reach out to me through the contact form if you have any questions or would like to connect. I am always open to discussing new opportunities and collaborations.</p>

            <p>Thank you for visiting my website. I hope you find the information useful and I look forward to connecting with you soon!</p>
		</header>
	);
}

function Experience() {
	return (
		<div className="App-header">
			<h1>Experience</h1>
			<p>
				I have worked as a software engineer for X years, during which time I have gained expertise in developing web applications using ReactJS and NodeJS.
			</p>
			<p>
				I have also worked on several projects that involved integrating with third-party APIs and developing user-friendly interfaces.
			</p>
		</div>
	);
}

function Skills() {
	return (
		<div className="App-header">
			<h1>Skills</h1>
			<ul>
				<li>ReactJS</li>
				<li>NodeJS</li>
				<li>JavaScript</li>
				<li>HTML/CSS</li>
				<li>API integration</li>
			</ul>
		</div>
	);
}

function Projects() {
	return (
		<div className="App-header">
			<h1>Projects</h1>
			<ul>
				<li>
					<h3>Project 1</h3>
					<p>
						A web application that allows users to X, built using ReactJS and
						NodeJS.
					</p>
				</li>
				<li>
					<h3>Project 2</h3>
					<p>
						A mobile application that allows users to Y, built using React Native.
					</p>
				</li>
			</ul>
		</div>
	);
}

function Contact() {
	return (
		<div className="App-header">
			<h1>Contact</h1>
			<p>Feel free to contact me via email at example@email.com</p>
			<p>You can also find me on LinkedIn at linkedin.com/in/example</p>
		</div>
	);
}

function NavBar() {
	const location = useLocation(); // once ready it returns the 'window.location' object
	const [url, setUrl] = useState(null);
	useEffect(() => {
		setUrl(location.pathname);
	}, [location]);
	return (
		<ul className="navBar">
			<li>
                <Link to="/" className="websiteTitle"><img src={logo} /><>nathanlutz.dev</></Link>
			</li>
			<li>
				<Link to="/" className={"underline" + (url === "/" ?" active" : "")}>home</Link>
			</li>
			<li>
				<Link to="/experience" className={"underline" + (url === "/experience" ?" active" : "")}>experience</Link>
			</li>
			<li>
				<Link to="/skills" className={"underline" + (url === "/skills" ?" active" : "")}>skills</Link>
			</li>
			<li>
				<Link to="/projects" className={"underline" + (url === "/projects" ?" active" : "")}>projects</Link>
			</li>
			<li>
				<Link to="/contact" className={"underline" + (url === "/contact" ?" active" : "")}>contact</Link>
			</li>
		</ul>
	);
}

function App() {
	return (
		<BrowserRouter  className="App">
			<NavBar/>
			<Routes>
				<Route  path="/" element={<Home/>} />
				<Route  path="/experience" element={<Experience/>} />
				<Route  path="/skills" element={<Skills/>} />
				<Route  path="/projects" element={<Projects/>} />
				<Route  path="/contact" element={<Contact/>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
