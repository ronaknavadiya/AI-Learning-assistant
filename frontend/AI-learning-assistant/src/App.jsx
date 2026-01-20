import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import NoteFoundPage from "./pages/NotFoundPage";
import FlashCardsListPage from "./pages/Flashcards/FlashCardsListPage";
import DocumentDetailPage from "./pages/Documents/DocumentDetailPage";
import DocumentListPage from "./pages/Documents/DocumentListPage";
import FlashCardPage from "./pages/Flashcards/FlashCardPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const App = () => {
  const isAuthenticated = false;

  const loading = false;
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/documents" element={<DocumentListPage />} />
          <Route path="/documents/:id" element={<DocumentDetailPage />} />
          <Route path="/flashcards" element={<FlashCardsListPage />} />
          <Route path="documents/:id/flashcards" element={<FlashCardPage />} />
          <Route path="quizzes/:quizId" element={<></>} />
          <Route path="quizzes/:quizId/results" element={<></>} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<NoteFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;