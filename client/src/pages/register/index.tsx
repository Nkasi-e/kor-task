import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { register } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

interface FormData {
  username?: string;
  email?: string;
}
const RegisterScreen = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { userInfo } = useSelector((store: RootState) => store.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const fieldEntered = formData.username ? "username" : "email";

  // Create form data with only the entered field
  const formDataToSend = {
    [fieldEntered]: formData[fieldEntered],
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formDataToSend);
    if (!formData.username && !formData.email) {
      toast.error("Please enter username or email");
      return;
    }
    if (formData.username && formData.email) {
      toast.error("Please enter either a username or an email! Not Both...");
      return;
    }
    try {
      dispatch(register(formDataToSend)).unwrap();
      toast.success("Account created successfully");
      navigate("/");
    } catch (error: unknown) {
      toast.error(error as string);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof FormData
  ) => {
    setFormData({ ...formData, [fieldName]: event.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">
        Join with either username or email
      </h2>
      <form
        className="flex flex-col items-center space-y-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Username"
          className="border border-gray-300 px-4 py-2 rounded-md"
          value={formData.username}
          onChange={(e) => handleChange(e, "username")}
        />
        <h3>OR</h3>
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 px-4 py-2 rounded-md"
          value={formData.email}
          onChange={(e) => handleChange(e, "email")}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Join
        </button>
      </form>
    </div>
  );
};

export default RegisterScreen;
