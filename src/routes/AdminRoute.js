import {Row, Container, AlertMsg, Col} from "react-bootstrap"
import PublicNavbar from "../pages/PublicNavbar";
import SideMenu from "./SideMenu"
import {Routes, Route} from "react-router"
import ProductDetailPage from "../pages/ProductDetailPage";
import AddProductPage from "../pages/AddProductPage";
import EditProductPage from "../pages/EditProductPage";

const AdminLayout = () => {
    return (
      <>
        <PublicNavbar />
        <Container fluid>
          <Row>
            <Col md={3} lg={2}>
              <SideMenu/>
            </Col>
            <Col md={9} lg={10}>
              <AlertMsg />
              <Routes>
                <Route exact path="/admin/profile" element={<ProfilePage/>} />
                <Route exact path="/admin/products" element={<ProductListPage/>} />
                <Route exact path="/admin/products/:id" element={<ProductDetailPage/>} />
                <Route exact path="/admin/products/add" element={<AddProductPage/>} />
                <Route
                  exact
                  path="/admin/product/edit/:id"
                  element={<EditProductPage/>}
                />
                <Route exact path="/admin/messenger" element={<MessengerPage/>} />
                <Route element={<NotFoundPage/>} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </>
    );
  };