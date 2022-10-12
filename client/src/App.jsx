import { useEffect } from "react";
import Sidebar from "./components/globals/Sidebar";

function App() {
  // Set app theme
  useEffect(() => {
    const initialMode = JSON.parse(localStorage.getItem("darkMode"));
    document
      .querySelector("html")
      .setAttribute("class", initialMode ? "dark" : "null");
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-message">
      {/* Sidebar to show ChatList, Contacts, Settings Page */}
      <Sidebar />
    </div>
  );
}

export default App;
