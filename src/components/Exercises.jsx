import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import "./Components.css";
import { useNavigate } from "react-router-dom";


const Exercises = () => {
    const [degrees, setDegrees] = useState(0);
    const navigate = useNavigate();
    const authContext = useAuth();
    const jwtToken = authContext.jwtToken;

    const handlePrevClick = () => {
        setDegrees(degrees + 27.7);
    };

    const handleNextClick = () => {
        setDegrees(degrees - 27.7);
    };

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

      const handleShoulders = async (e) => {
        e.preventDefault();
        if (jwtToken !== null) {
          navigate("/shoulders");
        }
      };

      const handleChest = async (e) => {
        e.preventDefault();
        if (jwtToken !== null) {
          navigate("/chest");
        }
      };

      const handleAbs = async (e) => {
        e.preventDefault();
        if (jwtToken !== null) {
          navigate("/abs");
        }
      };

      const handleBack = async (e) => {
        e.preventDefault();
        if (jwtToken !== null) {
          navigate("/back");
        }
      };

      const handleBiceps = async (e) => {
        e.preventDefault();
        if (jwtToken !== null) {
          navigate("/biceps");
        }
      };

      const handleTriceps = async (e) => {
        e.preventDefault();
        if (jwtToken !== null) {
          navigate("/triceps");
        }
      };

      const handleForearms = async (e) => {
        e.preventDefault();
        if (jwtToken !== null) {
          navigate("/forearms");
        }
      };

      const handleLegs = async (e) => {
        e.preventDefault();
        if (jwtToken !== null) {
          navigate("/legs");
        }
      };

      const handleCalves = async (e) => {
        e.preventDefault();
        if (jwtToken !== null) {
          navigate("/calves");
        }
      };

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

            <div className="container">
                <div className="box" style={{ transform: `perspective(1000px) rotateY(${degrees}deg)` }}>
                    <span style={{ "--i": 13 }}>
                        <img src="exercises/shoulders.jpg"/>
                        <a href="/shoulders" onClick={handleShoulders}>Shoulders</a>
                    </span>

                    <span style={{ "--i": 1 }}>
                        <img src="exercises/chest.jpg"/>
                        <a href="/chest" onClick={handleChest}>Chest</a>
                    </span>

                    <span style={{ "--i": 2 }}>
                        <img src="exercises/abs.jpg"/>
                        <a href="/abs" onClick={handleAbs}>Abs</a>
                    </span>

                    <span style={{ "--i": 3 }}>
                        <img src="exercises/obliques.jpg"/>
                        <a href="/abs" onClick={handleAbs}>Obliques</a>
                    </span>
                    
                    <span style={{ "--i": 4 }}>
                        <img src="exercises/upperback.jpg"/>
                        <a href="/back" onClick={handleBack}>Upper Back</a>
                    </span>

                    <span style={{ "--i": 5 }}>
                        <img src="exercises/lowerback.jpg"/>
                        <a href="/back" onClick={handleBack}>Lower Back</a>
                    </span>

                    <span style={{ "--i": 6 }}>
                        <img src="exercises/lats.jpg"/>
                        <a href="/back" onClick={handleBack}>Lats</a>
                    </span>

                    <span style={{ "--i": 7 }}>
                        <img src="exercises/biceps.jpg"/>
                        <a href="/biceps" onClick={handleBiceps}>Biceps</a>
                    </span>

                    <span style={{ "--i": 8 }}>
                        <img src="exercises/triceps.jpg"/>
                        <a href="/triceps" onClick={handleTriceps}>Triceps</a>
                    </span>
                    
                    <span style={{ "--i": 9 }}>
                        <img src="exercises/forearms.jpg"/>
                        <a href="/forearms" onClick={handleForearms}>Forearms</a>
                    </span>

                    <span style={{ "--i": 10 }}>
                        <img src="exercises/quads.jpg"/>
                        <a href="/legs" onClick={handleLegs}>Quads</a>
                    </span>

                    <span style={{ "--i": 11 }}>
                        <img src="exercises/hamstrings.jpg"/>
                        <a href="/legs" onClick={handleLegs}>Hamstrings</a>
                    </span>

                    <span style={{ "--i": 12 }}>
                        <img src="exercises/calves.jpg"/>
                        <a href="/calves" onClick={handleCalves}>Calves</a>
                    </span>

                </div>
                <div className="btns">
                    <div className="btn prev" onClick={handlePrevClick}></div>
                    <div className="btn next" onClick={handleNextClick}></div>
                </div>
            </div>
        </div>
    );
};
export default Exercises;
