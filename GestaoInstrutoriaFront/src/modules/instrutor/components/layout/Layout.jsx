import Menu from "../../components/menu/Menu"
import './layout.css';

const Layout = ({ children }) => {
    return (
      <div className="layout-menu">
        <Menu />
        {children}
      </div>
    );
  };
  
  export default Layout;