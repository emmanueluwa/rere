import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [errorStatus, setErrorStatus] = useState();

  useEffect(() => {
    fetch(url)
      .then((res) => {
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

  return [data, errorStatus];
}
