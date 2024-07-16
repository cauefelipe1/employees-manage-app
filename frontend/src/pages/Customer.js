import { Link, useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import { baseUrl } from "../shared";
import { Button, Form } from "react-bootstrap";

export default function Customer(){
    const { id } = useParams();
    
    const navigate = useNavigate();
    
    const [customer, setCustomer] = useState();
    const [tempCustomer, setTempCustomer] = useState();
    const [notFound, setNotFound] = useState(false);
    const [changed, setChanged] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        const url = baseUrl + '/api/customers/' + id;
        fetch(url)
            .then((response) => {
                if (response.status === 404) {
                    setNotFound(true);
                } else if (response.status === 401) {
                    navigate("/login");
                }

                if (!response.ok) {
                    throw new Error("something went wrong.");
                }

                return response.json()
            })
            .then((data) => {
                setCustomer(data.customer);
                setTempCustomer(data.customer);
                setErrorMessage(undefined);
            })
            .catch((e) => {
                setErrorMessage(e.message);
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

    useEffect(() => {
        if (!changed) {
            setErrorMessage(undefined);
        }
    }, [changed]);

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
                setErrorMessage(e.message);
            });
    }

    function updateCustomer(e){
        e.preventDefault();

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
                setErrorMessage(undefined);
                setCustomer(data.customer);
            })
            .catch((e) => {
                setErrorMessage(e.message);
            });
    }

    return (
        <div
            className="p-3">

            {notFound ? <NotFound /> : null}
            {customer ? 
                <div>

                    <Form 
                        id="customerEdit"
                        onSubmit={updateCustomer}
                    >
                        <Form.Label>Id</Form.Label>
                        <Form.Control 
                            type="text"
                            value={tempCustomer.id}
                            readOnly={true}/>
                        <br />

                        <Form.Label>Employee name</Form.Label>
                        <Form.Control 
                            type="text"
                            value={tempCustomer.name}
                            onChange={(e) => {
                                setTempCustomer({...tempCustomer, name: e.target.value});
                            }}/>
                        <br />

                        <Form.Label>Industry</Form.Label>
                        <Form.Control
                            type="text"
                            value={tempCustomer.industry}
                            onChange={(e) => {
                                setTempCustomer({...tempCustomer, industry: e.target.value});
                            }}/>
                        <br />
                    </Form>

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
                    
                    <Button
                        onClick={deleteCustomer}
                        variant="danger"
                    >
                        Delete
                    </Button>
                </div> : 
                null
            }
            <div >
                {errorMessage ? <p>{errorMessage}</p> : null}
                <br />
                <Link to="/customers">
                    <Button>
                        ← Back
                    </Button>
                </Link>
            </div>
        </div>
    )
}