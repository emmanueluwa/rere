import "./index.css";
import Influencers from "./pages/Influencers";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/influencers" element={<Influencers />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
