import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const Password = ({history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    
    const loginForm = () => {
        return(
            <form>
                <input 
                    type="email"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    value={email}
                    placeholder="email address"
                    onChange={event => setEmail(event.target.value)}
                    autoFocus
                />
                <input 
                    type="password"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    value={password}
                    placeholder="password"
                    onChange={event => setPassword(event.target.value)}
                />
                <button
                    type="submit"
                    className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-400 focus:outline-none my-1"
                    disabled={!email || password.length < 6}
                >Reset Password</button>
            </form>
        )
    };

    return (
        <div style={{height: "94.1vh"}} className="bg-gray-300 flex flex-col w-full">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center pb-24 justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    {loading ? <h1 className="mb-8 text-3xl text-center">Loading...</h1> : <h1 className="mb-8 text-3xl text-center">Log In</h1>}
                    
                    {loginForm()}

                </div>
            </div>
        </div>
    )
};

export default Password;