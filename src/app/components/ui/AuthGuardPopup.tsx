import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useGuards } from '../../shared/hooks/useGuards';
import AuthPopup from './AuthPopup';

export default function AuthGuardPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { checkAccess } = useGuards();

  useEffect(() => {
    const checkAuth = async () => {
      const hasAccess = await checkAccess(pathname);
      if (!hasAccess) {
        setShowPopup(true);
      }
    };

    checkAuth();
  }, [pathname, checkAccess]);

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleLogin = () => {
    router.push('/auth');
  };

  if (!showPopup) return null;

  return (
    <AuthPopup
      isOpen={showPopup}
      onClose={handleClose}
      onLogin={handleLogin}
      message="Please log in to access this page"
    />
  );
}
