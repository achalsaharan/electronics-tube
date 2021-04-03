import './App.css';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Home } from './Home';
import { VideoPage } from './VideoPage';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
	const [route, setRoute] = useState('videoPage');
	return (
		<div className="container mx-auto">
			<Header setRoute={setRoute} />

			<div className="grid grid-cols-4 mt-20">
				<div className="hidden md:block md:col-span-1 ">
					<Sidebar setRoute={setRoute} />
				</div>

				<div className="col-span-4 md:col-span-3">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/video" element={<VideoPage />} />
					</Routes>
					{/* {route === 'home' && <Home />}
					{route === 'videoPage' && <VideoPage />} */}
				</div>
			</div>
		</div>
	);
}

export default App;
