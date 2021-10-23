import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import { btnPrimary } from '../../styles';

function LoadingModal() {
    return (
        <div className="z-10 absolute top-0 left-0 bg-red-100 h-full w-full bg-opacity-40 flex items-center justify-center">
            <div className="loader border-red-300"></div>
        </div>
    );
}

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const {
        loginUserWithEmailAndPassword,
        state: { userId },
    } = useAuthentication();

    useEffect(() => {
        if (userId) {
            navigate('/');
        }
    }, [userId]);

    async function login() {
        setLoading(true);
        try {
            const loggedIn = await loginUserWithEmailAndPassword(
                email,
                password
            );

            setLoading(false);
            if (loggedIn === true) {
                navigate('/');
                return;
            }
        } catch (error) {
            setLoading(false);
            console.log('error', error);
            toast.error('error loggin in');
        }
    }

    return (
        <div className="flex justify-center items-start h-full">
            <div className="flex flex-col mt-20 max-w p-4 w-96 max-w-2xl shadow-lg relative">
                <div>
                    <h1 className="text-center text-xl font-semibold">
                        LOGIN <i className="fas fa-sign-in-alt ml-4"></i>
                    </h1>
                </div>
                <input
                    className="focus:outline-none focus:ring-red-500 ring-2 ring-red-300 rounded px-1 py-1 my-2"
                    type="text"
                    placeholder="enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="focus:outline-none focus:ring-red-500 ring-2 ring-red-300 rounded px-1 py-1 my-2"
                    type="password"
                    placeholder="enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className={btnPrimary} onClick={login}>
                    LOGIN
                </button>
                {loading && <LoadingModal />}
            </div>
        </div>
    );
}
