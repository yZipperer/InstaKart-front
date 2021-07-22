import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {auth} from '../../firebase';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';

const Signup = ({history}) => {
    const [email, setEmail] = useState("");

    let rState = useSelector((rState) => {
        return rState;
    });

    //on rState.user changes
    useEffect(() => {
        if(rState.user && rState.user.token){
            history.push('/');
        }
    }, [rState.user]);

    const handleSubmit =  async (event) => {
        event.preventDefault();
        const config = {
            url: process.env.REACT_APP_CONFIRM_REGISTRATION_URL,
            handleCodeInApp: true
        };
        await auth.sendSignInLinkToEmail(email, config);
        toast.success(`Confirmation email has been sent to ${email}`, {
            position: "top-center",
            draggable: true
        });

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
                    className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-400 focus:outline-none my-1"
                    disabled={!email}
                >Send Confirmation</button>
            </form>
        )
    };

    return (
        <div style={{height: "94.1vh"}} className="bg-gray-300 flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center pb-24 justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    
                    {signupForm()}

                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the 
                        <Link to={'/'} className="no-underline border-b border-blue-700 text-blue-700 pl-1 hover:border-blue-400 hover:text-blue-400">
                            Terms of Service
                        </Link> and 
                        <Link to={'/'} className="no-underline border-b border-blue-700 text-blue-700 pl-1 hover:border-blue-400 hover:text-blue-400">
                            Privacy Policy
                        </Link>
                    </div>
                </div>

                <div className="text-grey-dark mt-6">
                    Already have an account? 
                    <Link to={'/login'} className="no-underline border-b border-blue-700 text-blue-700 pl-1 hover:border-blue-400 hover:text-blue-400">
                        Log in
                    </Link>.
                </div>
            </div>
        </div>
    )
};

export default Signup;