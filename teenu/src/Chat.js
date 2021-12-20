import React from 'react'
import "./Chat.css";
 function Chat() {
    return (
        <div className="chat-system-box">
            <div className="chatting-message">
                <span id="message">hello my name is sakshi</span>
                <span id="message">hello my name is sakshi</span>
                <span id="message">hello my name is sakshi</span>
                <span id="message">hello my name is sakshi</span>
                <span id="message">hello my name is sakshi</span>
                <span id="message">hello my name is sakshi</span>
                <span id="message">hello my name is sakshi</span>
                <span id="message">hello my name is sakshi</span>
                <span id="message">hello my name is sakshi</span>
                <span id="message">hello my name is sakshi</span>
                <span id="message">hello my name is sakshi</span>
                <span id="message">hello my name is sakshi</span>
                <span id="message">hello my name is sakshi</span>
                <span id="message">hello my name is sakshi</span>
            </div>
            <div className="send-message-form">
                <form className="form-wrapper cf">
                    <input type="text" id="message-field" />
                    <button type="submit" id= "message-button">send</button>
                </form>
            </div>
        </div>
    )
}
export default Chat
