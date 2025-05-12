import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import * as tmImage from "@teachablemachine/image";
import { useParams } from "react-router-dom";

// 🔥 Word list for practice
const globalWords = [
  "apple", "banana", "cat", "dog", "fish", "grape", "hat", "ice", "jug",
  "kite", "lamp", "moon", "nest", "orange", "pencil", "queen", "rabbit",
  "sun", "tree", "umbrella", "violin", "water", "xylophone", "yacht", "zebra"
];

// 📌 Letter groups for different models
const letterClasses = {
  adf: ["a", "d", "f"],
  begm: ["b", "e", "g", "m"],
  lnst: ["l", "n", "s", "t"],
  rwc: ["r", "w", "c"],
  oyhk: ["o", "y", "h", "k"],
  uqij: ["u", "q", "i", "j"],
  vpxz: ["v", "p", "x", "z"]
};

// 🎨 Styled components
const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.black};
  color: white;
  padding: 5em 2em;
  text-align: center;

  .title {
    font-size: 2.5rem;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .word-box {
    font-size: 2rem;
    margin: 20px 0;
    font-weight: bold;
  }

  .btn {
    padding: 0.5em 1em;
    font-size: 14px;
    background-color: #ebb032;
    cursor: pointer;
    margin: 10px;
    border-radius: 10px;
    &:hover {
      background-color: #000;
      color: #ebb032;
    }
  }
`;

const Model = () => {
  const { modelName } = useParams();
  const [model, setModel] = useState(null);
  const [question, setQuestion] = useState({ word: "", missingLetter: "" });
  const [predictedLetter, setPredictedLetter] = useState("");
  const [countdown, setCountdown] = useState(null); // ⏳ Countdown state
  const webcamRef = useRef(null); // 📷 Webcam reference

  useEffect(() => {
    const loadModel = async () => {
      const URL = `/model/${modelName}/`;
      const modelURL = `${URL}model.json`;
      const metadataURL = `${URL}metadata.json`;

      try {
        const loadedModel = await tmImage.load(modelURL, metadataURL);
        setModel(loadedModel);
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };
    loadModel();
  }, [modelName]);

  const generateQuestion = () => {
    const allowedLetters = letterClasses[modelName] || [];
    const filteredWords = globalWords.filter((word) =>
      word.split("").some((letter) => allowedLetters.includes(letter))
    );

    if (filteredWords.length === 0) {
      setQuestion({ word: "N/A", missingLetter: "" });
      return;
    }

    const randomWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
    const missingLetter = randomWord.split("").find((letter) => allowedLetters.includes(letter));

    setQuestion({
      word: randomWord.replace(missingLetter, "_"),
      missingLetter,
    });
  };

  useEffect(() => {
    generateQuestion();
  }, [modelName]);

  // 🎯 Capture Image and Predict Letter after countdown
  const startCaptureCountdown = () => {
    setCountdown(5); // Start with 5 seconds

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          captureAndPredict(); // Capture after 5 seconds
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const captureAndPredict = async () => {
    if (!model || !webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return alert("Error capturing image");

    const img = new Image();
    img.src = imageSrc;
    img.onload = async () => {
      const predictions = await model.predict(img);
      const bestPrediction = predictions.reduce(
        (max, curr) => (curr.probability > max.probability ? curr : max),
        predictions[0]
      );

      setPredictedLetter(bestPrediction.className);
      
      if (bestPrediction.className === question.missingLetter) {
        alert("✅ Correct!");
      } else {
        alert("❌ Try again!");
      }
    };
  };

  return (
    <Wrapper>
      <div className="title">Letter Prediction Game</div>
      <div className="word-box">Fill in the blank: {question.word}</div>

      <Webcam ref={webcamRef} audio={false} screenshotFormat="image/png" />

      {countdown !== null ? (
        <div className="word-box">⏳ Capturing in {countdown}...</div>
      ) : (
        <button className="btn" onClick={startCaptureCountdown}>📷 Capture & Predict</button>
      )}

      <button className="btn" onClick={generateQuestion}>🔄 Next Question</button>

      {predictedLetter && (
        <div className="word-box">Predicted Letter: {predictedLetter}</div>
      )}
    </Wrapper>
  );
};

export default Model;
