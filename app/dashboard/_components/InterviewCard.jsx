import React from "react";

const InterviewCard = ({ props }) => {
  //   console.log(props);
  return (
    <div className=" border shadow-md rounded-lg p-3">
      <p className=" text-sm">{props?.jobDesc}</p>
      <p className=" text-sm">{props?.jobExperience}</p>
    </div>
  );
};

export default InterviewCard;
