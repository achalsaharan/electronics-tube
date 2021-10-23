import './App.css';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

import { Home } from './pages/Home';
import { LikedVideosPage } from './pages/LikedVideosPage';
import { WatchLaterPage } from './pages/WatchLaterPage';
import { PlayListPage } from './pages/PlayListPage';
import { VideoPage } from './pages/VideoPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';

import { useAuthentication } from './contexts/AuthenticationContext';

import { Routes, Route, Navigate } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchResults } from './pages/SearchResults';

function ProtectedRoute({ path, ...props }) {
    const {
        state: { userId },
    } = useAuthentication();

    return userId !== null ? (
        <Route path={path} {...props} />
    ) : (
        <Navigate to="/login" replace state={{ from: path }} />
    );
}

function App() {
    return (
        <div style={{ maxWidth: '1500px' }} className="mx-auto">
            <Header />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <div className="grid grid-cols-6">
                <div className="hidden md:block md:col-span-1 shadow-lg pt-20 min-h-screen">
                    <Sidebar />
                </div>

                <div className="col-span-6 md:col-span-5  mt-20">
                    <Routes>
                        <Route path="/" element={<Home />} />

                        <Route path="/video/:videoId" element={<VideoPage />} />

                        <Route path="login" element={<LoginPage />} />

                        <Route path="signup" element={<SignUpPage />} />

                        <Route
                            path="searchresults/:search"
                            element={<SearchResults />}
                        />

                        <ProtectedRoute
                            path="/likedVideos"
                            element={<LikedVideosPage />}
                        />

                        <ProtectedRoute
                            path="/watchLater"
                            element={<WatchLaterPage />}
                        />

                        <ProtectedRoute
                            path="/playlist/:playListName"
                            element={<PlayListPage />}
                        />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
