import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const onChange = (e) => {
    setEmail(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
    } catch (error) {
      toast.error("Could not send reset mail");
    }
  };
  return (
    <div className="px-6 py-24">
      <div className="text-3xl">Forgot Password</div>

      <div className="container mx-auto max-w-[400px] bg-red-500/30 p-3 h-[300px]">
        <form onSubmit={onSubmit}>
          <input
            className="p-3 w-full mt-2 mb-8 bg-white text-black rounded"
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={onChange}
            id="email"
          />
          <Link to="/login" className="bg-green-700 p-2">
            Sign In
          </Link>

          <div className="my-4">
            <div className="text-green-400">Send Reset Link</div>
            <button className="bg-red-600 py-3 w-full my-6 rounded block">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ForgotPassword;
