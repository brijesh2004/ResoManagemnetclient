import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logind } from '../redux/slice';

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const login = useSelector((data) => data.cartData.login);
    const logoutfun = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEDN}/logout`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Origin': [`${process.env.REACT_APP_BACKEDN}`],
                    "Content-Type": 'application/json'
                }
            })
            await res.json();
            if (res.status === 401) {
                alert('Logout failed');
                dispatch(Logind(true))
            }
            else {
                navigate('/');
                dispatch(Logind(false));
            }
        } catch (err) {
            dispatch(Logind(true))
        }
    }
    useEffect(() => {
        if (login === false) {
            navigate("/login");
        }
    }, [login])
    useEffect(() => {
        logoutfun();
    }, [])

    return (
        <div>
            <h1>Logout page</h1>
        </div>
    )
}

export default Logout
