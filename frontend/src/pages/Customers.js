import { useEffect, useState } from "react"
import { json, Link } from "react-router-dom";
import { baseUrl } from "../shared";
import AddCustomer from "../components/AddCustomer";

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

    function onAddCustomer(name, industry){
        const data = {name: name, industry: industry};
        const url = baseUrl + "/api/customers/"

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: json.stringfy(data)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Something went wrong");
                }

                return response.json();
            })
            .then((date) => {
                
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
                    onAddCustomer={onAddCustomer}/>
            </div>
        </>
    )

}