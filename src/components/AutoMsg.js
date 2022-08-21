import React, { useRef } from "react";
import Img from '../user.jpg';
import Moment from 'react-moment';

const Message = ({ msg, user1 }) => {
    const scrollRef = useRef()


    return (
        <div className={`message_wrapper`}
            ref={scrollRef}>
            <p className={'friend'}>

                <img src={Img} alt='avatar' />
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