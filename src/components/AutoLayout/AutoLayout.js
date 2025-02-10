import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import TopMenu from '../TopMenu/TopMenu';
import './AutoLayout.css';

const AutoLayout = ({ children }) => {
  return (
    <div className="auto-layout">
      <div className='sidebar'>
        <Sidebar />
      </div>
      <div className="main-content">
        <div className="menu-top">
          <TopMenu />
        </div>
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AutoLayout;
