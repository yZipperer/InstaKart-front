import React, {useState, useEffect} from 'react';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';

const SignupSuccess = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        setEmail(window.localStorage.getItem("email"))
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        // password validation
        if(!email || !password || !name){
            toast.error("Email, Password, and Name are required");
            return;
        };
        if(password.length < 6){
            toast.error("Password must be at least 6 characters long");
            return;
        };

        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);
            //After submitting a password and confirming email
            if(result.user.emailVerified){
                window.localStorage.removeItem("email");
                let currentUser = auth.currentUser;
                await currentUser.updatePassword(password);
                await currentUser.updateProfile({displayName: name});
                const token = await currentUser.getIdTokenResult();

                props.history.push(`/`);
            };
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    };

    const signupFormStep2 = () => {
        return(
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    value={email}
                    placeholder="email address"
                    disabled
                />
                <input 
                    type="name"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    value={name}
                    placeholder="name"
                    onChange={event => setName(event.target.value)}
                    autoFocus
                />
                <input 
                    type="password"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    value={password}
                    placeholder="password"
                    onChange={event => setPassword(event.target.value)}
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
                    
                    {signupFormStep2()}

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

export default SignupSuccess;