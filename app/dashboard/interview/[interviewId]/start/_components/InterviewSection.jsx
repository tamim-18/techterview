import React from "react";

const InterviewSection = ({ interViewQuestions }) => {
  return (
    interViewQuestions && (
      <div className=" p-5 border rounded-lg my-5">
        <div className="">
          {interViewQuestions.map((question, index) => (
            <div key={index} className=" ">
              <h2 className="font-bold text-xl mb-3">Question {index + 1}</h2>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default InterviewSection;
