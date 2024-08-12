import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function NotFoundPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  });
}
