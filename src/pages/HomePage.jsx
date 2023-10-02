import React from "react";
import { useLocation } from "react-router-dom";

const HomePage = ({ debts }) => {
  let location = useLocation();
  console.log(location);
  return (
    <section className="sechome">
    <div>
      <h1 className="home-text">The number of debters: {debts.length}</h1>
    </div>
    </section>
  );
};

export default HomePage;
