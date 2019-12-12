import React from "react";

import "./App.css";
import GlobeCanvas from "./components/GlobeCanvas";
import Intro from "./components/Intro";

function App() {
	return (
		<div className='App'>
			<div className='canvas_container'>
				<GlobeCanvas />
			</div>
			<div className='sidebar_container'>
				Sidebar
				<Intro />
				<div className='box'>Something Important2</div>
				<div className='box'>Something Important3</div>
				<div className='box'>Something Important5</div>
			</div>
			<div className='bottombar_container'>
				<div className='box'>Hello Friends</div>
			</div>
		</div>
	);
}

export default App;
