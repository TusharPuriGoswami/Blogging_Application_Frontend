import Base from "../components/Base";
import userContext from "../context/userContext";
const Services=()=>{
    return(

        <userContext.Consumer>
            {
                (user)=>(
                    <Base>
                    <h2>This is service page : </h2>
                    <h2>Wlcome : {user.user.login && user.user.data.user.name}</h2>
                    </Base>
                )
            }
        </userContext.Consumer>
    );
};
export default Services;