import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import { btnPrimary } from '../../styles';

export function SignUpPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { registerUser, loginUserWithEmailAndPassword } = useAuthentication();

    async function registerAndLogin() {
        try {
            const isRegistered = await registerUser(
                firstName,
                lastName,
                email,
                password
            );

            if (!isRegistered) {
                return;
            }

            const isLoggedIn = await loginUserWithEmailAndPassword(
                email,
                password
            );

            if (isLoggedIn) {
                navigate('/');
                return;
            }
        } catch (error) {
            console.log('error occoured', error);
            toast.error('error registering user');
        }
    }

    return (
        <div className="flex justify-center items-start h-full">
            <div className="flex flex-col mt-20 p-4 w-96 shadow-lg">
                <div>
                    <h1 className="text-center text-xl font-semibold">
                        SIGN UP <i class="fas fa-user-plus ml-4"></i>
                    </h1>
                </div>
                <input
                    className="focus:outline-none focus:ring-red-500 ring-2 ring-red-300 rounded px-1 py-1 my-2"
                    type="text"
                    placeholder="First Name*"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <input
                    className="focus:outline-none focus:ring-red-500 ring-2 ring-red-300 rounded px-1 py-1 my-2"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <input
                    className="focus:outline-none focus:ring-red-500 ring-2 ring-red-300 rounded px-1 py-1 my-2"
                    type="text"
                    placeholder="Email Id*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="focus:outline-none focus:ring-red-500 ring-2 ring-red-300 rounded px-1 py-1 my-2"
                    type="password"
                    placeholder="Password*"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className={btnPrimary} onClick={registerAndLogin}>
                    SIGN UP
                </button>
            </div>
        </div>
    );
}
