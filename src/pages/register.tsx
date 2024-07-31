import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AppContext } from "../modules/AppContext"; // Adjust the path to your context file
import Spinner from "../components/spinner"; // Ensure you have a Spinner component
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface IFormInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Define your validation schema using Yup
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Register = () => {
  const { registration } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    try {
      await registration(data.username, data.email, data.password);
    } catch (error) {
      console.error("Register failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen p-4">
      <div className="w-full h-full bg-pink-50 rounded-lg flex items-center justify-center">
        <div className="flex flex-col gap-3 lg:w-1/2 md:w-3/4 w-11/12 items-center justify-center">
          <h1 className="text-4xl font-bold">Register</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-1/2 gap-4 flex flex-col"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-md font-semibold">
                Username
              </label>
              <input
                id="username"
                type="text"
                {...register("username")}
                className={`p-2 border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } rounded-md`}
                placeholder="Your username goes here"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-md font-semibold">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className={`p-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md`}
                placeholder="Your email goes here eg.johndoe@gmail.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="password" className="text-md font-semibold">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`p-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md`}
                placeholder="**********"
              />
              <button
                type="button"
                className="absolute right-3 top-11 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 relative">
              <label
                htmlFor="confirmPassword"
                className="text-md font-semibold"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className={`p-2 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded-md`}
                placeholder="**********"
              />
              <button
                type="button"
                className="absolute right-3 top-11 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="flex flex-row">
              <p>Already have an account?</p>
              <Link to="/login" className="text-blue-500 ml-1">
                Sign In!
              </Link>
            </div>
            <button
              type="submit"
              className="p-3 bg-blue-500 text-white rounded-md flex flex-row items-center justify-center"
              disabled={isLoading}
            >
              {isLoading && <Spinner />}
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
