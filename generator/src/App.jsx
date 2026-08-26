import { useState } from "react";
import  './App.css';

export default function App() {
  // Use States for words and kept words //
  const [words, setWords] = useState([]);
  const [kept, setKept] = useState([]);

  // Use state for creating sentence //
  const [sentence, setSentence] = useState([]);

  // Use state for prompt box //
  const [prompt, setPrompt] = useState("");

  // Use state for saving prompt //
  const [pastPrompt, setPastPrompt] = useState("");

  // List of hard code words to change to LLM call //
  const fakeWords = ['Hello', 'Goodbye', 'Jack', "Jill", "Hill"];

  // Handle the click for adding words to kept bucket //
  const handleClick = () => {
    setPastPrompt(prompt);
    setWords(fakeWords);
    setPrompt("");
  }
  const handleKeep = (word) => {
      !kept.includes(word) &&  setKept([...kept, word])
  }

  // Handles the click for creating a sentence with kept words //
  const handleSentence = (word) => {
      setSentence([...sentence, word]);
  }
  return (
      <div className="container">
          <div className ="word-cloud" >
              {words.map((word, index) =>
                  <button className="word-btn" style = {{animationDelay: `${index * 0.3}s`}} key={index} onClick = { () => handleKeep(word)}>{word}  </button>
              )}
          </div>
          <div className="kept-words" >
              {kept.map((theWord, index) =>
                  <button className="kept-btn" key={index} onClick={() => handleSentence(theWord)}>
                      {theWord}
                  </button>
              )}
          </div>

          {sentence.join(" ")}
          {pastPrompt}
        <input value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        <button className="generate-btn" onClick={handleClick} >
          Generate
        </button>




      </div>

  );
}



