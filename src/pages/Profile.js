import React, { useState, useEffect } from "react";
import Avatar from '../user.jpg';
import Camera from "../components/svg/camera";
import Delete from "../components/svg/delete";
import Search from '../components/svg/search';
import { storage, db, auth } from "../firebase";
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


const Profile = ({ searchFunction }) => {
    const [img, setImg] = useState('')
    const [user, setUser] = useState('');
    const navigate = useNavigate('');

    useEffect(() => {
        getDoc(doc(db, 'users', auth.currentUser.uid))
            .then((docSnap) => {
                if (docSnap.exists) {
                    setUser(docSnap.data());
                }
            });
        if (img) {
            const uploadImg = async () => {
                const imgRef = ref(
                    storage,
                    `avatar/${new Date().getTime()} - ${img.name}`
                );


                try {

                    if (user.avatarPath) {
                        await deleteObject(ref(storage, user.avatarPath))
                    }

                    const snap = await uploadBytes(imgRef, img);
                    const url = await getDownloadURL(ref(storage, snap.ref.fullPath))
                    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                        avatar: url,
                        avatarPath: snap.ref.fullPath
                    });

                    setImg('');
                } catch (err) {
                    console.log(err)
                }

            };
            uploadImg();

        }
    }, [img]);

    const deleteImage = async () => {
        try {
            const confirm = window.confirm('Delete avatar?')
            if (confirm) {
                await deleteObject(ref(storage, user.avatarPath))

                await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                    avatar: '',
                    avatarPath: ''
                })
                navigate("/", { replace: true });
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    return user ? (
        <section className="profile">
            <div className="profile_container">
                <div className="img_container">
                    <img src={user.avatar || Avatar} alt="" />
                    <div className="overlay">
                        <div>
                            <label htmlFor="photo">
                                <Camera />
                            </label>
                            {user.avatar ? <Delete deleteImage={deleteImage} /> : null}
                            <input type="file" accept="image/*" style={{ display: 'none' }} id='photo' onChange={e => setImg(e.target.files[0])} />
                        </div>
                    </div>
                </div>
                <div className="text_container">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <hr />
                    <small>Joined on: {user.createdAt.toDate().toDateString()}</small>
                </div>

            </div>
            <form action="" className="search_form">
                <label htmlFor="search">
                    <Search />
                </label>
                <input type="text" id='search' placeholder="Search or start new chat" onChange={(e) => searchFunction(e.target.value)} />
            </form>
        </section>
    ) : null
};

export default Profile;