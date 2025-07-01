import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from "@/components/common/users/Header";
import Footer from "@/components/common/users/Footer";

interface LayoutConfig {
  showHeader: boolean;
  showFooter: boolean;
  containerClass: string;
}

const MainLayout: React.FC = () => {
  const location = useLocation();
  
  const getLayoutConfig = (pathname: string): LayoutConfig => {
    if (pathname.startsWith('/problem/')) {
      return {
        showHeader: false,
        showFooter: false,
        containerClass: 'h-screen overflow-hidden'
      };
    }
    
    return {
      showHeader: true,
      showFooter: true,
      containerClass: ''
    };
  };
  
  const config = getLayoutConfig(location.pathname);
  
  return (
    <div className={config.containerClass}>
      {config.showHeader && <Header />}
      <main>
        <Outlet />
      </main>
      {config.showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;