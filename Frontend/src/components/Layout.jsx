import {Outlet} from "react-router-dom";
{/*parte de si queremos meterle algo mas al diseño principal ponerlo aca, tipo un header*/}

function Layout() {
    return (
        <Outlet />
    );
}

export default Layout;