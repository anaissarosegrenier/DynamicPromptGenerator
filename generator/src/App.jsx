import { useState } from "react";
import './App.css';

export default function App() {

    const API_URL = import.meta.env.VITE_API_URL;
    // Use State Constants //
    const [words, setWords] = useState([]);         // generated words shown in the cloud
    const [kept, setKept] = useState([]);           // words the user kept
    const [sentence, setSentence] = useState([]);   // words assembled into a sentence
    const [prompt, setPrompt] = useState("");       // live text in the input box
    const [pastPrompt, setPastPrompt] = useState(""); // last submitted prompt

    // Placeholder words //
    const commonWords = ['He', 'She', 'They', 'His', "Hers", "Theirs", "Ours", "There", "Here", "Go", "Went", "Am", "Was", "Be", "To", "Over"];



    // Handler, save the prompt, show words, clear the input
    const handleClick = async () => {
        setPastPrompt(prompt);
        try {
            const response = await fetch(`${API_URL}/generate`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({idea: prompt}),
            });
            const parseData = await response.json();
            setWords(parseData.words);
        } catch (error) {
            console.error("Generation failed.", error);
        }
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

            <div className="word-cloud">
                {words.map((word, index) => (
                    <button
                        className="word-btn"
                        style={{animationDelay: `${index * 0.3}s`}}
                        key={index}
                        onClick={() => handleKeep(word)}
                    >
                        {word}
                    </button>
                ))}
            </div>

            {pastPrompt && <div className="prompt-box">
                {pastPrompt}
            </div>}


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


            <div >
                <div className="compose-header" >
                    Compose
                </div>
                <div className="common-words" >
                    {commonWords.map((word, index) => (
                        <button
                            className="kept-btn"
                            key={index}
                            onClick={() => handleSentence(word)}
                            >
                            {word}
                        </button>
                        ))}
                </div>
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