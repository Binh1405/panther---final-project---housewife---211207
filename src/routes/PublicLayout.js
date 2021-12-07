import { Routes, Route } from "react-router";
import AddProductPage from "../pages/AddProductPage";
import Homepage from "../pages/Homepage";
import LoginPage from "../pages/LoginPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import PublicNavbar from "../pages/PublicNavbar";
import RegisterPage from "../pages/RegisterPage";
import PrivateRoute from "./PrivateRoute";
import {Container} from "react-bootstrap"
import EditProductPage from "../pages/EditProductPage";
import NotFoundPage from "../pages/NotFoundPage";

const PublicLayout = () => {
    return (
      <>
        <PublicNavbar />
        <Container>
          <Routes>
            <Route exact path="/" element={<Homepage/>} />
            <Route exact path="/login" element={<LoginPage/>} />
            <Route exact path="/register" element={<RegisterPage/>} />
            <Route exact path="/products/:id" element={<ProductDetailPage/>} />
            <PrivateRoute exact path="/product/add" element={<AddProductPage/>} />
            <PrivateRoute
              exact
              path="/product/edit/:id"
              element={<EditProductPage/>}
            />
            <Route element={<NotFoundPage/>} />
          </Routes>
        </Container>
      </>
    );
  };