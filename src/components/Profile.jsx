import React, { useState, useEffect } from "react";
import "./Components.css";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const authContext = useAuth();
  const email = authContext.userEmail;
  const jwtToken = authContext.jwtToken;
  const [fullName, setFullName] = useState();
  const [password, setPassword] = useState();
  const [birthday, setBirthday] = useState();
  const [gender, setGender] = useState();
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [bmi, setBmi] = useState();
  const [rc, setRc] = useState();
  const [buttonState, setButtonState] = useState({
    text: "Update profile",
  });
  

  const fetchUser = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
      };
      const response = await axios.get(`https://fitness-gym-genius.onrender.com/user/get-user/${email}`, config);
      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Failed to fetch user data:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await fetchUser();
      if (userData) {
        setFullName(userData.userFullName);
        setBirthday(convertTimestampToDate(userData.userBirthDate));
        setGender(userData.userGender);
        setWeight(userData.userWeight);
        setHeight(userData.userHeight);
        setBmi(userData.userBMI);
        setRc(userData.userRecommendedCalories);
      }
    };
    fetchUserData();
  }, []);

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
      };
      const userData = {
        userFullName: fullName,
        userBirthDate: birthday,
        userGender: gender,
        userWeight: weight,
        userHeight: height,
        userBMI: bmi,
        userRecommendedCalories: rc
      };
      const response = await axios.put(`https://fitness-gym-genius.onrender.com/user/update-user/${email}`, userData, config);
      setButtonState({
        text: "Profile updated successfully!",
        color: "green",
        transition: true
      });
      // Hide the message and reset button after 3 seconds
      setTimeout(() => {
        setButtonState({
          text: "Update profile",
          color: "",
          transition: true
        });
        // Reset transition state after animation
        setTimeout(() => {
          setButtonState(prevState => ({
            ...prevState,
            transition: false
          }));
        }, 500);
      }, 3000);
      // Refetch the user data after successful update
      const updatedUserData = await fetchUser();
      // Update the state with the new data
      setFullName(updatedUserData.userFullName);
      setBirthday(convertTimestampToDate(updatedUserData.userBirthDate));
      setGender(updatedUserData.userGender);
      setWeight(updatedUserData.userWeight);
      setHeight(updatedUserData.userHeight);
      setBmi(updatedUserData.userBMI);
      setRc(updatedUserData.userRecommendedCalories)
    } catch (error) {
      console.error("Error updating user:", error);
    }
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

      <div className="registerwrapper">
        <form onSubmit={handleSubmit}>
          <h1>User profile</h1>

          <div className="irow">
            <div className="iinput-box">
              <p>Full Name:</p>
              <input
                className="inp"
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="iinput-box">
              <p>Email Address:</p>
              <input
                className="inp"
                type="email"
                placeholder={email}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="irow">
            <div className="iinput-box">
              <p>Age (Years):</p>
              <input
                className="inp"
                type="date"
                placeholder="Birthday"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
            <div className="iinput-box">
              <p>Gender: &nbsp;</p>
              <select
                className="inp"
                placeholder="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Others</option>
              </select>
            </div>
          </div>
          <div className="irow">
            <div className="iinput-box">
              <p>Weight in KG:</p>
              <input
                className="inp"
                type="number"
                placeholder="Weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="iinput-box">
              <p>Height in CM:</p>
              <input
                className="inp"
                type="number"
                placeholder="Height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>
          <p className="info-dom">Complete informations above in order to calculate your BMI and Recomanded daily calories intake.</p>
          <div className="irow">
            <div className="iinput-box">
            <p>Body Mass Index:</p>
            <input
              className="inp"
              type="number"
              min="0"
              step="0.01"
              placeholder="BMI"
              value={bmi}
              onChange={(e) => setBmi(e.target.value)}
            />
            </div>
            <div className="iinput-box">
              <p>Recommended calories:</p>
              <input
                className="inp"
                type="number"
                placeholder="Recommended calories"
                value={rc}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className={buttonState.transition ? "transition" : ""} style={{ backgroundColor: buttonState.color }}>{buttonState.text}</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
