import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Customers() {
  const [customers, setCustomers] = useState();

  useEffect(() => {
    console.log("tests");
    fetch("http://localhost:8000/api/customers/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCustomers(data.customers);
      });
  }, []);

  return (
    <>
      <h1>Customers: </h1>
      {customers
        ? customers.map((customer) => {
            return (
              <ul>
                <li>
                  <Link to={/customers/ + customer.id}>{customer.name}</Link>
                </li>
              </ul>
            );
          })
        : null}
    </>
  );
}
