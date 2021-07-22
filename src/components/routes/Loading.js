import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const Loading = ({inh, ...rest}) => {
    const [time, setTime] = useState(3);

    let history = useHistory();

    useEffect(() => {
        const int = setInterval(() => {
            setTime((cTime) => --cTime);
        }, 1000);
        time === 0 && history.push('/');
        return () => clearInterval(int);
    }, [time]);

    return (
        <div style={{height: "94.1vh"}} className="bg-gray-300">
            <div className="text-center pt-24">
                <p className="text-2xl text-red-700">Access Denied {time}...</p>
            </div>
        </div>
    );
};

export default Loading;