import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';

const Password = ({history}) => {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        await auth.currentUser.updatePassword(password)
        .then(() => {
            setLoading(false);

            toast.success("Password Reset Successful", {
                position: "top-center",
                draggable: true
            });
        })
        .catch(err => {
            setLoading(false);

            toast.error(err.message, {
                position: "top-center",
                draggable: true
            });
        })
    };

    const passwordForm = () => {
        return(
            <form onSubmit={handleSubmit}>
                <input 
                    type="password"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    value={password}
                    placeholder="new password"
                    onChange={event => setPassword(event.target.value)}
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-400 focus:outline-none my-1"
                    disabled={loading || password.length < 6}
                >Reset Password</button>
            </form>
        )
    };

    return (
        <div style={{height: "94.1vh"}} className="bg-gray-300 flex flex-col w-full">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center pb-24 justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    {loading ? <h1 className="mb-8 text-3xl text-center">Loading...</h1> : <h1 className="mb-8 text-3xl text-center">Reset Password</h1>}
                    
                    {passwordForm()}

                </div>
            </div>
        </div>
    )
};

export default Password;