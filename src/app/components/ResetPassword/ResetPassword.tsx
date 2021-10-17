import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Field,
  Label,
  Button,
  Text,
  Container,
  TextInput,
} from "tailwind-react-ui";
import "./ResetPassword.css";
import { axiosInstance } from "../../utils/axios";

const ResetPassword = () => {
  const history = useHistory();
  let state = {
    password: "",
    confirmPassword: "",
  };
  function handleChange(e: any) {
    let val = e.target.name;
    if (val === "password") {
      state.password = e.target.value;
    } else state.confirmPassword = e.target.value;
  }
  function handleSubmit() {
    if (state.password === state.confirmPassword) {
      toast.success("Password changed succesfully");
    } else toast.error("Password doesn't match,Try again");
  }
  return (
    <div className="wrapper center h-full">
      <Container padding className="loginContainer">
        <div className="header">
          <Text className="text-red-800 text-header">RESET PASSWORD</Text>
        </div>
        <Field>
          <Label>New Password</Label>
          <TextInput
            className="inputField"
            name="password"
            type="password"
            onChange={handleChange}
          />
        </Field>
        <Field className="align-content-center">
          <Label>Confirm Password</Label>
          <TextInput
            className="inputField"
            name="confirmPassword"
            type="password"
            onChange={handleChange}
          />
        </Field>
        <div className="items-center loginBtnContainer">
          <Button
            className="bg-red-800 text-white loginBtn float-right"
            onClick={handleSubmit}
          >
            Reset
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default ResetPassword;
