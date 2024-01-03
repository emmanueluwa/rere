import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function useFetch(url, { method, headers, body } = {}) {
  const [data, setData] = useState();
  const [errorStatus, setErrorStatus] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  /*
  invoke on page load
  - soltution: useEffect 
  */
  function request() {
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
  }

  function appendData(newData) {
    //new fetch for new data
    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newData),
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
      .then((d) => {
        //grab object that needs to be added to array
        const submitted = Object.values(d)[0];

        /**
         * do not modify state directly, always use setState
         * duplicate existing state, push new object onto new state
         **/
        const newState = { ...data };
        Object.values(newState)[0].push(submitted);

        //replace existing state with new object, new OBJECT seen as state change
        setData(newState);
      })
      .catch((e) => {
        console.log(e);
        setErrorStatus(e);
      });
  }

  return { request, appendData, data, errorStatus };
}
