import { useRef } from "react";
import classes from "./SignUp.module.css";
import { useUserContext } from "../context/userContext";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export function SignUp() {
  const { setLogged, setEmail } = useUserContext();
  const [emailRef, nameRef, passwordRef] = [
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const navigate = useNavigate();
  const signup = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      setLogged(true);
      setEmail(emailRef.current.value);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use")
        toast("Email already in use");
      else if (err.code === "auth/invalid-email") toast("Invalid email format");
      else toast("Something went wrong!");
    }
  };
  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={signup}>
        <h1 className={classes.heading}>Sign Up</h1>
        <input
          type="text"
          placeholder="Enter Name"
          required
          minLength={5}
          ref={nameRef}
        />
        <input type="text" placeholder="Enter Email" required ref={emailRef} />
        <input
          type="password"
          placeholder="Enter Password"
          required
          minLength={6}
          ref={passwordRef}
        />
        <button type="submit" className={classes.button}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
