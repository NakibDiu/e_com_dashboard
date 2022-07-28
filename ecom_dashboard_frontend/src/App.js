import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UpdateProduct from "./pages/UpdateProduct";
import { useEffect, useState } from "react";
import ProductList from "./pages/ProductList";

function App() {
    const [isLogin, setIsLogin] = useState(false);
    const [search, setSearch] = useState("")

    useEffect(() => {
        if (localStorage.getItem("logged_user")) {
            setIsLogin(true);
        }
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <Header isLogin={isLogin} setSearch= {setSearch}/>
                <Routes>
                    <Route
                        path="/"
                        element={<ProductList isLogin={isLogin} search= {search} />}
                    />
                    <Route
                        path="/add"
                        element={<AddProduct isLogin={isLogin} />}
                    />
                    <Route
                        path="/update/:id"
                        element={<UpdateProduct isLogin={isLogin} />}
                    />
                    <Route
                        path="/register"
                        element={<Register isLogin={isLogin} />}
                    />
                    <Route
                        path="/login"
                        element={<Login isLogin={isLogin} />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
