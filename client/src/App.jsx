import { useEffect } from "react";
import Sidebar from "./components/globals/Sidebar";
import Chat from "./pages/Chat";

function App() {
  // Set app theme
  useEffect(() => {
    const initialMode = JSON.parse(localStorage.getItem("darkMode"));
    document
      .querySelector("html")
      .setAttribute("class", initialMode ? "dark" : "null");
  }, []);

  return (
    <div className="w-screen h-screen flex overflow-hidden bg-primary">
      {/* Sidebar to show ChatList, Contacts, Settings Page */}
      {/* <Sidebar /> */}
      <Chat />
    </div>
  );
}

export default App;
