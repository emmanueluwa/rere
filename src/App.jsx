import "./index.css";
import InfluencersPage from "./pages/InfluencersPage";
import CustomersPage from "./pages/CustomersPage";

import DictionaryPage from "./pages/DictionaryPage";
import DefinitionPage from "./pages/DefinitionPage";
import NotFoundPage from "./pages/NotFoundPage";

import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/influencers" element={<InfluencersPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/dictionary" element={<DictionaryPage />} />
          <Route path="/dictionary/:search" element={<DefinitionPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
