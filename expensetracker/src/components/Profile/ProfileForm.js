import React, { useRef, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetUserDetails from "./GetUserDetails"; 
import { useSelector } from "react-redux";
import "./ProfileForm.css";

const ProfileForm = () => {
  const fullNameInputRef = useRef();
  const profileUrlInputRef = useRef();
  const dobInputRef=useRef();

  const token = useSelector((state) => state.auth.token);

  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null); // State to hold user details
  

  const cancelHandler = () => {
    navigate("/");
  };

  const updateProfile = (event) => {
    event.preventDefault();

    const enteredName = fullNameInputRef.current.value;
    const enteredPhotoURL = profileUrlInputRef.current.value;
    const enteredDob= dobInputRef.current.value;

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
          dateOfBirth: enteredDob,
          returnSecureToken: true,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("User details updated");
        fetchUserProfile(); 
      })
      .catch((error) => {
        console.error(error);
      });

    fullNameInputRef.current.value = "";
    profileUrlInputRef.current.value = "";
    dobInputRef.current.value="";
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
          idToken: token,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        const userDetails = {
          fullName: data.users[0].displayName,
          profileUrl: data.users[0].photoUrl,
          dateOfBirth:data.users[0].dob
        };
        setUserDetails(userDetails);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchUserProfile(); 
  }, []);



  return (
    <div
      style={{
        display: "flex",
        minWidth: "300px",
        justifyContent: "center",
        margin:'auto',
        alignItems: "center",
        textAlign: "center",
        
      }}
    >
      <div style={{ 
        margin: "auto", padding: "20px" }}>
        <form
          className="formexpense"
          style={{
             //border: "2px solid red",
            // margin:'auto auto',
            padding: "2%",
          }}
        >
          <div class="title">Welcome</div>
          <div class="subtitle">Update Your Profile Here</div>
          <div class="input-container ic1">
            <input
              type="text"
              id="full-name"
              class="input"
              ref={fullNameInputRef}
              placeholder="Full Name"
              required
            />
          </div>
          <div class="input-container ic1">
            <input
              type="date"
              class="input"
              ref={dobInputRef}
              placeholder="Date of Birth"
              required
            />
          </div>
          <div class="input-container ic1">
            <input
              class="input"
              type="text"
              id="photot-url"
              ref={profileUrlInputRef}
              placeholder="Photo-url"
              required
            />
          </div>
          <div>
            <button onClick={updateProfile} class="submit">
              Update
            </button>
            <button class="submit" onClick={cancelHandler}>
              Cancel
            </button>
          </div>
        </form>
      </div>

      <div
        style={{
           //border: "2px solid red",
           minWidth: "300px",
          margin: "auto",
        }}
      >
        {userDetails && (
          <GetUserDetails
            fullName={userDetails.fullName}
            dateofbirth={userDetails.dateOfBirth}
            profileUrl={
              <img
                src={userDetails.profileUrl}
                style={{ width: "100px", height: "150px" }}
              ></img>
            }
          />
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
