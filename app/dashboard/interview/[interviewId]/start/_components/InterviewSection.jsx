import { LightbulbIcon } from "lucide-react";
import React from "react";

const InterviewSection = ({ interViewQuestions, activeQuestion }) => {
  return (
    interViewQuestions && (
      <div className="p-4 sm:p-5 border rounded-lg my-5 shadow-lg bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {interViewQuestions.map((question, index) => (
            <div
              key={index}
              className={`transition transform hover:scale-105 duration-300 cursor-pointer ${
                activeQuestion == index
                  ? "bg-blue-700 text-blue-200"
                  : "bg-secondary text-blue-400"
              } rounded-lg p-3 shadow-md`}
            >
              <h2 className="text-sm font-semibold mb-2">
                <span className="font-bold">Question {index + 1}</span>
              </h2>
            </div>
          ))}
        </div>
        <div className="mt-8 sm:mt-10 p-4 sm:p-5 bg-gray-50 rounded-lg shadow-inner">
          <h2 className="font-bold text-xl sm:text-2xl my-4 sm:my-5 text-gray-800 animate-pulse">
            Question
          </h2>
          <p className="text-base sm:text-lg text-gray-700">
            {interViewQuestions[activeQuestion]?.question}
          </p>
        </div>
        <div className=" bg-blue-300 border rounded-lg my-4 p-2">
          <h2 className=" flex gap-2">
            <LightbulbIcon />
            <strong>Note:</strong>
          </h2>
          <h2 className=" text-sm font-serif my-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt,
            labore! Mollitia, molestias asperiores libero, accusamus esse
            corporis veniam minima eos aut dicta quidem ex nulla blanditiis
            voluptatum placeat, eligendi labore.
          </h2>
        </div>
      </div>
    )
  );
};

export default InterviewSection;
