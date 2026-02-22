import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

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
import { trackPageView } from "./utils/analytics";

// Component to track page views on route changes
const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

const App = () => {
  useEffect(() => {
    if (document.title !== config.html.title) {
      document.title = config.html.title;
    }
  }, []);

  return (
    <BrowserRouter>
      <PageTracker />
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
