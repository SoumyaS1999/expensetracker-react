const GetUserDetails = ({ fullName, profileUrl }) => {
    return (
      <div>
        <div class="card text-white bg-primary mb-3" style={{maxWidth: "20rem"}}>
  <div class="card-header">User Profile</div>
  <div class="card-body">
    <h4 class="card-title">{fullName}</h4>
    <p class="card-text">{profileUrl}</p>
  </div>
  </div>

      </div>
    );
  };
  
  export default GetUserDetails;