import Sidebar from "./components/globals/Sidebar";

function App() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-message">
      {/* Sidebar to show ChatList, Contacts, Settings Page */}
      <Sidebar />
      Hey
    </div>
  );
}

export default App;
