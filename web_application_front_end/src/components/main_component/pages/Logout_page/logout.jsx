import { useHistory } from 'react-router-dom';

function Logout(){

    const history = useHistory();

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    history.push('/');


}

export default Logout;
