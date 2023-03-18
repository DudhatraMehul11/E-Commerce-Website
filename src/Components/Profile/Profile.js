import React from "react";


function Profile(props) {
  const userData = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="table">
        <h4>Profile Details</h4>
       <div className="shadow-sm m-5" style={{display:"flex", justifyContent:"center"}}>
       <table className="table table-striped">
          <tbody>
            {userData.length > 0 ? userData.map((item) => (
              <>
                <tr>
                  <th scope="col">Name</th>
                  <td>{item.name}</td>
                </tr>
                <tr>
                  <th scope="col">Email</th>
                  <td>{item.email}</td>
                </tr>
                <tr>
                  <th scope="col">Mobile</th>
                  <td>{item.mobile}</td>
                </tr>
                <tr>
                  <th scope="col">PinCode</th>
                  <td>{item.pincode}</td>
                </tr>
                <tr>
                  <th scope="col">City</th>
                  <td>{item.city}</td>
                </tr>
                <tr>
                  <th scope="col">State</th>
                  <td>{item.state}</td>
                </tr>
                <tr>
                  <th scope="col">Full Address</th>
                  <td>{item.address}</td>
                </tr>
                <tr>
                    <td colSpan={2}><button className="btn btn-primary">Update Profile</button></td>
                </tr>
              </>
            )) : ''}  
          </tbody>
        </table>
       </div>
      </div>
  );
}

export default Profile;
