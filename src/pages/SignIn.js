import classes from "./SignUp.module.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useUserContext } from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";
export function SignIn() {
  const [emailRef, passwordRef] = [useRef(null), useRef(null)];
  const { setLogged, setEmail } = useUserContext();
  const navigate = useNavigate();
  const signin = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      setLogged(true);
      setEmail(emailRef.current.value);
      navigate("/");
    } catch (err) {
      toast("Something went wrong");
    }
  };
  return (
    <div className={classes.container}>
      <div>
        <form className={classes.form} onSubmit={signin}>
          <h1 className={classes.heading}>Sign In</h1>
          <input
            type="text"
            placeholder="Enter Email"
            required
            ref={emailRef}
          />
          <input
            type="password"
            placeholder="Enter Password"
            required
            minLength={6}
            ref={passwordRef}
          />
          <button type="submit" className={classes.button}>
            Sign In
          </button>
        </form>
        <Link class={classes.link} to={"/signup"}>
          Or SignUp instead
        </Link>
      </div>
    </div>
  );
}
