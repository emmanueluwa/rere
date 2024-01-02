import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../shared";
import AddCustomer from "../components/AddCustomer";

export default function Customers() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [show, setShow] = useState(false);

  function toggleShow() {
    setShow(!show);
  }

  useEffect(() => {
    console.log("tests");
    const url = baseUrl + "api/customers/";
    fetch(url)
      .then((res) => {
        if (res.status === 401) {
          navigate("/login");
        }
        return res.json();
      })
      .then((data) => {
        setCustomers(data.customers);
      });
  }, []);

  //adding
  function addCustomer(name, industry) {
    const data = { name: name, industry: industry };
    const url = baseUrl + "api/customers/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        //assuming addition of customer was successful,
        //hide modal
        toggleShow();
        //update list
        setCustomers([...customers, data.customer]);
      })
      .catch((e) => console.log(e));
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
