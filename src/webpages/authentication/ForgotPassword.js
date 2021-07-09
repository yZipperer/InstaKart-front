import React, {useState, useEffect} from 'react';
import {auth} from '../../firebase';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';

const ForgotPassword = ({history}) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const config = {
            url: process.env.REACT_APP_LOGIN_URL,
            handleCodeInApp: true
        };

        await auth.sendPasswordResetEmail(email, config)
        .then(() => {
            setLoading(false);
            setEmail("");
            toast.success("Password reset email has been sent")
        })
        .catch((err) => {
            setLoading(false);
            toast.error(err.message);
        });
    };

    const forgotPasswordForm = () => {
        return(
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    value={email}
                    placeholder="email address"
                    onChange={event => setEmail(event.target.value)}
                    autoFocus
                />
                <button
                    type="submit"
                    className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-400 focus:outline-none my-1"
                    disabled={!email}
                >Send Confirmation</button>
            </form>
        )
    };

    return (
        <div style={{height: "94.1vh"}} className="bg-gray-200 flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center pb-24 justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    {loading ? <h1 className="mb-8 text-3xl text-center">Loading...</h1> : <h1 className="mb-8 text-3xl text-center">Forgot Password</h1>}
                    
                    {forgotPasswordForm()}

                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;