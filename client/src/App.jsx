import DeleteChat from "./components/globals/DeleteChat";
import DeleteContact from "./components/globals/DeleteContact";
import NewContactForm from "./components/globals/NewContactForm";
import Sidebar from "./components/globals/Sidebar";
import VoiceCallModal from "./components/globals/VoiceCallModal";
import Authentication from "./pages/Authentication";
import Chat from "./pages/Chat";
import UserProfile from "./pages/UserProfile";
import useInit from "./hooks/useInit";
import Notification from "./components/globals/Notification";
import { useSelector } from "react-redux";

function App() {
  // Initialize application
  const { loggedIn } = useInit();
  const modalType = useSelector((state) => state.modalReducer.type);

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

      {/* Notification */}
      <Notification />

      {/* Modals */}
      <DeleteChat />
      <DeleteContact />
      <NewContactForm />

      {modalType === "voiceCallModal" && <VoiceCallModal />}
    </div>
  );
}

export default App;
