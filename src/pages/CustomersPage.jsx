import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../shared";

export default function Customers() {
  const [customers, setCustomers] = useState();

  useEffect(() => {
    console.log("tests");
    const url = baseUrl + "api/customers/";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCustomers(data.customers);
      });
  }, []);

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
    </>
  );
}
