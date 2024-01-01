import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../shared";
import AddCustomer from "../components/AddCustomer";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [show, setShow] = useState(false);

  function toggleShow() {
    setShow(!show);
  }

  useEffect(() => {
    console.log("tests");
    const url = baseUrl + "api/customers/";
    fetch(url)
      .then((res) => res.json())
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
      <ul>
        {customers
          ? customers.map((customer) => {
              return (
                <li key={customer.id}>
                  <Link to={/customers/ + customer.id}>{customer.name}</Link>
                </li>
              );
            })
          : null}
      </ul>
      <AddCustomer
        addCustomer={addCustomer}
        show={show}
        toggleShow={toggleShow}
      />
    </>
  );
}
