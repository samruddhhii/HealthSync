import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee, faPaperPlane, faRobot, faUser } from '@fortawesome/free-solid-svg-icons'
import robot from "../images/robot_3558860.png"

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const sendMessage = async () => {
    if (inputValue.trim() === '') return;
    // setMessages(messages.concat({ text: inputValue, type: 'user' }));
    // const updatedMessages = messages.concat({ text: inputValue, type: 'user' });
    // console.log(updatedMessages); // Log the updated messages array
    // setMessages(updatedMessages);
    // setMessages([...messages, { text: inputValue, type: 'user' }]);
    const response = await axios.get('/get', {
      params: { msg: inputValue },
    });

    // setMessages([...messages, { text: inputValue, type: 'user' }]);
    
    // setMessages([...messages, { text: response.data, type: 'bot' }]);

    const updatedMessages = messages.concat({ text: inputValue, type: 'user' });
  updatedMessages.push({ text: response.data, type: 'bot' });
  setMessages(updatedMessages);

    setInputValue('');
  };


  return (
    <div className="flex-1 mx-[20%] h-[50vh] ">

      {messages.length == 0 && (
              <div className="flex flex-col items-center justify-center"> 
                <div className="font-semibold text-3xl mt-[10%]">How May I help You Today?</div>
                <img className="w-[200px] mt-[2%]" src={robot} />
              </div>
              
        )}

        <div className="h-[140%] overflow-y-auto">
          
<div
        className=""

        ref={chatContainerRef}
        style={{
          flex: 1,
          // overflowY: 'auto',
          padding: '20px',
          marginBottom: '60px', // Adjusted to accommodate the input bar
      
        }}
      >
        


        {messages.map((message, index) => (
          <div
            className="flex "
            key={index}
            style={{
              // display: 'f',
              justifyContent: message.type === 'bot' ? 'flex-start' : 'flex-end',
              marginBottom: '10px',
            }}
          >
            
            {/* <FontAwesomeIcon 
              icon={faRobot} 
              className="p-3 mx-2 rounded-full bg-white "  
            /> */}
             {message.type === 'bot' && ( // Use conditional rendering for bot messages
            //  <div className="flex items-center">
            //   <FontAwesomeIcon icon={faRobot} className="p-3 mx-2 rounded-full bg-white text-ourBlue text-xl" /> 
            //   <span>Chat bot</span>
            //  </div>
            <FontAwesomeIcon icon={faRobot} className="p-3 mx-2 rounded-full bg-white text-ourBlue text-xl" /> 
             
             )}

            
            
            
            <div
            
              className="px-3 rounded-r-lg rounded rounded-t-lg"
              style={{
                padding: '10px',
                borderRadius: '20px',
                // borderRadius: `${
                //   message.type === 'user' ? '20px 20px 0 20px' : '20px 20px 20px 0'
                // }`,
                backgroundColor: message.type === 'bot' ? '#e0e0e0' : '#007bff',
                color: message.type === 'bot' ? '#333' : '#fff',
                maxWidth: '70%',
                wordWrap: 'break-word',
              }}
            >
              {message.text.length < 10 && ( // Check message length before rendering
              <span className="px-5 ">{message.text}</span>
              )}

            {message.text.length >= 15 && ( // Check message length before rendering
              <span >{message.text}</span>
              )}
              {/* {message.text} */}
            </div>

            

            {message.type === 'user' && ( // Use conditional rendering for bot messages
             <FontAwesomeIcon icon={faUser} className="p-3 mx-3 rounded-full bg-white text-ourBlue text-xl" /> // Include margin-right for spacing
             )}
            
          </div>
        ))}

            
      </div>
        </div>

      
      <div
        className='w-[70%] mx-[15%] my-[2%] '
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          backgroundColor: '#fff',
          
        }}
      >
        <input
          onKeyDown={(e)=>{
            if(e.key === "Enter"){
              sendMessage();
              inputRef.current.focus();
            }
          }}   

          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="rounded-l-lg  focus:border-none focus:outline-none"
          style={{
            flex: 1,
            padding: '14px',
            fontSize: '16px',
            // borderRight: 'none',
            borderLeft: '1px solid #000000',
            borderTop: '1px solid #000000',
            borderBottom: '1px solid #000000',
            // border: '1px solid #000000',
            
            
          }}
          
          placeholder="Type a message..."
        />
        <button

                 

          onClick={() => {
            sendMessage();
            inputRef.current.focus();
          }}
          className="rounded-r-lg bg-ourBlue"
          style={{
            padding: '14px 20px',
            
            // backgroundColor: '#007bff',
            color: '#fff',
            // border: '1px solid #007bff',
            borderRight: '1px solid',
            borderTop: '1px solid ',
            borderBottom: '1px solid ',
            borderColor: '#3CB19C', 
            cursor: 'pointer',
          }}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;



