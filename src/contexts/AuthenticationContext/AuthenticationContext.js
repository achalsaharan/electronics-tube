import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { API } from '../../constants';

const AuthenticationContext = createContext();

export function AuthenticationProvider({ children }) {
    const [state, setState] = useState({
        email: null,
        firstName: null,
        userId: null,
    });

    // logs users in, sets states and handles error
    // returns boolean, based on success
    async function loginUserWithEmailAndPassword(email, password) {
        try {
            const res = await axios.post(`${API}/auth/login`, {
                email: email,
                password: password,
            });

            if (res.data.success === true) {
                setState({
                    email: res.data.user.email,
                    firstName: res.data.user.firstName,
                    userId: res.data.user._id,
                });
                toast.success('Logged In');

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
