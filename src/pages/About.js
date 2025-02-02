import Base from "../components/Base";
import userContext from "../context/userContext";

const About = () => {
    return (
        <userContext.Consumer>
            {(object) => (
                <Base>
                    <h1>This is the About page</h1>
                    <p>We are building a Blogging Application</p>

                    {/* Add a check to prevent errors when accessing user data */}
                    {console.log(object)}           
                    <h2>Welcome user : {object?.user?.login && object?.user?.data?.user?.name ? object.user.data.user.name : "Guest"}</h2>
                </Base>
            )}
        </userContext.Consumer>
    );
};

export default About;
