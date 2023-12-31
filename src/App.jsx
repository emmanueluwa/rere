import "./index.css";
import InfluencersPage from "./pages/InfluencersPage";
import DictionaryPage from "./pages/DictionaryPage";
import DefinitionPage from "./pages/DefinitionPage";

import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/influencers" element={<InfluencersPage />} />
          <Route path="/dictionary" element={<DictionaryPage />} />
          <Route path="/dictionary" element={<DictionaryPage />} />

          <Route path="/definition/:search" element={<DefinitionPage />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
