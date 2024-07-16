import { Link, useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import { baseUrl } from "../shared";
import { Button } from "react-bootstrap";

export default function Customer(){
    const { id } = useParams();
    
    const [customer, setCustomer] = useState();
    const [tempCustomer, setTempCustomer] = useState();
    const [notFound, setNotFound] = useState(false);
    const [changed, setChanged] = useState(false);

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
                setTempCustomer(data.customer);
            })
            .catch((e) => {
                console.log(e.message)
            });
    }, []);

    useEffect(() => {
        if (!customer || !tempCustomer) {
            return;
        }

        setChanged(
            customer.name !== tempCustomer.name ||
            customer.industry !== tempCustomer.industry
        );
    }, [tempCustomer, customer]);

    function deleteCustomer() {
        const url = baseUrl + "/api/customers/" + id;
        fetch(url, 
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Something went wrong");
                }
                
                navigate("/customers");
            })
            .catch((e) => {
                console.log(e);
            });
    }

    function updateCustomer(){
        const url = baseUrl + "/api/customers/" + id;
        fetch(url, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tempCustomer)
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Something went wrong");
                }

                return response.json();
            })
            .then((data) => {
                setCustomer(data.customer);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <>
            {notFound ? <NotFound /> : null}
            {customer ? 
                <div>
                    <input 
                        className="m-2 block px-2"
                        type="text"
                        readOnly={true}
                        value={tempCustomer.id} />

                    <input 
                        className="m-2 block px-2"
                        type="text"
                        value={tempCustomer.name} 
                        onChange={(e) => {
                            setTempCustomer({...tempCustomer, name: e.target.value});
                        }}/>

                    <input 
                        className="m-2 block px-2"
                        type="text"
                        value={tempCustomer.industry}
                        onChange={(e) => {
                            setTempCustomer({...tempCustomer, industry: e.target.value});
                        }}/>
                        {changed ? 
                            <>
                                <Button
                                    className="my-2"
                                    onClick={() => setTempCustomer({...customer})}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    className="m-2"
                                    onClick={updateCustomer}
                                >
                                    Save
                                </Button>
                            </> 
                        : null}
                </div> : 
                null
            }
            <div >
                <Button 
                    variant="danger"
                    onClick={deleteCustomer}>Delete</Button>
                <br />

                <Link to="/customers">Back</Link>
            </div>
        </>
    )
}