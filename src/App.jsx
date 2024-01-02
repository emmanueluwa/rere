import "./index.css";
import { createContext, useState } from "react";

import InfluencersPage from "./pages/InfluencersPage";
import CustomersPage from "./pages/CustomersPage";
import CustomerPage from "./pages/CustomerPage";

import DictionaryPage from "./pages/DictionaryPage";
import DefinitionPage from "./pages/DefinitionPage";
import NotFoundPage from "./pages/NotFoundPage";

import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

export const LoginContext = createContext();

function App() {
  /* check local storage for an access token
     - could be expired
     - SOLUTION: use refresh token, works? stay logged in : send to "/login"
  */
  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);

  //clear local storage whenever loggedIn === false
  function changeLoggedIn(value) {
    setLoggedIn(value);

    if (value === false) {
      //clears ALL of local storage
      localStorage.clear();
    }
  }

  return (
    <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path="/influencers" element={<InfluencersPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/customers/:id" element={<CustomerPage />} />

            <Route path="/dictionary" element={<DictionaryPage />} />
            <Route path="/dictionary/:search" element={<DefinitionPage />} />

            <Route path="/login" element={<LoginPage />} />

            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Header>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
