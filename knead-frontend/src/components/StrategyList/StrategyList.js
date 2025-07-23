import React, { useEffect, useState } from 'react';
import './StrategyList.css'
import thumbsUpFilled from "../../assets/icons/thumbs-up-filled.png";
import thumbsUpUnfilled from "../../assets/icons/thumbs-up-unfilled.png";

const StrategyList = ({refresh}) => {
  const [strategies, setStrategies] = useState([]);
  // Use a set to store the IDs of liked comments
  const [likedComments, setLikedComments] = useState(new Set());
  
  const handleLikeOrUnlikeComment = (id) => {
    setLikedComments((prev) => {
      // Create a new Set object based on the previous state, since we shouldn't mutate state directly
      const newSet = new Set(prev);
      // If set already has comment id, we want to unlike comment/remove it from set
      if (newSet.has(id)) {
        newSet.delete(id);
      // Otherwise, like the comment and add id to set
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };


  useEffect(() => {
    const fetchStrategies = async () => {
      try {
        const response = await fetch('http://localhost:8000/strategies');
        const data = await response.json();
        setStrategies(data.strategies);
      } catch (error) {
          console.error("Error fetching strategies: ", error);
      };
    }
    fetchStrategies();
  }, [refresh]);
  return (
    <div className="strategies-list">
     <h1>Strategies List</h1>
      {strategies.length === 0 ? (
        <p>No submitted strategies were found.</p>
      ) : (
        <ul className="strategies">
          {strategies.map((strategy, index) => (
            <li key={strategy.id} className="strategy">
              <strong>Strategy {index + 1}</strong>
              <br />
              Title: {strategy.title}
              <br />
              Comment: {strategy.comment}
              <br />
              <button onClick={() => handleLikeOrUnlikeComment(strategy.id)} className="like-button">
                {likedComments.has(strategy.id)
                  ? <img src={thumbsUpFilled} className="like-button-icon" alt="Liked" /> 
                  : <img src={thumbsUpUnfilled} className="like-button-icon" alt="Unliked" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StrategyList;