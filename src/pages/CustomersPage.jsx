import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { baseUrl } from "../shared";
import AddCustomer from "../components/AddCustomer";
import { LoginContext } from "../App";
import useFetch from "../hooks/useFetch";

export default function Customers() {
  //checking user is logged in
  const [loggedIn, setLoggedIn] = useContext(LoginContext);

  const location = useLocation();
  const navigate = useNavigate();

  // const [customers, setCustomers] = useState([]);
  const [show, setShow] = useState(false);

  function toggleShow() {
    setShow(!show);
  }

  const url = baseUrl + "api/customers/";
  /*
  request=> original function to get data
  appendData=> new data to append
  - functions that will be returned from useFetch
  */
  const {
    request,
    appendData,
    data: { customers } = {},
    errorStatus,
  } = useFetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
  });

  useEffect(() => {
    request();
  }, []);

  // useEffect(() => {
  //   console.log(
  //     request,
  //     "<--- req",
  //     appendData,
  //     "<<apData!",
  //     customers,
  //     "<--- DATA",
  //     errorStatus,
  //     "<<__Error!"
  //   );
  // });

  //adding a new customer
  function addCustomer(name, industry) {
    appendData({ name: name, industry: industry });

    if (!errorStatus) {
      toggleShow();
    }
  }

  return (
    <>
      <h1>Customers: </h1>
      {customers
        ? customers.map((customer) => {
            return (
              <div className="m-2" key={customer.id}>
                <Link to={/customers/ + customer.id}>
                  <button className="no-underline bg-purple-800 hover:bg-purple-950 text-white font-bold py-2 px-4 rounded">
                    {customer.name}
                  </button>
                </Link>
              </div>
            );
          })
        : null}
      <AddCustomer
        addCustomer={addCustomer}
        show={show}
        toggleShow={toggleShow}
      />
    </>
  );
}
