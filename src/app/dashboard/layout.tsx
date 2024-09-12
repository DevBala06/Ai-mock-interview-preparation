import React, { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="flex bg-white forced-colors:bg-white">
            <Sidebar />
            <div className="flex-1 p-6">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;
