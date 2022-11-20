import React, { useState } from "react";
import Main from "./Main";
import Catalog from "./Catalog";
import { useSelector } from "react-redux";

const Tickets = () => {
  
  const {tickets, searchType} = useSelector((state) => state.ticket)
  const [activeTab, setActiveTab] = useState(searchType);
  return (
    <>
      <Main items={tickets} value={activeTab} setValue={setActiveTab} />
      <Catalog items={tickets} value={activeTab} />
    </>
    
  );
};

export default Tickets;
