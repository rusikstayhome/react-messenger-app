import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../firebase';
import { updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [data, setData] = useState({

        email: '',
        password: '',
        error: null,
        loading: false
    });

    const navigate = useNavigate();

    const { email, password, error, loading } = data;

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setData({ ...data, error: null, loading: true });
        if (!email || !password) {
            setData({ ...data, error: "All fields are required" });
        }
        try {
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            await updateDoc(doc(db, "users", result.user.uid), {
                isOnline: true,
            });
            setData({
                email: "",
                password: "",
                error: null,
                loading: false,
            });
            navigate("/", { replace: true });
        } catch (err) {
            setData({ ...data, error: err.message, loading: false });
        }
    };



    const signInWithGoogle = async (e) => {
        e.preventDefault();
        setData({ ...data, error: null, loading: true });
        const provider = new GoogleAuthProvider();

        signInWithRedirect(auth, provider)
            .then((result) => {
                updateDoc(doc(db, "users", result.user.uid), {
                    isOnline: true,
                });
                setData({
                    email: "",
                    password: "",
                    error: null,
                    loading: false,
                });
            })
            .catch();

        navigate("/", { replace: true });
    }
    return (
        <section>
            <h3>Login in your account</h3>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input_container">
                    <label htmlFor="email">Email</label>
                    <input type="text" name='email' value={email} onChange={handleChange} />
                </div>
                <div className="input_container">
                    <label htmlFor="password">Password</label>
                    <input type="text" name='password' value={password} onChange={handleChange} />
                </div>
                {error ? <p className='error'>{error}</p> : null}
                <div className="btn_container">
                    <button className="btn" disabled={loading}>{loading ? 'Loging in...' : 'Login'}</button>
                    <br />
                    <button onClick={signInWithGoogle} type='button' className="btn btn-google" disabled={loading}>Login In with Google</button>
                </div>
            </form>
        </section>
    )
}

export default Login;