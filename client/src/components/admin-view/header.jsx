import React from "react";
import { Button } from "@/components/ui/button";
import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser, resetTokenAndCredentials } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ setOpenSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // dispatch(logoutUser()); //if i have any subdomain
    dispatch(resetTokenAndCredentials()); //if i don't have any subdomain
    navigate("/auth/login");
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-background border-b">
      <Button
        onClick={() => setOpenSidebar(true)}
        className="lg:hidden sm:block shadow"
      >
        <AlignJustify size={20} />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button onClick={handleLogout} className="inline-flex gap-2 items-center px-4 py-2 text-sm font-medium shadow ">
          <LogOut size={20} />
          Log Out
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
// hover:bg-black bg-gray-800 text-white