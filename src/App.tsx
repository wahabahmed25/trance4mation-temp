import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Game from "./pages/Game";

function App() {
   /** nav bar gradient when user scrolls */
   const nav = document.querySelector(".nav") as HTMLElement;
   window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY;
      const opacity = Math.min(scrollPosition / 350, 1);
      nav.style.backgroundImage = `linear-gradient(to bottom, var(--nav-bg), rgba(255, 255, 255, ${opacity}))`;
   });

   return (
      <div className="App">
         {/* Navigation */}
         <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/game">Game</Link>
            <Link to="/about">About</Link>
         </nav>

         {/* Router to facilitate navigation */}
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/about" element={<About />} />
         </Routes>
      </div>
   );
}

export default App;
