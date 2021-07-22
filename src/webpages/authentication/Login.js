import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {auth, googleAuthProvider} from '../../firebase';
import {useDispatch, useSelector} from 'react-redux';
import {cUser} from '../../apiFunctions/authentication';
import {toast} from 'react-toastify';

const Login = ({history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    let dispatch = useDispatch();

    let rState = useSelector((rState) => {
        return rState;
    });

    //on rState.user changes
    useEffect(() => {
        if(rState.user && rState.user.token){
            history.push('/');
        }
    }, [rState.user]);

    const roleRedirect = (res) => {
        if(res.data.role === 'admin'){
            history.push('/admin/dashboard');
        } else {
            history.push('/');
        }
    };

    const handleSubmit =  async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            const {user} = result;
            const tokenResult = await user.getIdTokenResult();

            cUser(tokenResult.token)
                .then((res) => {
                    dispatch({
                        type: "LOGGED_IN",
                        payload: {
                            _id: res.data._id,
                            name: res.data.name,
                            email: res.data.email,
                            token: tokenResult.token,
                            role: res.data.role
                        }
                    });
                    roleRedirect(res);
                })
                .catch((err) => console.log(err));

            setLoading(false);

            toast.success("Log In was successful", {
                position: "top-center",
                draggable: true
            });
        } catch (err) {
            console.log(err);
            toast.error(err.message);
            setLoading(false);
        }
    };

    const loginWithGoogle = async () => {
        auth.signInWithPopup(googleAuthProvider)
        .then(async (result) => {
            const {user} = result;
            const tokenResult = await user.getIdTokenResult();

            cUser(tokenResult.token)
                .then((res) => {
                    dispatch({
                        type: "LOGGED_IN",
                        payload: {
                            _id: res.data._id,
                            name: res.data.name,
                            email: res.data.email,
                            token: tokenResult.token,
                            role: res.data.role
                        }
                    });
                    roleRedirect(res);
                })
                .catch((err) => console.log(err));

            toast.success("Log In was successful", {
                position: "top-center",
                draggable: true
            });
        })
        .catch(err => {
            console.log(err);
            toast.error(err.message);
        });
    };

    const loginForm = () => {
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
                >Log In</button>
                <button
                    onClick={loginWithGoogle}
                    type="submit"
                    className="w-full text-center py-3 rounded bg-red-500 text-white hover:bg-red-400 focus:outline-none my-1"
                >Log In with Google</button>
                <div className="text-grey-dark mt-1 text-center">
                    <Link to={'/forgot/password'} className="no-underline border-b border-blue-700 text-blue-700 pl-1 hover:border-blue-400 hover:text-blue-400">
                        Forgot Password?
                    </Link>.
                </div>
            </form>
        )
    };

    return (
        <div style={{height: "94.1vh"}} className="bg-gray-300 flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center pb-24 justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    {loading ? <h1 className="mb-8 text-3xl text-center">Loading...</h1> : <h1 className="mb-8 text-3xl text-center">Log In</h1>}
                    
                    {loginForm()}

                </div>

                <div className="text-grey-dark mt-6">
                    Don't have an account? 
                    <Link to={'/signup'} className="no-underline border-b border-blue-700 text-blue-700 pl-1 hover:border-blue-400 hover:text-blue-400">
                        Sign Up
                    </Link>.
                </div>
            </div>
        </div>
    )
};

export default Login;