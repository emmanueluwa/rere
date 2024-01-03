import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function useFetch(url, { method, headers, body }) {
  const [data, setData] = useState([]);
  const [errorStatus, setErrorStatus] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch(url, {
      method: method,
      headers: headers,
      body: body, //JSON.stringify()
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/login", {
            state: {
              //go back to this page after successful login
              previousUrl: location.pathname,
            },
          });
        }
        if (!res.ok) {
          throw res.status;
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((e) => {
        setErrorStatus(e);
      });
  }, []);

  return { data, errorStatus };
}
