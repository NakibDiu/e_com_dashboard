import { Navbar, Nav, NavDropdown, NavItem, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
const Header = ({ isLogin, setSearch }) => {
    const handleLogOutButton = () => {
        console.log(isLogin);
        if (isLogin) {
            localStorage.removeItem("logged_user");
            window.location.href = "/register";
        }
    };

    const user = JSON.parse(localStorage.getItem("logged_user"));

    return (
        <div>
            <div className="px-4">
                <Navbar bg="light" variant="light">
                    <Navbar.Brand href="/">Dashboard</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link
                            to="/"
                            className="text-decoration-none px-2 text-dark"
                        >
                            Products List
                        </Link>
                        <Link
                            to="/add"
                            className="text-decoration-none px-2 text-dark"
                        >
                            Add Products
                        </Link>
                        <Link
                            to="/update"
                            className="text-decoration-none px-2 text-dark"
                        >
                            Update Product
                        </Link>

                        <div>
                            <Form.Control
                                size="sm"
                                type="text"
                                placeholder="search"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {!isLogin && (
                            <>
                                <Link
                                    to="/register"
                                    className="text-decoration-none px-2 text-dark"
                                >
                                    Register
                                </Link>
                                <Link
                                    to="/login"
                                    className="text-decoration-none px-2 text-dark"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </Nav>
                    {isLogin && (
                        <Nav>
                            <NavDropdown title={user && user?.name}>
                                <NavItem
                                    onClick={handleLogOutButton}
                                    className="text-center"
                                >
                                    Log Out
                                </NavItem>
                            </NavDropdown>
                        </Nav>
                    )}
                </Navbar>
            </div>
        </div>
    );
};

export default Header;
