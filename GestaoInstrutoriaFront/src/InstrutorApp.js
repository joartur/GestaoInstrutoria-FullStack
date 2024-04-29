import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/InstrutorPages/HomePage/HomePage';
import CreateService from './pages/InstrutorPages/CreateService/CreateService';
import TablesService from './pages/InstrutorPages/TablesService/TablesService';
import Login from './pages/InstrutorPages/Login/Login';
import Profile from './pages/InstrutorPages/Profile/Profile';
import ViewServices from './pages/InstrutorPages/ViewServices/ViewServices';
import EditService from './pages/InstrutorPages/EditService/EditService';
import NotFound from './pages/InstrutorPages/NotFound/NotFound';
import TestPage from './pages/InstrutorPages/TestPage';
import { DataProvider } from './services/DataContext';
import { ProfileProvider } from './services/ProfileContext';

const InstrutorApp = () => {
  return (
    <DataProvider>
      <ProfileProvider>
        <Router>
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/createService" element={<CreateService />} />
          <Route path="/tables" element={<TablesService />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/viewServices/:id" element={<ViewServices />} />
          <Route path="/editService/:id" element={<EditService />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/testPage" element={<TestPage />} />
          </Routes>
        </Router>
      </ProfileProvider>
    </DataProvider>
  );
};

export default InstrutorApp;