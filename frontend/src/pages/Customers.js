import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { baseUrl } from "../shared";
import AddCustomer from "../components/AddCustomer";
import useFetch from "../hooks/UseFetch";

export default function Customers(){
    const [show, setShow] = useState(false);

    const {request, appendData, data: { customers } = {}, errorStatus} = useFetch(
        baseUrl + "/api/customers/", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwtToken")
            }
        });
    
    useEffect(() => {
        request();
    }, []);

    function toggleShow() {
        setShow(!show);
    }

    function onAddCustomer(name, industry){
        appendData({name: name, industry: industry});
        
        if (!errorStatus) {
            toggleShow();
        }
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