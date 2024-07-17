import { useEffect, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom";
import { baseUrl } from "../shared";
import AddCustomer from "../components/AddCustomer";

export default function Customers(){
    const [customers, setCustomers] = useState();
    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const url = baseUrl + "/api/customers/";

        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwtToken")
            }
        })
            .then((response) => {
                if (response.status === 401) {
                    navigate("/login", {
                        state: {
                            previousUrl: location.pathname
                        }
                    });
                }

                return response.json();
            })
            .then((data) => {
                setCustomers(data.customers);
            });

    }, []);

    function toggleShow() {
        setShow(!show);
    }

    function onAddCustomer(name, industry){
        const data = {name: name, industry: industry};
        const url = baseUrl + "/api/customers/"

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Something went wrong");
                }

                return response.json();
            })
            .then((data) => {
                setCustomers([...customers, data.customer]);
                toggleShow();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <>
            <h1>Here are our customers:</h1>
            <ul>

                {customers ? customers.map((customer) => {
                    return (
                        <li
                            key={customer.id}>
                            <div
                                className="flex">

                                <p>
                                    <Link to={'/customers/' + customer.id}>{customer.name}</Link>
                                </p>
                            </div>
                        </li>
                    );
                }) : ''}
            </ul>

            <div className="d-flex justify-content-center">
                <AddCustomer
                    show={show}
                    toggleShow={toggleShow}
                    onAddCustomer={onAddCustomer}/>
            </div>
        </>
    )

}