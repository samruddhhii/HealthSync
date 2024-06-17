import React, {useEffect, useState } from "react";
import { ChainlitAPI, useChatSession , useChatMessages} from '@chainlit/react-client';


const Body = () => {
  const [data, setData] = useState([{}]);

  useEffect(()=>{
    fetch("/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data);
        console.log(data);
      }
    )
  }, []);

  return(
      <div>
          body here
          <div className="font-bold">color pink</div>
          {/* <a href="http://localhost:8000" target="_blank" rel="noopener noreferrer">Go to ChainLit</a> */}
          <div>
            
          </div>
      </div>
  )
};

export default Body;