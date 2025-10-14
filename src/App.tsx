import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Navbar,
  PortfolioDetails,
  Home,
} from "./components";
import { useEffect } from "react";
import { config } from "./constants/config";

const App = () => {
  useEffect(() => {
    if (document.title !== config.html.title) {
      document.title = config.html.title;
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="bg-primary relative z-0">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio/:id" element={<PortfolioDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
