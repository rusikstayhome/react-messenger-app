import React from 'react';

const Register = () => {
    return (
        <section>
            <h3>Create an account</h3>
            <form className="form">
                <div className="input_container">
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' />
                </div>
                <div className="input_container">
                    <label htmlFor="Email">Email</label>
                    <input type="text" name='Email' />
                </div>
                <div className="input_container">
                    <label htmlFor="password">Password</label>
                    <input type="text" name='password' />
                </div>
            </form>
        </section>
    )
}

export default Register;