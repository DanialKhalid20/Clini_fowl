import React, { useEffect, useRef, useState } from 'react';
import './Chatbot.css'; // Link the Chatbot.css file
import myImage from '../../assets/chick.ico'
import chick from '../../assets/chicky.ico'
import hen from '../../assets/hen1-removebg-preview.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link ,useParams  } from 'react-router-dom';
import axios from 'axios'; // Import Axios

var username ="You";
var botname = "CockBot";


const Chatbot = () => {
//clear textbox and initial value
  const msgEnd =useRef(null);
  const[input, setInput] =useState("")
  const[messages, setMessages] =useState([ ]);
  const [chatHistory, setChatHistory] = useState([]);
  const [hchatCounter, setHChatCounter] = useState(0);
  const [activeHChatKey, setActiveHChatKey] = useState(sessionStorage.getItem('activeHChatKey') || null);
  const [hchatStack, setHChatStack] = useState([]); // Initialize stack with first chat
  const [email, setEmail] = useState('');

  const initialGreeting = {
    message: "hello how can i assist you today",
    role: "assistant",
  };
//to keep scrolling
useEffect(()=>
{msgEnd.current.scrollIntoView();},
[messages]);

useEffect(() => {
  const userId = sessionStorage.getItem('userId');
  if (userId) {
    fetchHChatStack(userId);
    fetchUserDetails(userId);

  }
}, []);



useEffect(() => {
  if (activeHChatKey) {
    fetchChatHistory(activeHChatKey);
  }
}, [activeHChatKey]);

  useEffect(() => {
    sessionStorage.setItem('activeHChatKey', activeHChatKey);
  }, [activeHChatKey]);

const fetchChatHistory = async (hchatKey) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/chatHistory/${hchatKey}`);
    setChatHistory(response.data);
    
  } catch (error) {
    console.error("Error fetching chat history:", error);
  }
};

const fetchUserDetails = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/user/${userId}`);
    setEmail(response.data);
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
};

// api calling
const handleSend = async () => {
  const message = input;
  setInput('');

  // Add the user's message to the state
  setMessages((prevMessages) => [
    ...prevMessages,
    { message,  role: 'user' }
  ]);

  try {
    const botresponse = await axios.post('http://localhost:8080/api/chat', { message: message });
    const responseData = botresponse.data;
    
    // Add the bot's response to the state
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: responseData.response,  role: 'assistant' }
    ]);

    const userId = sessionStorage.getItem('userId'); // Use sessionStorag
    await saveChatMessage(userId, message, 'user', activeHChatKey);
    await saveChatMessage(userId, responseData.response, 'assistant', activeHChatKey);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const saveChatMessage = async (userId, message, role, hchatKey) => {
    try {
      // Make a POST request to the API endpoint to save the chat message
      const response = await axios.post('http://localhost:8080/api/saveChatMessage', { userId, message, role ,hchatKey});
      if (response.status === 200) {
      console.log('Chat message saved successfully');
    } else {
      console.error('Unexpected status code:', response.status);
    }
    } catch (error) {
      // Handle error if there's a problem saving the message
      console.error('Error saving chat message:', error);
    }
  };
  const handleToggleChat = (hchatKey) => {
    if (activeHChatKey !== hchatKey) {
      
      setActiveHChatKey(hchatKey);
      sessionStorage.setItem('activeHChatKey', hchatKey);
      fetchChatHistory(hchatKey);
    }
  };


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

    // handle new chat
      // Generate unique key for hchat button
  const generateHChatKey = () => {
    return `hchat-${hchatCounter}`;
  }
  const handleNewChat = async () => {
    
    const topHChatKey = hchatStack[hchatStack.length - 1];
    if (topHChatKey) {
      const response = await axios.get(`http://localhost:8080/api/chatHistory/${topHChatKey}`);
      const chatHistory = response.data;

      const hasUserMessage = chatHistory.some(message => message.role === 'user');
      const hasHistoryMessage = chatHistory.length > 0;
    
    if (hasUserMessage || hasHistoryMessage) { 
      const newChatKey = `hchat-${hchatStack.length}`;
      setHChatStack((prevStack) => [...prevStack, newChatKey]);
      setActiveHChatKey(newChatKey);
      sessionStorage.setItem('activeHChatKey', newChatKey);
      setMessages([]); // Clear current messages for new chat
      setChatHistory([]); // Clear chat history for new chat
      
      try {
        // Make a POST request to save hchatStack in the database
        const response = await axios.post('http://localhost:8080/api/saveHChatStack', { userId: sessionStorage.getItem('userId'), hchatStack: [...hchatStack, newChatKey] });
        if (response.status === 200) {
          console.log('hchatStack saved successfully');
        } else {
          console.error('Unexpected status code:', response.status);
        }
      } catch (error) {
        console.error('Error saving hchatStack:', error);
      }
    }
    else {
        setActiveHChatKey(topHChatKey);
        sessionStorage.setItem('activeHChatKey', topHChatKey);
      }
    }
  };
  

  // Increment hchat counter
  useEffect(() => {
    setHChatCounter(hchatCounter + 1);
  }, []);

  const combinedMessages = [
    initialGreeting,
    ...chatHistory,
    ...messages
  ];
const fetchHChatStack = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/getHChatStack/${userId}`);
    const { hchatStack } = response.data;
    if (hchatStack && hchatStack.length > 0) {
      // If the fetched stack is not empty, set it as the hchatStack state
      setHChatStack(hchatStack);
      setActiveHChatKey(hchatStack[hchatStack.length - 1]);
    } else {
      // If the fetched stack is empty, create a new hchat button and set it as active
      const newChatKey = `hchat-${hchatCounter}`;
      setHChatStack([newChatKey]);
      setActiveHChatKey(newChatKey);
      sessionStorage.setItem('activeHChatKey', newChatKey);
    }
  } catch (error) {
    console.error("Error fetching hchatStack:", error);
  }
};



const deleteActiveHChatButton = async () => {
  if (activeHChatKey) {
    try {
      const userId = sessionStorage.getItem('userId');
      const response = await axios.post(`http://localhost:8080/api/deleteHChatStack/${userId}/${activeHChatKey}`);
      if (response.status === 200) {
        // Get the index of the active hchat button being deleted
        const index = hchatStack.findIndex(key => key === activeHChatKey);
        // Remove the active hchat button from the stack
        const updatedHChatStack = hchatStack.filter(key => key !== activeHChatKey);
        setHChatStack(updatedHChatStack);

        // If there are remaining hchat buttons, set the last one as active
        if (updatedHChatStack.length > 0) {
          const newActiveHChatKey = updatedHChatStack[updatedHChatStack.length - 1];
          setActiveHChatKey(newActiveHChatKey);
          sessionStorage.setItem('activeHChatKey', newActiveHChatKey);
        } else {
          // No hchat buttons left, create a new one and set it as active
          const newChatKey = `hchat-${hchatCounter + 1}`;
          setHChatStack([newChatKey]);
          setActiveHChatKey(newChatKey);
          sessionStorage.setItem('activeHChatKey', newChatKey);
          setHChatCounter(hchatCounter + 1); // Increment the counter
        }

        console.log('HChat button deleted successfully');
      } else {
        console.error('Unexpected status code:', response.status);
      }
    } catch (error) {
      console.error('Error deleting hchat button:', error);
    }
  }
};

  
  
  
  return (
    <div className="chatbot-container">

<div className={`left ${isSidebarVisible ? 'sidebar-visible' : ''}`} ref={navRef}>

      <div className="left-section">

        <div className='left-section-top'>
        
        <div className="new-chat-options">
          
          <button className='new-chat-button'onClick={handleNewChat}>
          New Chat 
            <FontAwesomeIcon icon={faPenToSquare} />            
          </button>
        </div>
        </div>
        <div className='left-section-mid'>
  {hchatStack.map((hchatKey, i) => (
    <div className="chat-history" key={i}>
      <button className={`hchats ${activeHChatKey === hchatKey ? 'active' : ''}`}   onClick={() => handleToggleChat(hchatKey)}>

          <p>Chat {i + 1}</p>
        

        {activeHChatKey === hchatKey && ( // Only render trash icon for the active button
          <button className="fa-trash" onClick={deleteActiveHChatButton}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </button>
    </div>
  )).reverse()}
</div>

      <div className='left-section-bottom'>

    <div className="user-info">

     <img className="picture" src={hen} alt="User profile" width="40" height="40" />

     <div className='user'>
     <p>{email ? email.substring(0, 10) : '' }...</p>
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
{combinedMessages.map((message, index) => (
            <div key={index} className={`chat ${message.role}`}>
              <img className="chat-img" src={message.role === 'assistant' ? chick : myImage} alt="" width="30" height="30" />
              <div className="content-container">
                <p className="name">{message.role === 'assistant' ? botname : username}</p>
                <p className={message.role === "assistant" ? "text" : "text you"}>
                {message.message} {/* Display the message */}

                  {/* {message.text}  */}
                </p>
              </div>
            </div>
          ))}
  <div ref={msgEnd} />
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