import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import UserPage from "./components/UserPage";
import HomePage from "./components/HomePage";
import ContactPage from "./components/ContactPage";
import AboutPage from "./components/AboutPage";
import GoogleAuth from "./components/GoogleAuth";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/google" element={<GoogleAuth />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/:userId" element={<UserPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
