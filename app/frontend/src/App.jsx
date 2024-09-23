import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const Home = React.lazy(() => import('./pages/Home/Home'))
const Chat = React.lazy(() => import('./pages/Chat/Chat'))
const Profile = React.lazy(() => import('./pages/Profile/Profile'))
const Settings = React.lazy(() => import('./pages/Settings/Settings'))
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'))
const Tournament = React.lazy(() => import('./pages/Tournament/Tournament'))
const LocalGame = React.lazy(() => import('./pages/Game/LocalGame'))
const RemoteGame = React.lazy(() => import('./pages/Game/RemoteGame'))
const Custom = React.lazy(() => import('./pages/Custom/Custom'))
const LocalGameSetup = React.lazy(() => import('./pages/Game/LocalGameSetup'))
const RemoteGameSetup = React.lazy(() => import('./pages/Game/RemoteGameSetup'))

function App() {
  return (
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Chat' element={<Chat />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/Settings' element={<Settings />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/local-game' element={<LocalGame />} />
          <Route path='/remote-game' element={<RemoteGame />} />
          <Route path='/Custom' element={<Custom />} />
          <Route path='/local-game-setup' element={<LocalGameSetup />} />
          <Route path='/remote-game-setup' element={<RemoteGameSetup />} />
          <Route path='/Tournament' element={<Tournament />} />
        </Routes>
      </React.Suspense>
    </Router>
  )
}

export default App