import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Spinner, Table, Button } from "react-bootstrap";

const ProductList = ({ isLogin, search }) => {
    const navigate = useNavigate();
    const link = "http://localhost:8000/api/getProducts";
    const [products, setProducts] = useState([]);
    const [immutableProducts, setImmutableProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getProducts = async () => {
        setIsLoading(true);
        await axios
            .get(link)
            .then((response) => {
                console.log(response.data);
                setProducts(response.data);
                setImmutableProducts(response.data);
                setIsLoading(false);
            })
            .then((error) => {
                console.log(error);
            });
    };

    const searchProduct = async () => {
        setIsLoading(true);
        await axios
            .get(`http://localhost:8000/api/search/${search}`)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => console.log(error));
        setIsLoading(false);
        // console.log(search)
    };

    const handleDeleteButton = async (key) => {
        await axios
            .delete(`http://localhost:8000/api/delete/${key}`)
            .then((response) => {
                console.log(response.data);
                getProducts();
            })
            .then((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        isLogin ? navigate("/") : navigate("/login");
    }, [isLogin, navigate]);

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        searchProduct();
        if (search === "") {
            setProducts(immutableProducts);
        }
    }, [search, immutableProducts]);

    if (isLoading) {
        return (
            <div className="position-absolute bottom-50 end-50">
                <Spinner animation="border" variant="info" />
            </div>
        );
    }

    return (
        <div className="px-5">
            {products.length === 0 ? (
                <div className="d-flex justify-content-center">
                    <h1>No Products to show</h1>
                </div>
            ) : (
                <>
                    <h1 className="text-center pt-3 pb-3">Product List</h1>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Product Name</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => {
                                return (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td className="d-flex justify-content-center align-item-center">
                                            <img
                                                style={{ width: "100px" }}
                                                src={`http://localhost:8000/${product.image_path}`}
                                                alt={product.name}
                                            />
                                        </td>
                                        <td>{product.price}</td>
                                        <td>{product.description}</td>
                                        <td>
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                className="mx-2"
                                                onClick={() =>
                                                    navigate(
                                                        "/update/" + product.id
                                                    )
                                                }
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    handleDeleteButton(
                                                        product.id
                                                    )
                                                }
                                                size="sm"
                                                variant="danger"
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </>
            )}
        </div>
    );
};

export default ProductList;
