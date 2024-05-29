import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected({ Component }) {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    console.log(storedUserId);
    if (!storedUserId) {
      navigate("/");
    }
  }, [navigate]);

  return <Component />;
}

export default Protected;
