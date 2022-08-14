import React, { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
const Account = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  const onLogout = () => {
    auth.signOut();
    navigate("/");
    toast.success("Successfully logged out");
  };
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      toast.error("Could not update profile details");
    }
  };
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="px-6 py-24">
      <div className="flex justify-between">
        <div className="text-2xl">My Profile</div>
        <button
          type="button"
          className="bg-red-600 px-6 py-2 rounded text-white"
          onClick={onLogout}
        >
          Log Out
        </button>
      </div>
      <div className="flex justify-between mt-10">
        <div className="text-xl">Personal Details</div>
        <button
          className="cursor-pointer text-green-400"
          onClick={() => {
            changeDetails && onSubmit();
            setChangeDetails((prev) => !prev);
          }}
        >
          {changeDetails ? "Done" : "Change"}
        </button>
      </div>

      <form className="flex-col">
        <input
          type="text"
          id="name"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          disabled={!changeDetails}
          value={name}
          onChange={onChange}
        />
        <input
          type="email"
          id="name"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          disabled={!changeDetails}
          value={email}
          onChange={onChange}
        />
      </form>
    </div>
  );
};

export default Account;
