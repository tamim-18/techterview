import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";

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
  React.useEffect(() => {
    setClient(true);
  }, []);
  return (
    <div className=" flex items-center justify-center flex-col">
      <div className=" mt-10 border rounded-lg shadow-md  flex flex-col items-center justify-center p-5 ">
        {!webcamActive && (
          <Image
            src="/webcam.jpeg"
            height="150"
            width="150"
            className="absolute"
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
      <Button variant="outline" className=" mt-10">
        {" "}
        Start Recording
      </Button>
      <h1>Recording: {isRecording.toString()}</h1>
      <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul>
    </div>
  );
};

export default Record;
