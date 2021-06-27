import React, {useState} from 'react';
import {auth} from '../../firebase';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [email, setEmail] = useState("");

    const handleSubmit =  async (event) => {
        event.preventDefault();
        const config = {
            url: "http://localhost:3000/signup/success",
            handleCodeInApp: true
        }
        await auth.sendSignInLinkToEmail(email, config);
        toast.success(`Confirmation email has been sent to ${email}`);

        window.localStorage.setItem("email", email);
        
        setEmail("");
    };

    const signupForm = () => {
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
                    className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-green-dark focus:outline-none my-1"
                >Create Account</button>
            </form>
        )
    };

    return (
        <div className="bg-gray-200 min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <ToastContainer />
                    {signupForm()}

                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the 
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and 
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div className="text-grey-dark mt-6">
                    Already have an account? 
                    <a className="no-underline border-b border-blue text-blue" href="../login/">
                        Log in
                    </a>.
                </div>
            </div>
        </div>
    )
};

export default Signup;