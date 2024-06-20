"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { is } from "drizzle-orm";
import { Mic } from "lucide-react";
import { StopCircle } from "lucide-react";
import { chatSession } from "@/utils/GeminiAI";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

const Record = ({ interViewQuestions, activeQuestion, interViewData }) => {
  // useSpeechToText hook
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });
  // retrieve the user
  const { user } = useUser();

  const [client, setClient] = React.useState(false);
  const [webcamActive, setWebcamActive] = React.useState(false);
  const [userAnswer, setUserAnswer] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // Check if the client is ready
  React.useEffect(() => {
    setClient(true);
  }, []);

  // Function to start/stop recording
  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  // Update the user answer
  React.useEffect(() => {
    if (results && results.length > 0) {
      results.map((result) =>
        setUserAnswer((prevAnswer) => prevAnswer + result?.transcript)
      );
    }
  }, [results]);

  // Check if the user has answered the question
  React.useEffect(() => {
    // Check if the user has answered the question
    if (!isRecording && userAnswer?.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  // Function to update the user answer
  const UpdateUserAnswer = async () => {
    // console.log("userAnswer: ", userAnswer);
    // setloading true to show the loading spinner
    setLoading(true);
    // feedbackPrompt which will be sent to gemini
    const feedbackPrompt =
      "Question:" +
      interViewQuestions[activeQuestion]?.question +
      ", User Answer:" +
      userAnswer +
      ",Depends on question and user answer for give interview question " +
      " please give us rating for answer and feedback as area of improvmenet if any " +
      "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

    const result = await chatSession.sendMessage(feedbackPrompt);

    // setloading false to hide the loading spinner
    const text = result.response.text();
    console.log("Feedback: ", text);
    setLoading(false);
    const jsonResp = text.replace("```json", "").replace("```", "");
    const parsedResponse = JSON.parse(jsonResp);
    console.log("parsedResponse: ", parsedResponse);
    const res = await db.insert(UserAnswer).values({
      mockIdRef: interViewData.mockInterviewId,
      question: interViewQuestions[activeQuestion]?.question,
      correctAnswer: interViewQuestions[activeQuestion]?.answer,
      userAnswer: userAnswer,
      feedback: parsedResponse?.feedback,
      rating: parsedResponse?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      // moment
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    });
  };
  return (
    <div className=" flex items-center justify-center flex-col">
      <div className=" mt-10 border rounded-lg shadow-md  flex flex-col items-center justify-center p-5 ">
        {!webcamActive && (
          <Image
            src="/webcam.jpeg"
            height="150"
            width="150"
            className="absolute"
            alt="webcam"
          />
        )}
        {client && (
          <Webcam
            mirrored={true}
            onUserMedia={() => setWebcamActive(true)}
            onUserMediaError={() => setWebcamActive(false)}
            style={{
              height: 300,
              width: "100%",
              zIndex: 10,
            }}
          />
        )}
      </div>
      <Button
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
        disabled={loading}
        // Add a conditional statement to check if the user is recording
      >
        {isRecording ? (
          <h2 className="text-red-600 animate-pulse flex gap-2 items-center">
            <StopCircle />
            Stop Recording
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
};

export default Record;
