import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "@Components/Header";
import Home from "@Pages/Home";
import SignIn from "@Pages/SignIn";
import SignUp from "@Pages/SignUp";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
