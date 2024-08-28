// import { UserButton } from '@clerk/nextjs'
import Sidebar from '@/components/Sidebar';

const page: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        {/* Main content of the dashboard goes here */}
        <h1 className="text-2xl font-bold">Dashboard Content</h1>
      </div>
    </div>
  );
};

export default page;
