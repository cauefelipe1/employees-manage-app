import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { baseUrl } from "../shared";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Form 
            id="loginForm"
            onSubmit={(e) => {
                e.preventDefault();

                const url = baseUrl + "/api/token";
                fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                })
                    .then((response) => {
                        return response.json()
                    })
                    .then((data) => {
                        localStorage.setItem('jwtToken', data.access);
                        localStorage.setItem('Refreshtoken', data.refresh);

                        if (location?.state?.previousUrl) {
                            navigate(location.state.previousUrl);
                        } else {
                            navigate("/customers");
                        }
                        
                    })
            }}
        >
            <Form.Label>Username</Form.Label>
            <Form.Control 
                type="text"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                }}/>
            <br />

            <Form.Label>Password</Form.Label>
            <Form.Control
                type="password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}/>
            <br />

            <Button
                
                type="submit"
            >
                Login
            </Button>
        </Form>
    );
}