import { Outlet } from 'react-router-dom';
import Nav from '../Pages/User/Home/Nav/Nav';

const MainLayout = () => {
    return (
        <div className='max-w-screen-xl mx-auto'>
            <Nav></Nav>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;