import "./index.css";
import InfluencersPage from "./pages/InfluencersPage";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/influencers" element={<InfluencersPage />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
