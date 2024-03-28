import React, { useState, useEffect } from "react";
import "./Components.css";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Feed = () => {
  const navigate = useNavigate();
  const authContext = useAuth();
  const jwtToken = authContext.jwtToken;
  const userEmail = authContext.userEmail;
  const [exercises, setExercises] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 5;
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [exerciseVotes, setExerciseVotes] = useState({});

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
          },
        };
  
        const response = await axios.get("https://fitness-gym-genius.onrender.com/post/get-all-posts", config);
        const exercisesWithLikesAndDislikes = await Promise.all(
          response.data.map(async (exercise) => {
            const { likes, dislikes } = await fetchLikesAndDislikes(exercise.postId);
            const voteStatus = await fetchVoteStatus(exercise.postId);
            return { ...exercise, likes, dislikes, voteStatus };
          })
        );
        setExercises(exercisesWithLikesAndDislikes);

        const votes = {};
        exercisesWithLikesAndDislikes.forEach(exercise => {
          votes[exercise.postId] = exercise.voteStatus;
        });
        setExerciseVotes(votes);
      } catch (error) {
        console.error("Failed to fetch exercises:", error);
      }
    };
  
    fetchExercises();
  }, []);

  const fetchLikesAndDislikes = async (postId) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
      };

      const likesResponse = await axios.get(`https://fitness-gym-genius.onrender.com/post/likes/${postId}`, config);
      const dislikesResponse = await axios.get(`https://fitness-gym-genius.onrender.com/post/dislikes/${postId}`, config);

      return {
        likes: likesResponse.data,
        dislikes: dislikesResponse.data
      };
    } catch (error) {
      console.error("Failed to fetch likes and dislikes:", error);
      return {
        likes: 0,
        dislikes: 0
      };
    }
  };

  const fetchVoteStatus = async (postId) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
      };

      const response = await axios.get(`https://fitness-gym-genius.onrender.com/vote/get-vote-type/${postId}/${userEmail}`, config);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch vote status:", error);
      return null;
    }
  };

  const handleLike = async (postId) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
      };
  
      // Fetch the current vote status of the post
      const currentVoteStatus = exerciseVotes[postId];
  
      // Check if the current status of the vote is active
      if (currentVoteStatus === true) {
        // Fetch the vote_id associated with the post and user
        const voteIdResponse = await axios.get(`https://fitness-gym-genius.onrender.com/vote/vote_id/${postId}/${userEmail}`, config);
        const voteId = voteIdResponse.data;
        
        // Call the delete-vote endpoint using the vote_id to remove the like
        await axios.delete(`https://fitness-gym-genius.onrender.com/vote/delete-vote/${voteId}`, config);
        
        // Update exerciseVotes state to reflect the change in button status (deactivate like)
        setExerciseVotes(prevState => ({
          ...prevState,
          [postId]: undefined // Set vote status to undefined to indicate it's deactivated
        }));
        
        // Update the exercises state to reflect the change in likes count (decrement likes count)
        setExercises(prevExercises => prevExercises.map(exercise => {
          if (exercise.postId === postId) {
            return { ...exercise, likes: exercise.likes - 1 }; // Decrement likes count
          }
          return exercise;
        }));
      } else {
        // Otherwise, proceed with liking functionality
  
        // Like the post
        await axios.post(`https://fitness-gym-genius.onrender.com/vote/save-vote/${postId}/${userEmail}`, { voteType: true }, config);
        
        // Update exerciseVotes state to reflect the change in button status (activate like)
        setExerciseVotes(prevState => ({
          ...prevState,
          [postId]: true // Set vote status to true to indicate it's activated
        }));
        
        // Update the exercises state to reflect the change in likes count (increment likes count)
        setExercises(prevExercises => prevExercises.map(exercise => {
          if (exercise.postId === postId) {
            return { ...exercise, likes: exercise.likes + 1 }; // Increment likes count
          }
          return exercise;
        }));

        if (currentVoteStatus === false) {
        setExercises(prevExercises => prevExercises.map(exercise => {
          if (exercise.postId === postId) {
            return { ...exercise, dislikes: exercise.dislikes - 1 }; // Increment dislikes count
          }
          return exercise;
        }));
      }
      }
    } catch (error) {
      console.error("Failed to like exercise:", error);
    }
  };
  
  const handleDislike = async (postId) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
      };
  
      // Fetch the current vote status of the post
      const currentVoteStatus = exerciseVotes[postId];
  
      // Check if the current status of the vote is active
      if (currentVoteStatus === false) {
        // Fetch the vote_id associated with the post and user
        const voteIdResponse = await axios.get(`https://fitness-gym-genius.onrender.com/vote/vote_id/${postId}/${userEmail}`, config);
        const voteId = voteIdResponse.data;
        
        // Call the delete-vote endpoint using the vote_id to remove the dislike
        await axios.delete(`https://fitness-gym-genius.onrender.com/vote/delete-vote/${voteId}`, config);
        
        // Update exerciseVotes state to reflect the change in button status (deactivate dislike)
        setExerciseVotes(prevState => ({
          ...prevState,
          [postId]: undefined // Set vote status to undefined to indicate it's deactivated
        }));
        
        // Update the exercises state to reflect the change in dislikes count (decrement dislikes count)
        setExercises(prevExercises => prevExercises.map(exercise => {
          if (exercise.postId === postId) {
            return { ...exercise, dislikes: exercise.dislikes - 1 }; // Decrement dislikes count
          }
          return exercise;
        }));
      } else {
        // Otherwise, proceed with disliking functionality
  
        // Dislike the post
        await axios.post(`https://fitness-gym-genius.onrender.com/vote/save-vote/${postId}/${userEmail}`, { voteType: false }, config);
        
        // Update exerciseVotes state to reflect the change in button status (activate dislike)
        setExerciseVotes(prevState => ({
          ...prevState,
          [postId]: false // Set vote status to false to indicate it's activated
        }));
        
        // Update the exercises state to reflect the change in dislikes count (increment dislikes count)
        setExercises(prevExercises => prevExercises.map(exercise => {
          if (exercise.postId === postId) {
            return { ...exercise, dislikes: exercise.dislikes + 1 }; // Increment dislikes count
          }
          return exercise;
        }));
        if (currentVoteStatus === true) {
        setExercises(prevExercises => prevExercises.map(exercise => {
          if (exercise.postId === postId) {
            return { ...exercise, likes: exercise.likes - 1 }; // Increment dislikes count
          }
          return exercise;
        }));}
      }
    } catch (error) {
      console.error("Failed to dislike exercise:", error);
    }
  };
  

  const fetchExercisesByCategory = async (category) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
      };
  
      const response = await axios.get(`https://fitness-gym-genius.onrender.com/post/get-all-posts-by-category/${category}`, config);
      
      const exercisesWithLikesAndDislikes = await Promise.all(
        response.data.map(async (exercise) => {
          const { likes, dislikes } = await fetchLikesAndDislikes(exercise.postId);
          return { ...exercise, likes, dislikes };
        })
      );
      
      setExercises(exercisesWithLikesAndDislikes);
    } catch (error) {
      console.error(`Failed to fetch ${category} posts:`, error);
    }
  };

  const fetchExercises = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
      };

      const response = await axios.get("https://fitness-gym-genius.onrender.com/post/get-all-posts", config);
      const exercisesWithLikesAndDislikes = await Promise.all(
        response.data.map(async (exercise) => {
          const { likes, dislikes } = await fetchLikesAndDislikes(exercise.postId);
          return { ...exercise, likes, dislikes };
        })
      );
      setExercises(exercisesWithLikesAndDislikes);
    } catch (error) {
      console.error("Failed to fetch exercises:", error);
    }
  };

  const fetchMostLiked = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
      };

      const response = await axios.get("https://fitness-gym-genius.onrender.com/post/get-all-posts-ordered-by-votes", config);
      const exercisesWithLikesAndDislikes = await Promise.all(
        response.data.map(async (exercise) => {
          const { likes, dislikes } = await fetchLikesAndDislikes(exercise.postId);
          return { ...exercise, likes, dislikes };
        })
      );
      setExercises(exercisesWithLikesAndDislikes);
    } catch (error) {
      console.error("Failed to fetch exercises:", error);
    }
  };

  const handleNutritionCategory = async (e) => {
    e.preventDefault();
    if (jwtToken !== null) {
      fetchExercisesByCategory("nutrition"); // Fetch posts by category
      setCurrentPage(1);
    }
  };

  const handleFitness = async (e) => {
    e.preventDefault();
    if (jwtToken !== null) {
      fetchExercisesByCategory("fitness"); // Fetch posts by category
      setCurrentPage(1);
    }
  };

  const handleAllCategory = async (e) => {
    e.preventDefault();
    if (jwtToken !== null) {
      fetchExercises()
      setCurrentPage(1);
    }
  };

  const handleMostLiked = async (e) => {
    e.preventDefault();
    if (jwtToken !== null) {
      fetchMostLiked()
      setCurrentPage(1);
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

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${day}-${month}-${year}`;
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

      const body = {
        postTitle: formData.title,
        postContent: formData.content,
        postCategory: formData.sortBy
      };

      await axios.post(`https://fitness-gym-genius.onrender.com/post/save-post/${userEmail}`, body, config);
      
      // Close the form after successful submission
      setShowForm(false);

      // Refetch all posts
      const response = await axios.get("https://fitness-gym-genius.onrender.com/post/get-all-posts", config);
      setExercises(response.data);
    } catch (error) {
      console.error("Failed to submit post:", error);
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

      <div className="options">
        <button onClick={() => setShowForm(true)}>What's in your mind?</button>
        <button onClick={handleMostLiked}>Most liked</button>
        <button onClick={handleFitness}>#fitness</button>
        <button onClick={handleNutritionCategory}>#nutrition</button>
        <button onClick={handleAllCategory}>#all</button>
      </div>

      {showForm && (
        <div className="blur-background">
          <form className="form-container" onSubmit={handleSubmit}>
            <button
              type="button"
              className="close-button"
              onClick={() => setShowForm(false)}
            >
              X
            </button>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <textarea
              type="text"
              placeholder="Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            ></textarea>
            <select
              value={formData.sortBy}
              onChange={(e) => setFormData({ ...formData, sortBy: e.target.value })}
            >
            <option value="all">All</option>
            <option value="fitness">Fitness</option>
            <option value="nutrition">Nutrition</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {displayedExercises.map((exercise, index) => (
        <div className="exerciseswrapper wrfeed" key={index}>
          <div className="description feed">
            <div className="flex">      
            <h2>{exercise.postTitle}</h2>    
            <p className="category">Category: #{exercise.postCategory}</p>
            <p>Posted on: {convertTimestampToDate(exercise.postDate)}</p>
            </div>  
          <p>{exercise.postContent}</p>
          </div>
          <div className="votes">
            <div className="line">
            <button className={`vote ${exerciseVotes[exercise.postId] === true ? 'active' : ''}`} onClick={() => handleLike(exercise.postId)}>Like</button>
          <p>{exercise.likes}</p>
          </div>
          <div className="line">
          <button className={`vote ${exerciseVotes[exercise.postId] === false ? 'active' : ''}`} onClick={() => handleDislike(exercise.postId)}>Dislike</button>
          <p>{exercise.dislikes}</p>
          </div>

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

export default Feed;
