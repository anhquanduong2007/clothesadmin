import { Button, Grid } from "@mui/material";
import React from "react";
import "./style.scss";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ModalProducts from "../../components/ModalProducts";
import { openModalProduct } from "../../actions/ui";
import { getDataProduct,deleteMode,addMode } from "../../actions/products";
import { useSelector, useDispatch } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  console.log(products)
  React.useEffect(() => {
    dispatch(getDataProduct());
  }, [dispatch]);
 
  return (
    <div className="products">
      <ModalProducts />
      <Grid container className="products-navigation">
        <div>
          <i className="bx bx-search"></i>
          <input type="text" placeholder="Search products" />
        </div>
        <Button
          variant="contained"
          color="success"
          endIcon={<ControlPointIcon />}
          onClick={() => {
            dispatch(openModalProduct());
            dispatch(addMode());
          }}
        >
          Thêm mới sản phẩm
        </Button>
      </Grid>
      <Grid container className="products__table">
        <table>
          <thead>
            <tr>
              <th>names</th>
              {/* <th>imagesProducts</th> */}
              <th>detail</th>
              <th>price</th>
              <th>priceNew</th>
              <th>dates</th>
              <th>status</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.dataProducts &&
              products.dataProducts.map((item) => (
                <tr key={item.id}>
                  <td>{item.names}</td>
                  {/* <td>{item.}</td> */}
                  <td>{item.detail}</td>
                  <td>{item.price}</td>
                  <td>{item.priceNew}</td>
                  <td>{item.dates}</td>
                  <td>{item.statuss}</td>
                  <td>
                    <i
                      className="bx bx-info-circle"
                      onClick={() => {
                        dispatch(openModalProduct());
                      }}
                    ></i>
                    <i
                      className="bx bxs-pencil"
                      onClick={() => {
                        dispatch(openModalProduct());
                      }}
                    ></i>
                    <i
                      className="bx bx-x"
                      onClick={() => {
                        dispatch(openModalProduct());
                        dispatch(deleteMode(item.id));
                      }}
                    ></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Grid>
    </div>
  );
};

export default Products;
