import "./index.css";
import { createContext, useState, useEffect } from "react";
import { baseUrl } from "./shared";

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
  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);

  //clear local storage whenever loggedIn === false
  function changeLoggedIn(value) {
    setLoggedIn(value);

    if (value === false) {
      //clears ALL of local storage
      localStorage.clear();
    }
  }

  /* check local storage for an access token
     - could be expired
     - SOLUTION: use refresh token, works? stay logged in : send to "/login"
  */

  /* 
  loop that executes ever couple of mins to get new access and refresh tokens
  - okay as long as this happens more often than the access token expires 
  */
  useEffect(() => {
    function refreshTokens() {
      if (localStorage.refresh) {
        const url = baseUrl + "api/token/refresh/";
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            refresh: localStorage.refresh,
          }),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            localStorage.access = data.access;
            localStorage.refresh = data.refresh;
            setLoggedIn(true);
          });
      }
    }
    const minute = 1000 * 60;
    refreshTokens();
    setInterval(refreshTokens, minute * 3);
  }, []);

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
