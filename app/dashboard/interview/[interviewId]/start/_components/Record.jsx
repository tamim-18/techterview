"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { is } from "drizzle-orm";
import { Mic } from "lucide-react";
import { StopCircle } from "lucide-react";

const Record = () => {
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

  const [client, setClient] = React.useState(false);
  const [webcamActive, setWebcamActive] = React.useState(false);
  const [userAnswer, setUserAnswer] = React.useState("");
  React.useEffect(() => {
    setClient(true);
  }, []);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  React.useEffect(() => {
    if (results && results.length > 0) {
      results.map((result) =>
        setUserAnswer((prevAnswer) => prevAnswer + result?.transcript)
      );
    }
  }, [results]);
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
      <Button variant="outline" className="my-10" onClick={StartStopRecording}>
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
