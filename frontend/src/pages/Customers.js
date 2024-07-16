import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { baseUrl } from "../shared";

export default function Customers(){
    const [customers, setCustomers] = useState();

    useEffect(() => {
        const url = baseUrl + "/api/customers/";

        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setCustomers(data.customers);
        });

    }, []);

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
        </>
    )

}