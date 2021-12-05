import "./Quote.css";
import React, { useState, useEffect, useRef } from "react";

const Quote = () => {
  const [quote, generateQuote] = useState("");
  const [prev, showPrevButton] = useState(false);

  const nextQuote = () => {
    showPrevButton(true);
    randomQuote();
  };

  const randomQuote = () => {
    const random = Math.floor(Math.random() * 101);
    fetch(
      "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json"
    )
      .then((response) => response.json())
      .then((data) => {
        generateQuote(data[random]);
      });
  };

  useEffect(() => {
    randomQuote();
  }, []);

  const prevQuoteRef = useRef();

  useEffect(() => {
    prevQuoteRef.current = quote;
  });

  const prevQuote = prevQuoteRef.current;

  const previousQuote = () => {
    generateQuote(prevQuote);
    showPrevButton(false);
  };

  return (
    <div className="Quote">
      <h2 className="Quote__text">{quote.quote}</h2>
      <p className="Quote__author">{quote.author}</p>
      <div className="Quote__buttons">
        {prev ? (
          <button className="Quote__buttons__prev" onClick={previousQuote}>
            Previous
          </button>
        ) : null}
        <button className="Quote__buttons__new" onClick={nextQuote}>
          New quote
        </button>
      </div>
    </div>
  );
};

export default Quote;
