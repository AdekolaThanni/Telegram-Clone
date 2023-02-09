import DeleteChat from "./components/globals/DeleteChat";
import DeleteContact from "./components/globals/DeleteContact";
import NewContactForm from "./components/globals/NewContactForm";
import Sidebar from "./components/globals/Sidebar";
import VoiceCallModal from "./components/globals/VoiceCallModal";
import VideoCallModal from "./components/globals/VideoCallModal";
import Authentication from "./pages/Authentication";
import Chat from "./pages/Chat";
import UserProfile from "./pages/UserProfile";
import useInit from "./hooks/useInit";
import Notification from "./components/globals/Notification";
import { useSelector } from "react-redux";
import useAppHeight from "./hooks/useAppHeight";

function App() {
  // Initialize application
  const { loggedIn } = useInit();
  const modalType = useSelector((state) => state.modalReducer.type);
  useAppHeight();

  return (
    <div className="w-full h-full flex overflow-hidden bg-primary relative">
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
      {modalType === "videoCallModal" && <VideoCallModal />}
    </div>
  );
}

export default App;
