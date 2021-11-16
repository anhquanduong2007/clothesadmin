import React from "react";
import imgBg from "../../assets/img/imgbg.svg";
import {
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Alert,
  AlertTitle,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { getToken, restTokenError } from "../../actions/comom";
const Login = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.comom);
  const ui = useSelector((state) => state.ui);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { UserName, Passwords } = data;
    dispatch(getToken(UserName, Passwords));
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  return (
    <Grid container className="login">
      <Alert
        severity="error"
        className={
          token.errorToken !== "" ? "login-nofication show" : "login-nofication"
        }
      >
        <AlertTitle>Error</AlertTitle>
        Wrong Username or Password —{" "}
        <strong>Please re-enter and turn off this message again</strong>
        <i
          className="bx bx-x login-nofication__icon"
          onClick={() => {
            dispatch(restTokenError());
          }}
        ></i>
      </Alert>
      <Grid item md={7} className="login__imgBg">
        <img src={imgBg} alt="" />
      </Grid>
      <Grid item md={5}>
        <form className="login-wrap" onSubmit={handleSubmit(onSubmit)}>
          <h2>Login to continue</h2>
          <div className="input-group">
            <TextField
              {...register("UserName", { required: true })}
              id="standard-basic"
              label="Username"
              variant="standard"
              className="text-field"
              autoComplete="off"
              placeholder="Enter your Username here"
              size="30"
              error={errors.UserName?.type === "required" ? true : false}
              helperText={
                errors.UserName?.type === "required" && "Username is required"
              }
            />
          </div>
          <div className="input-group">
            <TextField
              {...register("Passwords", { required: true })}
              label="Password"
              variant="standard"
              className="text-field"
              placeholder="Enter your Password here"
              size="30"
              error={errors.Passwords?.type === "required" ? true : false}
              helperText={
                errors.Passwords?.type === "required" && "Username is required"
              }
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <button>
            {ui.showLoadingLogin ? (
              <i className="bx bx-loader-alt bx-spin bx-flip-vertical"></i>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
