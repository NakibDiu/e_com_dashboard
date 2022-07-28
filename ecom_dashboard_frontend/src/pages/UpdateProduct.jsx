import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { Form, Button, Spinner } from "react-bootstrap";

const UpdateProduct = ({ isLogin }) => {
    const { id } = useParams();
    // console.log(id);
    const link = `http://localhost:8000/api/update/${id}?_method=PUT`;

    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState({});
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
        // for (const value of formData.values()) {
        //     console.log(value);
        // }
        await axios
            .post(link, formData)
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`http://localhost:8000/api/product/${id}`)
            .then((response) => {
                setProduct(response.data);
                setName(response.data.name);
                setPrice(response.data.price);
                setDescription(response.data.description);
                setFile(response.data.image_path);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    if (!isLogin) {
        return <Navigate to="/register" />;
    }

    if (isLoading) {
        return (
            <div className="position-absolute bottom-50 end-50">
                <Spinner animation="border" variant="info" />
            </div>
        );
    }

    return (
        <div className="container py-4">
            <h1 className="text-center pb-4">Update Product</h1>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Product Name"
                        name="name"
                        defaultValue={product.name}
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
                        defaultValue={product.description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Price"
                        name="price"
                        defaultValue={product.price}
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
                    <img
                        width={150}
                        className="py-3"
                        src={`http://localhost:8000/${product.image_path}`}
                        alt=""
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        </div>
    );
};

export default UpdateProduct;
