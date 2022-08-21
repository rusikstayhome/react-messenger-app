import React, { useRef } from "react";
import Img from '../user.jpg'
import Moment from 'react-moment'

const Message = ({ msg, user1, autoMsgs }) => {
    const scrollRef = useRef()

    // useEffect(() => {
    //     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    // }, [msg]);
    return (
        <div className={`message_wrapper ${msg.from === user1 ? "own" : ""}`}
            ref={scrollRef}>
            <p className={msg.from === user1 ? 'me' : 'friend'}>
                {/* {msg.media ? <img src={msg.media} alt={msg.text} /> : <img src={Img} alt='avatar' />} */}
                {msg.from === user1 ? null : <img src={Img} alt='avatar' />}
                <span>{msg.text}</span>
                <br />
                <small>
                    <Moment fromNow>
                        {msg.createdAt.toDate()}

                    </Moment>
                    /{msg.createdAt.toDate().toDateString()}

                </small>
            </p>
        </div>
    )
}

export default Message;