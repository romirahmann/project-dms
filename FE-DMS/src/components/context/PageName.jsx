/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const PageName = createContext();

export function usePageName() {
  return useContext(PageName);
}

export function PageNameProvider({ children }) {
  const [pageName, setPageName] = useState("Dashboard");

  return (
    <>
      <PageName.Provider value={{ pageName, setPageName }}>
        {children}
      </PageName.Provider>
    </>
  );
}
