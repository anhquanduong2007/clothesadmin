import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { storage } from "../../firebase/config";
import { closeModalProduct, showLoadingAddProduct } from "../../actions/ui";
import {
  resetMode,
  addProduct,
  getFiles,
  deleteFiles,
  deleteProduct
} from "../../actions/products";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper.scss";
import "swiper/modules/pagination/pagination.scss";
import SwiperCore, { Pagination } from "swiper";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Input from "../Input";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
SwiperCore.use([Pagination]);
const statusArr = [
  {
    value: 1,
    label: "Còn hàng",
  },
  {
    value: 0,
    label: "Hết hàng",
  },
];
const ModalProducts = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log("a");
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const products = useSelector((state) => state.products);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    // formState: { errors },
  } = useForm();
  let allImgFile = watch("fileImg");
  const onSubmit = (data) => {
    const { fileImg, names, price, priceNew, detail, status, category } = data;
    const fileImgArr = Object.values(fileImg);
    let urlImg = [];
    fileImgArr.forEach((item) => {
      const random = Math.random();
      const storageRef = ref(storage, `images/${random + item.name}`);
      const uploadTask = uploadBytesResumable(storageRef, item);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          dispatch(showLoadingAddProduct());
        },
        (error) => {},
        async () => {
          const resultUrl = await getDownloadURL(uploadTask.snapshot.ref);
          urlImg.push(resultUrl);
          console.log(urlImg);
          if (urlImg.length === fileImgArr.length) {
            const dataAdd = {
              names,
              price: +price,
              priceNew: +priceNew,
              detail,
              statuss: status,
              groupProductId: category,
              images: urlImg,
            };
            dispatch(addProduct(dataAdd));
          }
        }
      );
    });
  };
  React.useEffect(() => {
    console.log("run");
    if (products.editMode || products.deleteMode) {
      setValue("status", products.dataAction.statuss);
      setValue("names", products.dataAction.names);
      setValue("price", products.dataAction.price);
      setValue("detail", products.dataAction.detail);
      setValue("priceNew", products.dataAction.priceNew);
      setValue("category", products.dataAction.groupProductId);
    } else if (products.addMode) {
      setValue("status", statusArr[0].value);
      setValue("names", "");
      setValue("price", "");
      setValue("detail", "");
      setValue("priceNew", "");
      setValue(
        "category",
        products.groupProducts.length !== 0 ? products.groupProducts[0].id : ""
      );
      setValue("fileImg", "");
    }
  }, [
    products.addMode,
    products.editMode,
    products.deleteMode,
    products.dataAction.statuss,
    setValue,
    products.dataAction.names,
    products.dataAction.price,
    products.dataAction.detail,
    products.dataAction.priceNew,
    products.dataAction.groupProductId,
    products.groupProducts,
  ]);
  React.useEffect(() => {
    console.log("run");
    if (products.editMode || products.deleteMode) {
      let imgResult = [];
      products.dataAction.images.forEach((item) => {
        const img = {
          preview: item,
        };
        imgResult.push(img);
      });
      dispatch(getFiles(imgResult));
    }
  }, [
    products.editMode,
    products.deleteMode,
    products.dataAction.images,
    dispatch,
  ]);
  React.useEffect(() => {
    dispatch(deleteFiles());
    let img = [];
    allImgFile &&
      Object.values(allImgFile).forEach((item) => {
        item.preview = URL.createObjectURL(item);
        img.push(item);
      });
    dispatch(getFiles(img));
    return () => {
      products.files &&
        products.files.forEach((item) => {
          URL.revokeObjectURL(item.preview);
        });
    };
  }, [allImgFile, dispatch]);
  return (
    <>
      <Dialog


        fullWidth={true}
        maxWidth={false}
        open={ui.showModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          dispatch(closeModalProduct());
          dispatch(resetMode());
        }}
        aria-describedby="alert-dialog-slide-description"
        className="modalProducts"
      >
        <form className="modalProducts-form" onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>{"Thêm mới sản phẩm"}</DialogTitle>
          <DialogContent className="modalProducts-content">
            <Input
              disabled={products.deleteMode ? true : false}
              placeholder="Nhập tên sản phẩm"
              type="text"
              label="Tên sản phẩm"
              watch={{ ...register("names", { required: true }) }}
            />
            <label>Chi tiết sản phẩm</label>
            <textarea
              disabled={products.deleteMode ? true : false}
              placeholder="Nhập chi tiết sản phẩm"
              {...register("detail", { required: true })}
            ></textarea>
            <Input
              disabled={products.deleteMode ? true : false}
              placeholder="Nhập giá sản phẩm"
              type="number"
              label="Giá sản phẩm"
              watch={{ ...register("price", { required: true }) }}
            />
            <Input
              disabled={products.deleteMode ? true : false}
              placeholder="Nhập giá mới của sản phẩm"
              type="number"
              label="Giá mới sản phẩm"
              watch={{ ...register("priceNew", { required: true }) }}
            />
            <label>Trạng thái</label>
            <select
              {...register("category", { required: true })}
              disabled={products.deleteMode ? true : false}
            >
              {products.groupProducts.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.names}
                </option>
              ))}
            </select>
            <label>Thể loại</label>
            <select
              {...register("status", { required: true })}
              disabled={products.deleteMode ? true : false}
            >
              {statusArr.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <label className="modalProducts-label">
              <i
                className="bx bx-upload"
                style={{ color: products.deleteMode ? "gray" : "#1da1f2" }}
              ></i>
              <input
                disabled={products.deleteMode ? true : false}
                style={{ display: "none" }}
                className="modalProducts-input"
                type="file"
                multiple
                {...register("fileImg", { required: true })}
              />
            </label>
            {products.files.length !== 0 ? (
              <div className="modalProducts-img">
                <Swiper
                  // direction={"vertical"}
                  slidesPerView={3}
                  mousewheel={true}
                  spaceBetween={20}
                  pagination={{
                    clickable: true,
                  }}
                  className="mySwiper"
                >
                  {products.files &&
                    products.files.map((item, index) => (
                      <SwiperSlide key={index}>
                        <img src={item.preview} alt="" />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                Please Pick Your Photos Here!!!
              </div>
            )}
          </DialogContent>
          <DialogActions className="modalProducts-actions">
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                dispatch(closeModalProduct());
                dispatch(resetMode());
              }}
            >
              Cancel
            </Button>
            {products.deleteMode ? (
              <Button variant="contained" color="success" onClick = {handleClickOpen}>
                Xóa
              </Button>
            ) : products.editMode ? (
              <Button variant="contained" color="success">
                Sửa
              </Button>
            ) : products.addMode ? (
              <Button type="submit" variant="contained" color="success">
                Thêm
              </Button>
            ) : (
              ""
            )}
          </DialogActions>
        </form>
        {ui.loadingAddProduct ? (
          <div className="loadingProduct">
            <div class="loading-action"></div>
          </div>
        ) : (
          ""
        )}
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Bạn có chắc là muốn xóa sản phẩm này??"}
        </DialogTitle>
        <DialogContent>
          
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Thoát
          </Button>
          <Button onClick={() => {
            dispatch(deleteProduct(products.dataAction))
            setOpen(false);
          }} autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalProducts;
