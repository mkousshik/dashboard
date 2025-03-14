import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { SidebarProvider } from './context/SidebarContext';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import DataAnalysisPage from './pages/DataAnalysisPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Sidebar />
            <main className="transition-all duration-300 ease-in-out" style={{ marginLeft: 'var(--sidebar-width, 64px)' }}>
              <div className="p-8">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/map" element={<MapPage />} />
                  <Route path="/analysis" element={<DataAnalysisPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </div>
            </main>
          </div>
        </Router>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;