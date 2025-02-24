/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const PageName = createContext();

export function usePageName() {
  return useContext(PageName);
}

export function PageNameProvider({ children }) {
  const [pageName, setPageName] = useState(
    () => localStorage.getItem("pageName") || "Dashboard"
  );

  useEffect(() => {
    localStorage.setItem("pageName", pageName);
  }, [pageName]);

  return (
    <>
      <PageName.Provider value={{ pageName, setPageName }}>
        {children}
      </PageName.Provider>
    </>
  );
}
