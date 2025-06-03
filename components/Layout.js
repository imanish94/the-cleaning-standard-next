import Header from './common/Header';
import Footer from './common/Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header /> 
        {children}
      <Footer />
    </div>
  );
};

export default Layout; 