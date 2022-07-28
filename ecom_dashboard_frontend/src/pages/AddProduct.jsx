import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const AddProduct = ({ isLogin }) => {
    const link = "http://localhost:8000/api/addProduct";
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("image_path", file);
        for (const value of formData.values()) {
            console.log(value);
        }
        await axios
            .post(link, formData)
            .then((response) => {
                console.log(response);
                window.location.reload()
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const navigate = useNavigate();

    useEffect(() => {
        isLogin ? navigate("/add") : navigate("/login");
    }, [isLogin, navigate]);

    return (
        <div className="container py-4">
            <h1 className="text-center pb-4">Add Product</h1>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Product Name"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Add product Description"
                        style={{ height: "100px" }}
                        name="description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Price"
                        name="price"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Product Image</Form.Label>
                    <Form.Control
                        type="file"
                        name="image_path"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default AddProduct;
