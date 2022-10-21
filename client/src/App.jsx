import { useEffect } from "react";
import DeleteChat from "./components/globals/DeleteChat";
import DeleteContact from "./components/globals/DeleteContact";
import NewContactForm from "./components/globals/NewContactForm";
import Sidebar from "./components/globals/Sidebar";
import VoiceCallModal from "./components/globals/VoiceCallModal";
import Chat from "./pages/Chat";
import UserProfile from "./pages/UserProfile";

function App() {
  // Set app theme
  useEffect(() => {
    const initialMode = JSON.parse(localStorage.getItem("darkMode"));
    document
      .querySelector("html")
      .setAttribute("class", initialMode ? "dark" : "null");
  }, []);

  return (
    <div className="w-screen h-screen flex overflow-hidden bg-primary relative">
      {/* Sidebar to show ChatList, Contacts, Settings Page */}
      <Sidebar />
      <Chat />
      <UserProfile />

      {/* Modals */}
      <DeleteChat />
      <VoiceCallModal />
      <DeleteContact />
      <NewContactForm />
    </div>
  );
}

export default App;
