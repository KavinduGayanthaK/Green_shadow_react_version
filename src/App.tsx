import React from 'react';
import VerticalNav from './component/VerticalNav';


const App: React.FC = () => {
  return (
    <div className="flex">
      <VerticalNav />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold">Main Content</h1>
        {/* Add your main content here */}
      </div>
    </div>
  );
};

export default App;
