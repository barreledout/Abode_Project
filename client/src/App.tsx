import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

import Home from "./Pages/Home";
import Faq from "./Pages/Faq";
import HomeEstimate from "./Pages/HomeEstimate/HomeEstimate";
import MarketAnalysis from "./Pages/MarketData/MarketAnalysis";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/home_value_estimator" element={<HomeEstimate />} />
        <Route path="/market_analysis" element={<MarketAnalysis />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
