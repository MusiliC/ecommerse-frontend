
import { Link } from "react-router-dom";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";


// import MobileNav from "./MobileNav";
import { navLinks } from "../utils";
import useResponsive from "../hooks/useResponsive";
import { ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { selectTotalCartItems } from "@/redux/reducers/cartReducer";


const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 8,
    border: `2px solid `,
    padding: "0 4px",
    
  },
}));

const PublicHeader = () => {

  const { smaller, larger } = useResponsive();

    const totalItems = useAppSelector(selectTotalCartItems);

  return (
    <header className="flex items-center px-4 h-16 bg-gray-600">
      <div className="max-w-[1240px] flex items-center justify-between w-full gap-5 mx-auto">
        <div className="header-action">
          {/* {smaller.lg && <MobileNav />} */}
          {/* <img src={appLogo} className="h-10" alt="App Logo" /> */}
          <p className="text-sm uppercase tracking-wider text-white">Master</p>
        </div>

        <nav className="flex items-center gap-5">
          <ul className="flex items-center gap-4">
            {larger.lg &&
              navLinks.map((nav, idx) => (
                <li key={idx}>
                  <Link
                    className="text-sm uppercase tracking-wider text-white"
                    to={nav.to}
                  >
                    {nav.label}
                  </Link>
                </li>
              ))}
            <li>
              <Link to="cart">
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={totalItems} className="text-white">
                    <ShoppingCart />
                  </StyledBadge>
                </IconButton>
              </Link>
            </li>
          </ul>

          {smaller.lg && larger.xxs && (
            <Link
              className="text-sm bg-primary uppercase tracking-wider text-white py-2 px-6 rounded-full"
              to={"/sign-in"}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default PublicHeader;
