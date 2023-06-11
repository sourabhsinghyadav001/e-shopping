import { useEffect } from "react";
import { useUserContext } from "../context/userContext";
import { Outlet, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
export function SignOut() {
  const { setLogged, setEmail } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    async function logout() {
      const auth = getAuth();
      await signOut(auth);
      setLogged(false);
      setEmail("");
      navigate("/");
    }
    logout();
  }, []);
  return <Outlet />;
}
