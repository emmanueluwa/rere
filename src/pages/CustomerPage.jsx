import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../shared";
import NotFoundPage from "./NotFoundPage";

export default function CustomerPage() {
  const { id } = useParams();

  const [customer, setCustomer] = useState([]);
  //using a copy of the customer to update the customer data
  const [tempCustomer, setTempCustomer] = useState([
    { name: "", industry: "" },
  ]);

  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  const [changed, setChanged] = useState(false);

  /*
  comparing the original to the new values, if the same no api call needs to be made
  - customer vs tempCustomer, object comparison checking name and industry
  - using a boolean flag, assume they are equal, check property
  - - if no match flip the flag and keep "save" and "cancel" buttons
  - - if match keep flag as equal and hide "save" and "cancel" buttons
  */
  useEffect(() => {
    if (!tempCustomer) return;
    if (!customer) return;

    let equal = true;
    if (customer.name !== tempCustomer.name) equal = false;

    if (customer.industry !== tempCustomer.industry) equal = false;

    if (equal) setChanged(false);
  });

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
        setTempCustomer(data.customer);
      });
  }, []);

  function updateCustomer() {
    const url = baseUrl + "api/customers/" + id;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tempCustomer),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setChanged(false);
        console.log(data);
      })
      .catch();
  }

  return (
    <>
      {/* {notFound ? <NotFoundPage /> : null} */}
      {customer ? (
        <div>
          {/* <p className="m-2 block px-2">{tempCustomer.id}</p> */}

          <input
            className="m-2 block px-2"
            type="text"
            value={tempCustomer.name}
            onChange={(e) => {
              setChanged(true);
              setTempCustomer({ ...tempCustomer, name: e.target.value });
            }}
          />
          <input
            className="m-2 block px-2"
            type="text"
            value={tempCustomer.industry}
            onChange={(e) => {
              setChanged(true);
              setTempCustomer({ ...tempCustomer, industry: e.target.value });
            }}
          />
          {changed ? (
            <>
              <button
                className="m-2"
                onClick={(e) => {
                  setTempCustomer({ ...customer });
                  setChanged(false);
                }}
              >
                Cancel
              </button>{" "}
              <button className="m-2" onClick={updateCustomer}>
                Save
              </button>{" "}
            </>
          ) : null}
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
