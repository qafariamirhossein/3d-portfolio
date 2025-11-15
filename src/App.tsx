import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Navbar,
  PortfolioDetails,
  Home,
  Blog,
  GithubFloatButton,
  LinkedInFloatButton,
  // ThemeToggle,
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
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Blog />} />
          <Route path="/portfolio/:id" element={<PortfolioDetails />} />
        </Routes>
        <GithubFloatButton />
        <LinkedInFloatButton />
        {/* <ThemeToggle /> */}
      </div>
    </BrowserRouter>
  );
};

export default App;
