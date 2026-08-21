import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function BackButton() {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/components/button");
  };

  return (
    <button
      type="button"
      className="back-button"
      onClick={goBack}
      aria-label="Go back"
      title="Go back"
    >
      <ArrowLeft size={18} aria-hidden="true" />
      <span>Back</span>
    </button>
  );
}
