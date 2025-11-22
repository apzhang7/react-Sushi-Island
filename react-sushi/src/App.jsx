import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Toast from "./components/Toast";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState("");

  // hide toast after 2s
  if(toast){
    setTimeout(()=>setToast(""), 2000);
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <Cart cart={cart} setCart={setCart}/>
        {toast && <Toast message={toast} show={!!toast} />}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu cart={cart} setCart={setCart} setToast={setToast} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
