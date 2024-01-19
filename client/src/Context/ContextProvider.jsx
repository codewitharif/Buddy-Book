import React, { createContext, useState } from "react";

export const addata = createContext("");
export const updatedata = createContext("");
export const deldata = createContext("");

const ContextProvider = ({ children }) => {
  const [udata, setUdata] = useState("");
  const [updata, setUPdata] = useState("");
  const [dltdata, setDLTdata] = useState("");

  return (
    <addata.Provider value={{ udata, setUdata }}>
      <updatedata.Provider value={{ updata, setUPdata }}>
        <deldata.Provider value={{ dltdata, setDLTdata }}>
          {children}
        </deldata.Provider>
      </updatedata.Provider>
    </addata.Provider>
  );
};

export default ContextProvider;
