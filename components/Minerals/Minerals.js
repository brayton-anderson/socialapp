import React from "react";
import Mineral from "./Mineral";

const Minerals = ({ minerals, setMinerals }) => {
  return (
    <>
      {minerals.map((mineral) => (
        <div key={mineral._id}>
          <Mineral mineral={mineral} setMinerals={setMinerals} />
        </div>
      ))}
    </>
  );
};

export default Minerals;
