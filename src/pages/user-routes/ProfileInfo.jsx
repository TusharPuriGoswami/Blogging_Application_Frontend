import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import Base from '../../components/Base';
import ViewUserProfile from '../../components/ViewUserProfile';
import userContext from '../../context/userContext';
import { getUser } from '../../services/user-service';

function ProfileInfo() {
  const { user: contextUser } = useContext(userContext); // Get user from context
  const { userId } = useParams(); // Get userId from URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data
    getUser(userId)
      .then((data) => {
        console.log("Fetched User Data:", data);
        setUser(data);
      })
      .catch((error) => console.error("Error fetching user:", error))
      .finally(() => setLoading(false)); // Stop loading once data is fetched
  }, [userId]);

  const userView = () => {
    // Ensure user is available before rendering
    if (!user) {
      return <div>Loading...</div>; // Show loading message if user data is not yet available
    }

    return (
      <Row>
        <Col md={{ size: 6, offset: 3 }}>

        <ViewUserProfile user={user}/>
          
        </Col>
      </Row>
    );
  };

  return <Base>
  {user ? userView() : 'Loading User Data......'}
  </Base>;
}

export default ProfileInfo;
