import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected({ Component }) {
  const navigate = useNavigate();

  useEffect(() => {
    const login = sessionStorage.getItem("userId");
    console.log(login);
    if (!login) {
      navigate("/Loginpage");
    }
  }, [navigate]);

  return <Component />;
}

export default Protected;
