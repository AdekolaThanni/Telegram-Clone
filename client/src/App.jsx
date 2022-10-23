import { useEffect } from "react";
import DeleteChat from "./components/globals/DeleteChat";
import DeleteContact from "./components/globals/DeleteContact";
import NewContactForm from "./components/globals/NewContactForm";
import Sidebar from "./components/globals/Sidebar";
import VoiceCallModal from "./components/globals/VoiceCallModal";
import Authentication from "./pages/Authentication";
import Chat from "./pages/Chat";
import UserProfile from "./pages/UserProfile";
import { useSelector } from "react-redux";

function App() {
  // Set app theme
  useEffect(() => {
    const initialMode = JSON.parse(localStorage.getItem("darkMode"));
    document
      .querySelector("html")
      .setAttribute("class", initialMode ? "dark" : "null");
  }, []);

  const loggedIn = useSelector((state) => state.authReducer.loggedIn);

  return (
    <div className="w-screen h-screen flex overflow-hidden bg-primary relative">
      {loggedIn && (
        <>
          {/* Sidebar to show ChatList, Contacts, Settings Page */}
          <Sidebar />
          {/* Chat to show messages */}
          <Chat />
          <UserProfile />
        </>
      )}

      {!loggedIn && <Authentication />}

      {/* Modals */}
      <DeleteChat />
      <VoiceCallModal />
      <DeleteContact />
      <NewContactForm />
    </div>
  );
}

export default App;
