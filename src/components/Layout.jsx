import Sidebar from "./Sidebar";
import PropTypes from "prop-types";

function Layout({ children }) {
  return (
    <div className="h-screen w-full bg-white flex flex-col">
      <div className="flex flex-1 h-full">
        <Sidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
