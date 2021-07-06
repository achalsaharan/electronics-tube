import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { API } from '../../constants';

const AuthenticationContext = createContext();

export function AuthenticationProvider({ children }) {
    const [state, setState] = useState({
        email: null,
        firstName: null,
        userId: null,
        token: null,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage?.getItem('user'));
        if (user) {
            setState(user);
            setupAuthHeaderForServiceCalls(user.token);
        }
        setupAuthExceptionHandler(logoutUser, navigate);
    }, []);

    function setupAuthHeaderForServiceCalls(token) {
        if (token) {
            return (axios.defaults.headers.common['Authorization'] = token);
        }
        delete axios.defaults.headers.common['Authorization'];
    }

    function setupAuthExceptionHandler(logoutUser, navigate) {
        const UNAUTHORIZED = 401;
        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error?.response?.status === UNAUTHORIZED) {
                    logoutUser();
                    navigate('login');
                }
                return Promise.reject(error);
            }
        );
    }

    // logs users in, sets states and handles error
    // returns boolean, based on success
    async function loginUserWithEmailAndPassword(email, password) {
        try {
            const res = await axios.post(`${API}/auth/login`, {
                email: email,
                password: password,
            });

            console.log(res.data);

            if (res.data.success === true) {
                setState({
                    email: res.data.user.email,
                    firstName: res.data.user.firstName,
                    userId: res.data.user._id,
                    token: res.data.token,
                });
                toast.success('Logged In');

                //setting user details in local storage

                localStorage?.setItem(
                    'user',
                    JSON.stringify({
                        userId: res.data.user._id,
                        email: res.data.user.email,
                        firstName: res.data.user.firstName,
                        token: res.data.token,
                    })
                );

                setupAuthHeaderForServiceCalls(res.data.token);

                return true;
            } else {
                toast.error(res.data.message);
                return false;
            }
        } catch (error) {
            console.log('error logging in', error);
            toast.error('Error Loggin In');
            return false;
        }
    }

    // registers user, DOES NOT set state or logs in
    // returns boolena, based on success
    async function registerUser(firstName, lastName, email, password) {
        try {
            const res = await axios.post(`${API}/users`, {
                firstName,
                lastName,
                email,
                password,
            });

            if (res.data.success === true) {
                return true;
            } else {
                toast.error(res.data.message);
                return false;
            }
        } catch (error) {
            console.log('error registering user', error);
            toast.error('Error In Registering User');
            return false;
        }
    }

    async function logoutUser() {
        setState({
            email: null,
            firstName: null,
            userId: null,
        });

        localStorage?.removeItem('user');
    }

    return (
        <AuthenticationContext.Provider
            value={{
                state,
                loginUserWithEmailAndPassword,
                registerUser,
                logoutUser,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
}

export function useAuthentication() {
    return useContext(AuthenticationContext);
}
