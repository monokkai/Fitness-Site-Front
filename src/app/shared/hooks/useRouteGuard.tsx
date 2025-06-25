import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import AuthPopup from "@/app/components/ui/AuthPopup";

export const useRouteGuard = () => {
  const isAuthenticated = useAuth();
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuthPopup(true);
    }
  }, [isAuthenticated]);

  return {
    isAuthorized: isAuthenticated,
    AuthPopupComponent: showAuthPopup ? <AuthPopup /> : null,
  };
};
