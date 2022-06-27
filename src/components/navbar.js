import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <Link to="/">Startpage</Link>
        <Link to="/notes">Notes</Link>
        <Link to="/gallery">Gallery</Link>
      </div>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
