import Menu from "../menu/Menu"

const Layout = ({ children }) => {
    return (
      <div style={{ marginLeft: '310px', marginRight: '40px', marginTop: '35px' }}>
        <Menu />
        {children}
      </div>
    );
  };
  
  export default Layout;