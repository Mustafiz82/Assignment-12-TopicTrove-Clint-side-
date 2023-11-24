import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div>
            <h1>nav</h1>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;