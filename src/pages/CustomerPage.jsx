import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { baseUrl } from "../shared";
import NotFoundPage from "./NotFoundPage";
import { LoginContext } from "../App";

export default function CustomerPage() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const { id } = useParams();

  const [customer, setCustomer] = useState([]);
  //using a copy of the customer to update the customer data
  const [tempCustomer, setTempCustomer] = useState([
    { name: "", industry: "" },
  ]);

  const navigate = useNavigate();
  const location = useLocation();

  const [notFound, setNotFound] = useState(false);
  const [changed, setChanged] = useState(false);

  const [error, setError] = useState();

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
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    })
      .then((res) => {
        if (res.status === 404) {
          //method1: redirect to 404 page
          // navigate("/404");
          //method2: render 404 component on this page
          setNotFound(true);
        } else if (res.status === 401) {
          setLoggedIn(false);
          navigate("/login", {
            state: {
              //go back to this page after successful login
              previousUrl: location.pathname,
            },
          });
        }

        if (!res.ok) {
          console.log(res, "response");
          throw new Error("Something went wrong, please try again later.");
        }

        return res.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setTempCustomer(data.customer);
        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);

  function updateCustomer(e) {
    e.preventDefault();
    const url = baseUrl + "api/customers/" + id;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      body: JSON.stringify(tempCustomer),
    })
      .then((res) => {
        if (res.status === 401) {
          setLoggedIn(false);

          navigate("/login", {
            state: {
              //go back to this page after successful login
              previousUrl: location.pathname,
            },
          });
        }

        if (!res.ok) {
          throw new Error("something went wrong");
        }
        return res.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setChanged(false);
        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
      });
  }

  return (
    <div className="p-3">
      {notFound ? <NotFoundPage /> : null}

      {customer ? (
        <div>
          <form
            className="w-full max-w-sm"
            id="customer"
            onSubmit={updateCustomer}
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label for="name">Name</label>
              </div>
              <div className="md:w-3/4">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="name"
                  type="text"
                  value={tempCustomer.name}
                  onChange={(e) => {
                    setChanged(true);
                    setTempCustomer({ ...tempCustomer, name: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label for="industry">Industry</label>
              </div>
              <div className="md:w-3/4">
                <input
                  id="industry"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  value={tempCustomer.industry}
                  onChange={(e) => {
                    setChanged(true);
                    setTempCustomer({
                      ...tempCustomer,
                      industry: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </form>
          {changed ? (
            <div className="mb-2">
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded mr-2 font-bold"
                onClick={(e) => {
                  setTempCustomer({ ...customer });
                  setChanged(false);
                }}
              >
                Cancel
              </button>{" "}
              <button
                form="customer"
                className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded font-bold"
              >
                Save
              </button>{" "}
            </div>
          ) : null}

          {/* function for deleting customer from db */}
          <div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded font-bold"
              onClick={() => {
                const url = baseUrl + "api/customers/" + id;
                fetch(url, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("access"),
                  },
                })
                  .then((res) => {
                    if (res.status === 401) {
                      setLoggedIn(false);

                      navigate("/login", {
                        state: {
                          //go back to this page after successful login
                          previousUrl: location.pathname,
                        },
                      });
                    }

                    if (!res.ok) {
                      throw new Error("Something went wrong");
                    }
                    //if res is okay
                    setError(undefined);
                    navigate("/customers");
                  })
                  .catch((e) => {
                    setError(e.message);
                  });
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ) : null}
      {error ? <p>{error}</p> : null}

      <br />
      <Link to="/customers">
        <button className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded no-underline">
          &lt; Go back
        </button>
      </Link>
    </div>
  );
}
