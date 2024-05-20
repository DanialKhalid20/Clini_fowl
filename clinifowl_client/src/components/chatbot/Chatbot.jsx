import React, { useEffect, useRef, useState } from 'react';
import './Chatbot.css'; // Link the Chatbot.css file
import myImage from '../../assets/chick.ico'
import chick from '../../assets/chicky.ico'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios

var username ="You";
var botname = "ChickBot";


const Chatbot = () => {
//clear textbox and initial value
  const msgEnd =useRef(null);
  const[input, setInput] =useState("")
  const[messages, setMessages] =useState([
{
  text: "hello how can i assist you today",
  isBot: true,

}
  ])

//to keep scrolling
useEffect(()=>
{msgEnd.current.scrollIntoView();},
[messages]);

// api calling
const handleSend = async()=>{
   const text = input;
   setInput('');
   setMessages([
...messages,
{text, isBot:false}

   ])

   try {
    const response = await axios.post('http://localhost:8080/api/chat', { message: text });
    const responseData = response.data;
    setMessages([
      ...messages,
      { text: responseData.response, isBot: true }
    ]);
  } catch (error) {
    console.error('Error:', error);
    // Handle error if needed
  }
}

//enter key to send
const handleEnter = async (e) =>
{
  if(e.key ==='Enter') await handleSend();

}


// for side bar
  const navRef = useRef();
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="chatbot-container">

<div className={`left ${isSidebarVisible ? 'sidebar-visible' : ''}`} ref={navRef}>

      <div className="left-section">

        <div className='left-section-top'>
        
        <div className="new-chat-options">
          <button className='new-chat-button' onClick={()=>{window.location.reload()}}>
          New Chat 
            <FontAwesomeIcon icon={faPenToSquare} />            
          </button>
        </div>
        </div>
    <div className='left-section-mid'>

        <div className="chat-history">
          <button className='hchats'>
            <p>
              chat
            </p>
          </button>
         
          <button className='hchats'>
            <p>
              chat
            </p>
          </button>
         
        </div>

        </div>
      

      <div className='left-section-bottom'>

    <div className="user-info">

     <img className="picture" src="./images/hen2-removebg-preview.png" alt="User profile" width="40" height="40" />

     <div className='user'>
     <p>My Name is?</p>
     </div>
        </div>

        </div>


        </div>

</div>

{/* Right Section top */}
  {/* Right Section mid and bottom*/}
  <div className="right-section">
    
<div className="right-top">
<div className={`right ${isSidebarVisible ? 'sidebar-visible' : ''}`} ref={navRef}>

<div className="transparent-window"> 
<Link to='/homepage'>
      <FontAwesomeIcon icon={faArrowLeft} />
    </Link>
                      
<button className='menu' onClick={toggleSidebar}>
    <FontAwesomeIcon icon={isSidebarVisible ? faTimes : faBars} />
  </button>

  <button className='only-new-chat-button' onClick={()=>{window.location.reload()}}>
      <FontAwesomeIcon icon={faPenToSquare} />            
    </button>

  </div>
</div>
</div>
    
   

      <div className='right-section-mid'>

        {/* <div className="chat">
        <img className="chat-img" src={myImage} alt=""  width="30" height="30"/>
        <div className="content-container">
          <p className="name">
          You
         </p>
         <p className="text">
           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum, accusantium deleniti. Quas labore recusandae, maxime necessitatibus perferendis alias quisquam aliquam ullam deleniti? Cumque soluta sed, a vel enim hic consectetur dolorem earum voluptas quas placeat distinctio minus eum sunt, officiis corrupti! Molestiae quae ex eveniet asperiores cum commodi quo incidunt et delectus molestias totam sed minima magnam possimus, nemo beatae debitis voluptatum itaque vitae quibusdam est obcaecati autem ut. Similique, voluptatibus voluptate. Temporibus dolorem a dicta, quae, nihil nisi sit optio praesentium sapiente tempore, sed commodi quibusdam. Aliquid quo autem debitis velit, nam dignissimos repellat quis? Velit vitae autem quidem.
           </p>
         </div>
        </div>

    <div className="chat bot">
    
    <img className="chat-img" src={henImage} alt=""  width="30" height="30"/>
    <div className="content-container">
    <p className="name">
      CockBot
    </p>
    <p className="text">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum, accusantium deleniti. Quas labore recusandae, maxime necessitatibus perferendis alias quisquam aliquam ullam deleniti? Cumque soluta sed, a vel enim hic consectetur dolorem earum voluptas quas placeat distinctio minus eum sunt, officiis corrupti! Molestiae quae ex eveniet asperiores cum commodi quo incidunt et delectus molestias totam sed minima magnam possimus, nemo beatae debitis voluptatum itaque vitae quibusdam est obcaecati autem ut. Similique, voluptatibus voluptate. Temporibus dolorem a dicta, quae, nihil nisi sit optio praesentium sapiente tempore, sed commodi quibusdam. Aliquid quo autem debitis velit, nam dignissimos repellat quis? Velit vitae autem quidem.
    </p>
  </div>
        </div> */}

  {/* bot check */}
{messages.map((message, i)=> 

<div key={i} className={message.isBot?"chat bot":"chat"}>
    
<img className="chat-img" src={message.isBot?chick: myImage} alt=""  width="30" height="30"/>
<div className="content-container">
<p className="name">
{message.isBot?botname:username}
</p>
<p className={message.isBot?"text":"text you"}>
  {message.text} 
</p>
</div>
    </div>


    )}    
  <div ref={msgEnd}/>

      </div>


      <div className='chat-footer'>
        <div className="chat-interaction">
          {/* Text Input */}
          <textarea type="text" className="text-input" placeholder="Type your message..." spellcheck="false" value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}}/>
          {/* Send Button */}
          <button className="send-button" onClick={handleSend}>
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          </div>
          <div className='some-text'>
       <p>   Chickbot can make mistakes. Always consult a doctor first before coming to a conclusion.</p>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Chatbot;