import React, { useRef, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetUserDetails from "./GetUserDetails"; // Import the UserProfile component
import { useSelector } from "react-redux";

const ProfileForm = () => {
  const fullNameInputRef = useRef();
  const profileUrlInputRef = useRef();

  const token= useSelector(state=>state.auth.token);
 
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null); // State to hold user details
  //const [isLoading, setIsLoading] = useState(true);
  
  const cancelHandler = () => {
    navigate("/");
  };

  const updateProfile = (event) => {
    event.preventDefault();

    const enteredName = fullNameInputRef.current.value;
    const enteredPhotoURL = profileUrlInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAysHuvFXa07LIxOJi5WvSY-OSNV7r2FZA",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: token,
          displayName: enteredName,
          photoUrl: enteredPhotoURL,
          returnSecureToken: true,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        alert("User details updated");
        fetchUserProfile(); // Fetch user details after updating the profile
      })
      .catch((error) => {
        console.error(error);
      });

    fullNameInputRef.current.value = "";
    profileUrlInputRef.current.value = "";
  };

  const fetchUserProfile = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAysHuvFXa07LIxOJi5WvSY-OSNV7r2FZA",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: token
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        const userDetails = {
          fullName: data.users[0].displayName,
          profileUrl: data.users[0].photoUrl,
        };
        setUserDetails(userDetails);
        //setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        //setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchUserProfile(); // Fetch user details when the component mounts
  },[]);

  
 // if (isLoading) {
 //   return <div>Loading...</div>; // Display a loading message or spinner while loading
 // }

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>Welcome to Expense Tracker !!</h3>
      {token}
      <form>
      <div >
          <label htmlFor="full-name">Full Name</label>
          <input type="text" id="full-name" ref={fullNameInputRef} required />
        </div>
        <div>
          <label htmlFor="photot-url">Profile Photo URL</label>
          <input
            type="text"
            id="photot-url"
            ref={profileUrlInputRef}
            required
          />
        </div>
        <div>
          <button onClick={updateProfile}>
            Update
          </button>
        </div>
      </form>
      <button onClick={cancelHandler}>
        Cancel
      </button>

      {userDetails && (
        <GetUserDetails
          fullName={userDetails.fullName}
          profileUrl={<img src={userDetails.profileUrl} style={{width:"300px",height:"400px"}}></img>}
        />
      )}
    </div>
  );
};

export default ProfileForm;