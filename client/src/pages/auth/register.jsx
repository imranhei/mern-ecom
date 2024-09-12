import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CommonForm from "../../components/common/form";
import { registerFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const AuthResgister = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(formData)).then(() => navigate("/auth/login"));
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account?
          <Link
            className="font-medium ml-2 text-blue-500 hover:text-blue-600 hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm 
        formControls={registerFormControls}
        buttonText={'Sign Up'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthResgister;
