import React, { useEffect, useState } from "react";
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot, addDoc, Timestamp, orderBy, setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import User from "../components/User";
import MessageForm from "../components/MessageForm";
import Message from "../components/Message";
import Profile from "./Profile";
import Moment from "react-moment";
import axios from "axios";
import Img from '../user.jpg'


const Home = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState('');
  const [text, setText] = useState('');
  const [msgs, setMsgs] = useState([]);
  const [autoMsgs, setAutoMsgs] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState('');

  const axios = require('axios');
  const user1 = auth.currentUser.uid
  useEffect(() => {
    const usersRef = collection(db, 'users')

    const q = query(usersRef, where('uid', 'not-in', [user1]));
    const unsub = onSnapshot(q, querySnapshot => {
      let users = []
      querySnapshot.forEach(doc => {
        users.push(doc.data())
      })
      setUsers(users);
    });

    return () => unsub();


  }, []);

  // useEffect(() => {
  //   axios.get('https://api.chucknorris.io/jokes/random')
  //     .then(res => {

  //       setAutoMsgs({
  //         text: res.data.value,
  //         to: user1,
  //         createdAt: Timestamp.fromDate(new Date())
  //       });
  //     })
  // }, [])

  useEffect(() => {
    const usersRef = collection(db, 'users')

    const q = query(usersRef, orderBy('lastMsg', 'desc'));
    const unsub = onSnapshot(q, querySnapshot => {
      let users = []
      querySnapshot.forEach(doc => {
        users.push(doc.data())
      })
      setUsers(users.filter(user => user.uid !== user1));
    });

    return () => unsub();


  }, []);

  const searchFunction = (e) => {
    setSearch(e);
    if (search !== '') {
      const filtered = users.filter(user => {
        return user.name.toLowerCase().includes(e.toLowerCase())
      });
      setFilteredUsers(filtered);
    } else setFilteredUsers(users);


  };



  const selectUser = async (user) => {
    setChat(user);
    // console.log(user);

    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(db, 'messages', id, 'chat');
    const q = query(msgsRef, orderBy('createdAt', 'asc'));

    onSnapshot(q, querySnapshot => {
      let msgs = []
      querySnapshot.forEach(doc => {
        msgs.push(doc.data())
      })
      setMsgs(msgs)
      console.log(msgs)

    })

    const docSnap = await getDoc(doc(db, 'lastMsg', id))
    if (docSnap.data().from !== user1) {
      await updateDoc(doc(db, 'lastMsg', id), { unread: false })
    }
  }

  // console.log(msgs);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = chat.uid
    const show = 'show'

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

    await updateDoc(doc(db, "users", user1), {
      lastMsg: Timestamp.fromDate(new Date())
    })

    await addDoc(collection(db, 'messages', id, 'chat'), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date())
    });

    await setDoc(doc(db, 'lastMsg', id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      unread: true
    })
    setText('');

    setTimeout(() => {
      axios.get('https://api.chucknorris.io/jokes/random')
        .then(res => {

          setAutoMsgs({
            text: res.data.value,
            from: user2,
            to: user1,
            createdAt: Timestamp.fromDate(new Date())
          });
          updateDoc(doc(db, "users", user2), {
            text: res.data.value,
            lastMsg: Timestamp.fromDate(new Date())
          })
          addDoc(collection(db, 'messages', user2, 'chat'), {
            text: res.data.value,
            from: user2,
            to: user1,
            createdAt: Timestamp.fromDate(new Date())
          });
          setDoc(doc(db, 'lastMsg', user2), {
            text: res.data.value,
            from: user2,
            to: user1,
            createdAt: Timestamp.fromDate(new Date()),
            unread: true
          })
          setText('');
          console.log(autoMsgs.text)
        })

    }, 1500)


  }
  // useEffect(() => {



  // }, [handleSubmit])


  return (
    <div className="home_container">
      <div className="users_container">
        <Profile searchFunction={searchFunction} />

        {search.length >= 1 ?
          filteredUsers.map(user =>
            <User key={user.uid} user={user} selectUser={selectUser} user1={user1} chat={chat} />)

          :

          users.sort((a, b) => b.lastMsg - a.lastMsg).map(user =>
            <User key={user.uid} user={user} selectUser={selectUser} user1={user1} chat={chat} />)

        }
      </div>
      <div className="messages_container">
        {chat ? (
          <>
            <div className="messages_user">
              <h3>{chat.name}</h3>
            </div>
            <div className="messages">
              {msgs.length ?
                msgs.map((msg, i) => <Message key={i} msg={msg} user1={user1} />)
                : null}



              {autoMsgs && <div className={`message_wrapper`}
              >
                <p className='friend'>
                  <img src={Img} alt='avatar' />
                  <span>{autoMsgs.text}</span>
                  <br />
                  <small>
                    <Moment fromNow>

                      {autoMsgs.createdAt && autoMsgs.createdAt.toDate()}

                    </Moment>
                    /{autoMsgs.createdAt && autoMsgs.createdAt.toDate().toDateString()}

                  </small>
                </p>
              </div>}
            </div>
            <MessageForm handleSubmit={handleSubmit} text={text} setText={setText} />
          </>
        ) : (
          <h3 className="no_conv">Select a user to start conversation </h3>
        )}
      </div>
    </div >
  )
}

export default Home;