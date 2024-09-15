import Sidebar from '@/components/Sidebar';
import React, { ReactNode } from 'react';


interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="flex bg-white forced-colors:bg-white">
            <Sidebar />
            <div className="flex-1 p-5">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;
