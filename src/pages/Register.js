import React, { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { auth, db } from '../firebase';
import { setDoc, doc, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        error: null,
        loading: false,
        lastMsg: ''
    });

    const navigate = useNavigate();

    const { name, email, password, error, loading, lastMsg } = data;

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setData({ ...data, error: null, loading: true });
        if (!name || !email || !password) {
            setData({ ...data, error: "All fields are required" });
        }
        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            await setDoc(doc(db, "users", result.user.uid), {
                uid: result.user.uid,
                name,
                email,
                createdAt: Timestamp.fromDate(new Date()),
                isOnline: true,
                lastMsg
            });
            setData({
                name: "",
                email: "",
                password: "",
                error: null,
                loading: false,
                lastMsg
            });
            navigate("/", { replace: true });
        } catch (err) {
            setData({ ...data, error: err.message, loading: false });
        }
    };



    // const signInWithGoogle = async (e) => {
    //     e.preventDefault();
    //     setData({ ...data, error: null, loading: true });
    //     const provider = new GoogleAuthProvider();

    //     await signInWithRedirect(auth, provider)
    //         .then((result) => {
    //             setDoc(doc(db, "users", result.user.uid), {
    //                 uid: result.user.uid,
    //                 name: result.user.displayName,
    //                 email: result.user.email,
    //                 createdAt: Timestamp.fromDate(new Date()),
    //                 isOnline: true,
    //             });
    //             setData({
    //                 name: "",
    //                 email: "",
    //                 password: "",
    //                 error: null,
    //                 loading: false,
    //             });
    //         })
    //         .catch();

    //     navigate("/", { replace: true });
    // }
    return (
        <section>
            <h3>Create an account</h3>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input_container">
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' value={name} onChange={handleChange} />
                </div>
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
                    <button className="btn" disabled={loading}>{loading ? 'Creating...' : 'Register'}</button>

                    {/* <button onClick={signInWithGoogle} type='button' className="btn btn-google" disabled={loading}>Sign In with Google</button> */}
                </div>
            </form>
        </section>
    )
}

export default Register;