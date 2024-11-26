import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import OauthHandler from './utils/OauthHandler';
import ComponentPath from './utils/ComponentPath';
import { AlertProvider } from './components/AlertContext';

const Home = lazy(() => import('./pages/Home/Home'));
const Chat = lazy(() => import('./pages/Chat/Chat'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const Settings = lazy(() => import('./pages/Settings/Settings'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const Tournament = lazy(() => import('./pages/Tournament/Tournament'));
const LocalGame = lazy(() => import('./pages/Game/LocalGame'));
const RemoteGame = lazy(() => import('./pages/Game/RemoteGame'));
const Custom = lazy(() => import('./pages/Custom/Custom'));
const LocalGameSetup = lazy(() => import('./pages/Game/LocalGameSetup'));
const RemoteGameSetup = lazy(() => import('./pages/Game/RemoteGameSetup'));
const MatchMaking = lazy(() => import('./components/Game/MatchMaking'));

function App() {
  return (
    <Router>
      <AlertProvider>
        <AuthProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <OauthHandler />
            <ComponentPath />
          </Suspense>
        </AuthProvider>
      </AlertProvider>
    </Router>
  );
}

export default App;
