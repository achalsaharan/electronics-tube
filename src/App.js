import './App.css';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { VideoPage } from './pages/VideoPage';
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div className="container mx-auto">
            <Header />

            <div className="grid grid-cols-4 mt-20">
                <div className="hidden md:block md:col-span-1 ">
                    <Sidebar />
                </div>

                <div className="col-span-4 md:col-span-3">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/video/:videoId" element={<VideoPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
