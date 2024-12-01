"use client"; 

import React, { useState, useEffect } from "react"; 
import Card from "../components/Card";
import Counter from "../components/Counter";

export default function Home() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [nopeCount, setNopeCount] = useState(0);
  const [superlikeCount, setSuperlikeCount] = useState(0);
  const [cards, setCards] = useState<any[]>([]); 

  
  useEffect(() => {
    const fetchCards = async () => {
      const query = "react"; 
      const response = await fetch(`https://api.github.com/search/repositories?q=${query}&page=1&per_page=10&sort=stars&order=desc`);
      const data = await response.json();
      setCards(data.items); 
    };

    fetchCards();
  }, []);

  
  const removeCard = (card: { id: number }, swipeType: "like" | "nope" | "superlike") => {
    if (swipeType === "like") {
      setLikeCount((prev) => prev + 1);
    } else if (swipeType === "nope") {
      setNopeCount((prev) => prev + 1);
    } else if (swipeType === "superlike") {
      setSuperlikeCount((prev) => prev + 1);
    }

    
    setActiveCardIndex((prev) => (prev + 1) % cards.length);
  };

  
  const currentCard = cards[activeCardIndex] || {
    name: "Loading...",
    description: "Fetching data...",
    owner: { login: "Unknown" },
    language: "Unknown",
    stargazers_count: 0,
    forks_count: 0,
    html_url: "#",
    avatar_url: "https://avatars.githubusercontent.com/u/0?v=4",
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Swipe the Cards</h1>

      
      <div className="relative w-full max-w-xs">
        <Card card={currentCard} removeCard={removeCard} active={true} />
      </div>

      
      <div className="mt-6 flex justify-center space-x-8 text-black">
        <Counter testid="like-count" label="Likes" count={likeCount} />
        <Counter testid="nope-count" label="Nope" count={nopeCount} />
        <Counter testid="superlike-count" label="Superlikes" count={superlikeCount} />
      </div>

      
      <div className="mt-6 flex justify-center">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none"
          onClick={() => {
            if (activeCardIndex > 0) {
              setActiveCardIndex((prev) => prev - 1);
            }
          }}
        >
          Undo
        </button>
      </div>
    </div>
  );
}
