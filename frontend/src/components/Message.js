import React from "react";

const Message = (props) => {
    let dataRoll = props.position === "left_bubble" ? "ASSISTANT" : "USER";
    return (
        <div data-role={dataRoll} className="bubble-container"

        style={{
            padding: "8px",
            backgroundColor: "white",
            borderRadius: "8px",
            marginBottom: "8px",
        }}
        >
            {/* <div className={thisClass}> */}
            <div >
                <div className="text_message">
                    {props.message.replace(/<\/?[^>]+(>|$)/g, "")}
                </div>
            </div>
        </div>
    )
};

export default Message;