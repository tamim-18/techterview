import React from "react";

const InterviewCard = ({ interview }) => {
  //   console.log(props);
  return (
    <div className=" border shadow-md rounded-lg p-3">
      <p className=" text-sm">{interview?.jobDesc}</p>
      <p className=" text-sm">{interview?.jobExperience}</p>
    </div>
  );
};

export default InterviewCard;
