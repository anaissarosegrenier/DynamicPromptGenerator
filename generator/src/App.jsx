import { useState } from "react";
import './App.css';

export default function App() {
    // Use State Constants //
    const [words, setWords] = useState([]);         // generated words shown in the cloud
    const [kept, setKept] = useState([]);           // words the user kept
    const [sentence, setSentence] = useState([]);   // words assembled into a sentence
    const [prompt, setPrompt] = useState("");       // live text in the input box
    const [pastPrompt, setPastPrompt] = useState(""); // last submitted prompt

    // Placeholder words //
    const fakeWords = ['Hello', 'Goodbye', 'Jack', 'Jill', 'Hill'];


    // Handler, save the prompt, show words, clear the input
    const handleClick = () => {
        setPastPrompt(prompt);
        setWords(fakeWords);
        setPrompt("");
    };

    // Keep a generated word with no duplicates
    const handleKeep = (word) => {
        !kept.includes(word) && setKept([...kept, word]);
    };

    // Add a kept word to the sentence, with duplicates
    const handleSentence = (word) => {
        setSentence([...sentence, word]);
    };

    // GUI //
    return (
        <div className="container">

            {/* Generated words — the cloud */}
            <div className="word-cloud">
                {words.map((word, index) => (
                    <button
                        className="word-btn"
                        style={{ animationDelay: `${index * 0.3}s` }}
                        key={index}
                        onClick={() => handleKeep(word)}
                    >
                        {word}
                    </button>
                ))}
            </div>

            {/* Past prompt — the bubble */}
            {pastPrompt && <div className="prompt-box">
                {pastPrompt}
            </div>}

            {/* Input + Generate, side by side */}
            <div className="input-row">
                <input className="input-box"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Type your idea..."
                />
                <button className="generate-btn" onClick={handleClick}>
                    Generate
                </button>
            </div>

            {/* Compose area — kept words + sentence */}
            <div className="compose-header" >
                Compose
                <div className="compose-area">
                {kept.length > 0 && <div className="kept-words">
                    {kept.map((theWord, index) => (
                        <button
                            className="kept-btn"
                            key={index}
                            onClick={() => handleSentence(theWord)}
                        >
                            {theWord}
                        </button>
                    ))}
                </div>}
                <div className="sentence">
                    {sentence.join(" ")}
                </div>
                </div>
            </div>


        </div>
    );
}