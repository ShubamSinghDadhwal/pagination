import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

export const useRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  return {
    location,
    searchParams,
    navigate,
  };
};
