import React, { useState } from "react";
import avatar from '../avatar.jpg';
import Camera from "../components/svg/camera";

const Profile = () => {
    const [img, setImg] = useState('')
    return (
        <section>
            <div className="profile_container">
                <div className="img_container">
                    <img src={avatar} alt="" />
                    <div className="overlay">
                        <div>
                            <label htmlFor="photo">
                                <Camera />
                            </label>
                            <input type="file" accept="image/*" style={{ display: 'none' }} id='photo' />
                        </div>
                    </div>
                </div>
                <div className="text_container">
                    <h3>Ruslan Orlov</h3>
                    <p>User email</p>
                    <hr />
                    <small>Joined on: ...</small>
                </div>
            </div>
        </section>
    )
};

export default Profile;