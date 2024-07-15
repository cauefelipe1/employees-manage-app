import { Link, useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import { baseUrl } from "../shared";

export default function Customer(){
    const { id } = useParams();
    
    const [customer, setCustomer] = useState();
    const [notFound, setNotFound] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const url = baseUrl + '/api/customers/' + id;
        fetch(url)
            .then((response) => {
                if (response.status === 404) {
                    setNotFound(true);

                } else if (response.status === 401) {
                    navigate("/login");

                } else if (response.status === 500) {
                    //setServerError(true);
                }

                if (!response.ok) {
                    //setError(true);

                    throw new Error("something went wrong.");
                }

                return response.json()
            })
            .then((data) => {
                setCustomer(data.customer);
            })
            .catch((e) => {
                console.log(e.message)
            });
    }, []);


    return (
        <>
            {notFound ? <NotFound /> : null}
            {customer ? 
                <div>
                    <p>{customer.id}</p>
                    <p>{customer.name}</p>
                    <p>{customer.industry}</p>
                </div> : 
                null
            }

            <Link to="/customers">Back</Link>
        </>
    )
}