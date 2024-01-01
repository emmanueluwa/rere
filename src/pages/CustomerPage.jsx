import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../shared";
import NotFoundPage from "./NotFoundPage";

export default function CustomerPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState([]);

  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const url = baseUrl + "api/customers/" + id;
    fetch(url)
      .then((res) => {
        if (res.status === 404) {
          //redirect to 404 page
          navigate("/404");
          // render 404 component on this page
          // setNotFound(true);
        }
        return res.json();
      })
      .then((data) => {
        setCustomer(data.customer);
      });
  }, []);

  return (
    <>
      {/* {notFound ? <NotFoundPage /> : null} */}
      {customer ? (
        <div>
          <p>{customer.id}</p>
          <p>{customer.name}</p>
          <p>{customer.industry}</p>
        </div>
      ) : null}
      {/* function for deleting customer from db */}
      <button
        onClick={() => {
          const url = baseUrl + "api/customers/" + id;
          fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              if (!res.ok) {
                throw new Error("Something went wrong");
              }
              //if res is okay
              navigate("/customers");
            })
            .catch((e) => console.log(e));
        }}
      >
        Delete
      </button>
      <br />
      <Link to="/customers">Go back</Link>
    </>
  );
}
