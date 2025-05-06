
import { Link, useNavigate } from "react-router-dom";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

// import MobileNav from "./MobileNav";
import { navLinks } from "../utils";
import useResponsive from "../hooks/useResponsive";
import { ShoppingCart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectTotalCartItems } from "@/redux/reducers/cartReducer";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { logout } from "@/redux/reducers/AuthReducer";
import toast from "react-hot-toast";

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

  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const totalItems = useAppSelector(selectTotalCartItems);
  const user = useAppSelector((state) => state.auth.user);

  const handleLogOut = () => {
        dispatch(logout());
        toast.success("Logged out successfully");
        navigate("/login"); 
  }

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
            <li className="text-sm uppercase tracking-wider text-white">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-sm uppercase tracking-wider text-white">
                    {user.username}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/profile"></Link> Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/orders"></Link> Order
                    </DropdownMenuItem>

                    <DropdownMenuItem className="px-3" onClick={handleLogOut}>
                      <Button>Logout</Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="login">Login</Link>
              )}
            </li>
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
