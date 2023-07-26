import NavBar from "../components/NavBar";
import useAuth from "../hooks/useAuth";
import AdminBar from "../components/AdminBar";

function MainHeader() {
  const { user } = useAuth();

  return <>{user && user.role === "admin" ? <AdminBar /> : <NavBar />}</>;
}

export default MainHeader;
