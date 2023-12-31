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
        console.log(data);
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
      <Link to="/customers">Go back</Link>
    </>
  );
}
