import { Navigate, Outlet } from "react-router-dom";
import { Stack } from '@mui/material';
import SideBar from "./SideBar.jsx";

const DashboardLayout = () => {

//if(!user){
//  return <Navigate to='/auth/login'/>;
//}

  return (
    <Stack direction='row'>
      {/* SideBar */}
      <SideBar />
      <Outlet />
    </Stack>
    
  );
};

export default DashboardLayout;