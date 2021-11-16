import "./style.scss";
const Input = ({ type,label,watch,placeholder, disabled }) => {
  return (
    <div className="wrapper-input">
      <label>{label}</label>
      <input type={type} {...watch} placeholder = {placeholder} disabled = {disabled}/>
    </div>
  );
};

export default Input;
