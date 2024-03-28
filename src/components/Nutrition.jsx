import React, { useState, useEffect } from "react";
import "./Components.css";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Nutrition = () => {
  const navigate = useNavigate();
  const authContext = useAuth();
  const jwtToken = authContext.jwtToken;
  const [searchQuery, setSearchQuery] = useState("");
  const [nutritionData, setNutritionData] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition",
        {
          params: { query: searchQuery },
          headers: {
            'X-RapidAPI-Key': '2f93841f4amshdec203d7134cd3ep11814fjsn59afc4ac581e',
            'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
          }
        }
      );
      setNutritionData(response.data); // Assuming the response data structure is a list of objects
    } catch (error) {
      console.error("Error fetching nutrition data:", error);
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

      <div className="registerwrapper long">
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <div className="irow2">
            <div className="iinput-box2">
              <input
                className="inp2"
                type="text"
                placeholder="Search any food or meal"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <button type="submit">Search</button>
        </form>
      </div>
        <div className="label">
          <h2>Nutritional Information:</h2>
          {nutritionData.map((item, index) => (
            <div key={index}>
              <div className="elem">
                <h3>{item.serving_size_g}g {item.name}</h3>
                <h3>{item.calories} kcal</h3>
              </div>
              <div className="line"></div>

              <div className="elem">
                <h4>Fats</h4>
                <p>{item.fat_total_g} g</p>
              </div>
              <div className="elem">
                <p>of witch saturated</p>
                <p>{item.fat_saturated_g} g</p>
              </div>
              <div className="elem">
                <h4>Proteins</h4>
                <p>{item.protein_g} g</p>
              </div>
              <div className="elem">
                <h4>Carbohydrates</h4>
                <p>{item.carbohydrates_total_g} g</p>
              </div>
              <div className="elem">
                <p>of witch sugars</p>
                <p>{item.sugar_g} g</p>
              </div>
              <div className="elem">
                <h4>Fibers</h4>
                <p>{item.fiber_g} g</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="registerwrapper long">
        <h1>BMI Classes</h1>
        <div className="ll">
        <p>BMI stands for Body Mass Index. It is a measure used to estimate whether a person has a healthy body weight for their height. BMI is calculated by dividing a person's weight in kilograms by the square of their height in meters. The formula for BMI is:</p>
        <img src="https://www.pnbmetlife.com/content/dam/pnb-metlife/images/icons/bmi-calculator/meter.png" alt="" />
        <p>BMI is commonly used by healthcare professionals as a simple screening tool to identify potential weight problems in adults. However, it does have limitations, such as not distinguishing between weight from fat and weight from muscle, bone, or other tissues. Therefore, it's important to interpret BMI alongside other measures and factors when assessing an individual's health status.</p>
        </div>
      </div>
      <div className="program">
      <div className="registerwrapper">
            <h1>How to lose weight</h1>
            <h4>Reduce your recomanded calories intake by 100 to 300 kcal</h4>

            <div className="content-nutri">
            <p className="titlu">1. Set realistic goals:</p>
            <p>Aim for a gradual and steady weight loss of 0.5 to 1 kg per week.</p>

            <p className="titlu">2. Balanced Diet:</p>
            <p>Focus on consuming whole foods like fruits, vegetables, lean proteins, whole grains, and healthy fats.</p>
            <p>Stay hydrated by drinking plenty of water throughout the day.</p>

            <p className="titlu">3. Monitor Progress and Adjust Accordingly:</p>
            <p>Regularly track your weight, body measurements, and fitness levels to assess progress.</p>
            <p>Adjust your diet and exercise routine as needed to overcome plateaus or challenges.</p>
            
            <p className="titlu">4. Avoid Fad Diets and Extreme Measures:</p>
            <p>Steer clear of fad diets or extreme weight loss methods that promise rapid results but are unsustainable or potentially harmful to your health.</p>
            
            <p className="titlu">5. Prioritize Sleep and Stress Management:</p>
            <p>Aim for 7-9 hours of quality sleep per night to support overall health and weight loss.</p>
            <p>Practice stress-reducing techniques such as meditation, deep breathing exercises, or yoga to prevent emotional eating.</p>
            </div>
      </div>



      <div className="registerwrapper">
            <h1>How to gain muscles</h1>
            <h4>Increse your recomanded calories intake by 200 to 500 kcal</h4>
            <div className="content-nutri">
            <p className="titlu">1. Set realistic goals:</p>
            <p>Determine your desired muscle mass and strength goals. Having specific, measurable targets will help you stay focused and motivated.</p>

            <p className="titlu">2. Nutrition:</p>
            <p>Consume about 1.6-2.2 grams of protein per kilogram of body weight daily to support muscle repair and growth.</p>
            <p>Provide energy for workouts and replenish glycogen stores. Opt for complex carbohydrates like whole grains, fruits, and vegetables.</p>
            <p>Essential for hormone production and overall health. Include sources of healthy fats such as avocados, nuts, seeds, and fatty fish.</p>
            
            <p className="titlu">3. Resistance Training:</p>
            <p>Gradually increase the weight or resistance you lift over time to continually challenge your muscles.</p>
            <p>Aim for 3-5 workouts per week, targeting each major muscle group 2-3 times per week with 3-4 sets of 8-12 repetitions per exercise.</p>
            <p>Maintain correct form to maximize muscle activation and prevent injuries.</p>

            <p className="titlu">4. Supplementation:</p>
            <p>Supplement with protein powder if you struggle to meet your protein needs through whole foods alone.</p>
            <p>Consider supplementing with creatine monohydrate to enhance strength and muscle gains.</p>
            </div>
      </div>
      </div>
    </div>
  );
};

export default Nutrition;
