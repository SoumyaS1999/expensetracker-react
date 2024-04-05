const GetUserDetails = ({ fullName, profileUrl }) => {
    return (
      <div>
        <h3>User Profile</h3>
        <div>
          <strong>Full Name:</strong> {fullName}
        </div>
        <div>
          <strong>Profile Photo URL:</strong> {profileUrl}
        </div>
      </div>
    );
  };
  
  export default GetUserDetails;