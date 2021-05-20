import { useState } from 'react';
import { SidebarModal } from './SidebarModal';

import { useNavigate } from 'react-router-dom';
import { useAuthentication } from '../contexts/AuthenticationContext';

export function Header() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const {
        state: { userId },
        logoutUser,
    } = useAuthentication();
    const navigate = useNavigate();
    return (
        <>
            <div className="bg-red-100 fixed w-screen top-0 left-0 z-0">
                <div
                    className="mx-auto py-4 px-2 text-red-600 flex items-center"
                    style={{ maxWidth: '1500px' }}
                >
                    <button
                        className="mr-4 md:hidden hover:text-red-800"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <i className="fas fa-bars fa-lg "></i>
                    </button>
                    <h1 className="text-lg font-bold">Video Library</h1>
                    <div className="flex space-x-4 ml-auto">
                        {userId ? (
                            <button
                                className="hover:text-red-800"
                                onClick={() => logoutUser()}
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <button
                                    className="hover:text-red-800"
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </button>
                                <button
                                    className="hover:text-red-800"
                                    onClick={() => navigate('/signup')}
                                >
                                    Register
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {sidebarOpen && <SidebarModal setSidebarOpen={setSidebarOpen} />}
        </>
    );
}
