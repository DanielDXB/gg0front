import React, { useState, useEffect } from "react";
import "./Components.css";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";


const Chat = () => {
  const navigate = useNavigate();
  const authContext = useAuth();
  const jwtToken = authContext.jwtToken;
  const [message, setMessage] = useState(null)
  const [value, setValue] = useState(null)
  const [ previousChats, setPreviousChats] = useState([])
  const [ currentTitle, setCurrentTitle] = useState(null)

  const handleWeightLoss = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
          message: "Give me a diet plan of around 1600 to 1800 calories a day to lose weight! include meal examples with exact dossages!"
      }),
      headers: {
          "Content-Type": "application/json"
      }
  }
  
  try {
      setValue("Weight loss diet plan")
      const response = await fetch('http://localhost:8000/completions', options)
      const data = await response.json()
      console.log(data.choices[0].message);
      setMessage(data.choices[0].message)
  }  catch (err) {
      console.error(err);
  }
  }

  const handleMuscleGain = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
          message: "Give me a diet plan of around 2200 to 2500 calories a day to gain muscle mass! include meal examples with exact dossages!"
      }),
      headers: {
          "Content-Type": "application/json"
      }
  }
  
  try {
      setValue("Muscle gain diet plan")
      const response = await fetch('http://localhost:8000/completions', options)
      const data = await response.json()
      console.log(data.choices[0].message);
      setMessage(data.choices[0].message)
  }  catch (err) {
      console.error(err);
  }
  }


  const getMessages = async () => {
    const options = {
        method: "POST",
        body: JSON.stringify({
            message: value
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }

    try {
        const response = await fetch('http://localhost:8000/completions', options)
        const data = await response.json()
        console.log(data.choices[0].message);
        setMessage(data.choices[0].message)
    }  catch (err) {
        console.error(err);
    }
  }

  const createNewChat = () => {
    setMessage(null)
    setValue("")
    setCurrentTitle(null)
}

const handle3 = async () => {
  const options = {
    method: "POST",
    body: JSON.stringify({
        message: "Give me 3 days workout plan!"
    }),
    headers: {
        "Content-Type": "application/json"
    }
}

try {
    setValue("3 days workout plan")
    const response = await fetch('http://localhost:8000/completions', options)
    const data = await response.json()
    console.log(data.choices[0].message);
    setMessage(data.choices[0].message)
}  catch (err) {
    console.error(err);
}
}

const handle4 = async () => {
  const options = {
    method: "POST",
    body: JSON.stringify({
        message: "Give me 4 days workout plan!"
    }),
    headers: {
        "Content-Type": "application/json"
    }
}

try {
    setValue("4 days workout plan")
    const response = await fetch('http://localhost:8000/completions', options)
    const data = await response.json()
    console.log(data.choices[0].message);
    setMessage(data.choices[0].message)
}  catch (err) {
    console.error(err);
}
}

const handle5 = async () => {
  const options = {
    method: "POST",
    body: JSON.stringify({
        message: "Give me 5 days workout plan!"
    }),
    headers: {
        "Content-Type": "application/json"
    }
}

try {
    setValue("5 days workout plan")
    const response = await fetch('http://localhost:8000/completions', options)
    const data = await response.json()
    console.log(data.choices[0].message);
    setMessage(data.choices[0].message)
}  catch (err) {
    console.error(err);
}
}
  
const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle)
    setMessage(null)
    setValue("")
}

  const handleExercises = async (e) => {
    e.preventDefault();
    if (jwtToken !== null) {
      navigate("/exercises");
    }
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    if (jwtToken !== null) {
      navigate("/profile");
    }
  };

  const handleFeed = async (e) => {
    e.preventDefault();
    if (jwtToken !== null) {
      navigate("/feed");
    }
  };

  const handleNutrition = async (e) => {
    e.preventDefault();
    if (jwtToken !== null) {
      navigate("/nutrition");
    }
  };

  const handleChatbot = async (e) => {
    e.preventDefault();
    if (jwtToken !== null) {
      navigate("/chatbot");
    }
  };

  useEffect(() => {
    console.log(currentTitle, value, message)
    if (!currentTitle && value && message) {
        setCurrentTitle(value);
    }
    if (currentTitle && value && message) {
        setPreviousChats(prevChats => (
            [...prevChats,
                {
                    title: currentTitle,
                    role: "user",
                    content: value
                },
                {
                    title: currentTitle,
                    role: message.role,
                    content: message.content
                }
            ]
        ))
    }
  }, [message, currentTitle])

  console.log(previousChats)

  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))

  return (
    <div>
      <header className="header">
        <div className="logo">
          <img src="/logo-white.png" alt="" width={200} height={200} />
          <h1>Gym Genius</h1>
        </div>
        <nav className="navbar">
          <a href="/profile" onClick={handleProfile}>Profile</a>
          <a href="/feed" onClick={handleFeed}>Feed</a>
          <a href="/exercises" onClick={handleExercises}>Exercises</a>
          <a href="/nutrition" onClick={handleNutrition}>Nutrition</a>
          <a href="/chatbot" onClick={handleChatbot}>ChatBot</a>
          <a href="">Log-out</a>
        </nav>
      </header>

      <div className="chatapp">
        <section className="side-bar">
            <button onClick={createNewChat}>+ New chat</button>
            <ul className="history">
                {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>
                    <p>{uniqueTitle}</p>
                </li>)}
            </ul>
            <nav className="nav-chat">
                <p>Your personal trainer</p>
            </nav>
        </section>
        <div className="line">
        </div>
        <section className="main">
            <h1>I'm your AI coach! How can I help you!</h1>
            <ul className="content-feed">
            {currentChat?.map((chatMessage, index) => <li key={index}>
                    <p className="rrole">{chatMessage.role}:</p>
                    <p>{chatMessage.content}</p>
                </li>)}
            </ul>
            <div className="bottom-section">
                <div className="inp-container">
                <div className="lineinc"></div>
                  <div className="recomandations">
                    <button onClick={handle3}>3 days workout plan</button>
                    <button onClick={handle4}>4 days workout plan</button>
                    <button onClick={handle5}>5 days workout plan</button>
                  </div>
                  <div className="recomandations">
                    <button onClick={handleWeightLoss}>Weight loss personalised plan</button>
                    <button onClick={handleMuscleGain}>Muscle gain personalised plan</button>
                  </div>
                    <div className="lineinc">
                    </div>
                    <input className="inp-inp" type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
                    <div id="submit" onClick={getMessages}>➤</div>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default Chat;
