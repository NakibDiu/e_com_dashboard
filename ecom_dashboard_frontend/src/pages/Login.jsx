import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ isLogin }) => {
    const initialValue = {
        email: "",
        password: "",
    };

    const [data, setData] = useState(initialValue);
    const link = "http://localhost:8000/api/login";
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .post(link, data)
            .then((response) => {
                console.log(response);
                const user = response.data;
                if (user !== "Wrong email or password") {
                    localStorage.setItem("logged_user", JSON.stringify(user));
                    navigate("/add");
                } else {
                    navigate("/login");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        isLogin ? navigate("/") : navigate("/login");
    }, [isLogin, navigate]);

    return (
        <div className="p-5 ">
            <h1 className="text-center pb-2">Log In</h1>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        onChange={(e) => handleInputChange(e)}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => handleInputChange(e)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default Login;
