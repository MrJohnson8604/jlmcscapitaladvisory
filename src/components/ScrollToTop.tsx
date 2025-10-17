import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PropsWithChildren } from "react";

const ScrollToTop = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll the window to the top on every page change
    window.scrollTo(0, 0);
  }, [pathname]); // This effect runs every time the pathname changes

  return children || null;
};

export default ScrollToTop;
