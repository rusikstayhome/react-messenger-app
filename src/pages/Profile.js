import React, { useState } from "react";
import avatar from '../avatar.jpg'

const Profile = () => {
    const [img, setImg] = useState('')
    return (
        <section>
            <div className="profile_container">
                <div className="img_container">
                    <img src={avatar} alt="" />
                </div>
                <div className="text_container">
                    <h3>User name</h3>
                    <p>User email</p>
                    <hr />
                    <small>Joined on: ...</small>
                </div>
            </div>
        </section>
    )
};

export default Profile;