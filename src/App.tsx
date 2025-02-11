import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import Footer from "./components/Common/Footer";
import Navbar from "./components/Common/Navbar";
import ContactPage from "./components/Contact/ContactPage";
import AboutPage from "./components/About/AboutPage";
import GoogleAuth from "@/components/Auth/GoogleAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorPage from "./components/Error/ErrorPage";
import { AuthProvider } from "./components/Auth/AuthProvider";
import PrivateRoute from "./components/Auth/PrivateRoute";
import UserPage from "./components/User/UserPage";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/google" element={<GoogleAuth />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/:userId" element={<UserPage />} />
            </Route>
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
