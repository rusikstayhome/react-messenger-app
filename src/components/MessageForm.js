import React from "react";


const MessageForm = ({ handleSubmit, text, setText }) => {
    return (
        <div className="form_container">
            <form className="message_form" onSubmit={handleSubmit}>
                <div>
                    <input type="text" placeholder="Type your message" value={text} onChange={(e) => setText(e.target.value)} />

                </div>
                <div>
                    <button className="btn">Send</button>
                </div>
            </form>
        </div>
    )
}

export default MessageForm;