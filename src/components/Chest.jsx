import React, { useState, useEffect } from "react";
import "./Components.css";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Chest = () => {
  const navigate = useNavigate();
  const authContext = useAuth();
  const jwtToken = authContext.jwtToken;
  const [exercises, setExercises] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 5;

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get("https://fitness-gym-genius.onrender.com/auth/api/fitness/all/chest");
        setExercises(response.data);
      } catch (error) {
        console.error("Failed to fetch exercises:", error);
      }
    };

    fetchExercises();
  }, []);

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

  // Calculate indexes of exercises to display on the current page
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  
  // Slice the exercises array to display only the ones for the current page
  const displayedExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  // Function to handle next page
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Function to handle previous page
  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Function to handle clicking on a specific page number
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page number buttons
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(exercises.length / exercisesPerPage); i++) {
    pageNumbers.push(
      <button key={i} onClick={() => goToPage(i)} className={i === currentPage ? "active" : ""}>
        {i}
      </button>
    );
  }



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

      {displayedExercises.map((exercises, index) => (
        <div className="exerciseswrapper" key={index}>
          <div className="boop"></div>
          <img src={exercises.imageURL} alt="" />
          <div className="description">
            <h1>{exercises.title}</h1>
            <p>
              <span>Description: </span> 
              {exercises.description1}
              &nbsp;
              {exercises.description2}
            </p>
          </div>
        </div>
      ))}

      {/* Pagination buttons */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </button>
        {pageNumbers}
        <button onClick={nextPage} disabled={currentPage === Math.ceil(exercises.length / exercisesPerPage)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Chest;
