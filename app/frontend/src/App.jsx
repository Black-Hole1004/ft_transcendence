import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Tournament from "./pages/Tournament/Tournament";
import Chat from "./pages/Chat/Chat";
import Settings from "./pages/Settings/Settings";
import Profile from "./pages/Profile/Profile";
import Game from "./pages/Game/Game";
function App() {
  return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Game" element={<Game />} />
            <Route path="/Chat" element={<Chat />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Tournament" element={<Tournament />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
