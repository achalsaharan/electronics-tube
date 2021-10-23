import { useState } from 'react';
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

export function SignUpPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { registerUser, loginUserWithEmailAndPassword } = useAuthentication();

    const [firstNameError, setFirstNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [loading, setLoading] = useState(false);

    function validateFirstName(firstName) {
        if (firstName.length === 0) {
            return false;
        } else {
            return true;
        }
    }

    function validateEmail(email) {
        if (
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                email
            )
        ) {
            return true;
        } else {
            return false;
        }
    }

    function validatePassword(password) {
        if (password.length >= 6) {
            return true;
        } else {
            return false;
        }
    }

    async function registerAndLogin() {
        setLoading(true);

        const isFirstNameValid = validateFirstName(firstName);
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        if (!isEmailValid || !isPasswordValid || !isFirstNameValid) {
            setFirstNameError(!isFirstNameValid);
            setEmailError(!isEmailValid);
            setPasswordError(!isPasswordValid);
            setLoading(false);
            return;
        }

        setFirstNameError(false);
        setEmailError(false);
        setPasswordError(false);
        try {
            const newUser = await registerUser(
                firstName,
                lastName,
                email,
                password
            );

            setLoading(false);

            if (!newUser) {
                toast.error('error registering user');
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
            setLoading(false);
            console.log('error occoured', error);
            toast.error('error registering user');
        }
    }

    return (
        <div className="flex justify-center items-start h-full">
            <div className="flex flex-col mt-20 p-4 w-96 shadow-lg relative">
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
                {firstNameError ? (
                    <div className="form-field-validation-error">
                        <i class="fas fa-info-circle mr-2"></i>
                        <span>First name is required</span>
                    </div>
                ) : null}

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
                {emailError ? (
                    <div className="">
                        <i class="fas fa-info-circle mr-2"></i>
                        <span>Enter a valid email id</span>
                    </div>
                ) : null}

                <input
                    className="focus:outline-none focus:ring-red-500 ring-2 ring-red-300 rounded px-1 py-1 my-2"
                    type="password"
                    placeholder="Password*"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError ? (
                    <div className="form-field-validation-error">
                        <i class="fas fa-info-circle mr-2"></i>
                        <span>Password must be 6 characters or longer</span>
                    </div>
                ) : null}
                <button className={btnPrimary} onClick={registerAndLogin}>
                    SIGN UP
                </button>
                {loading && <LoadingModal />}
            </div>
        </div>
    );
}
