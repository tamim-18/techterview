import React from "react";
import AddInterview from "./_components/AddInterview";

const Dashboard = () => {
  return (
    <div className="p-10">
      <h2 className=" text-xl font-bold text-emerald-700">
        {" "}
        Ehance Your Interview Experince with TechTerView
      </h2>
      <div className=" grid grid-cols-1 md:grid-cols-3 my-5">
        <AddInterview />
      </div>
    </div>
  );
};

export default Dashboard;
