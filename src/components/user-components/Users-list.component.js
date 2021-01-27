import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const User = (props) => (
     <tr>
          <td>{props.user.name}</td>
          <td>{props.user.email}</td>
          <td>{props.user.phone}</td>
          <td>{props.user.user_type}</td>
          <td>
               <Link to={"/user/edit"}>edit</Link>
          </td>
     </tr>
);

class UsersList extends Component {
     constructor(props) {
          super(props);

          this.state = { users: [] };
     }

     // GET ALL PARTS FROM STOCK IN THE DATA BASE AND PUT THEM IN A ARRAY CALLED parts

     componentDidMount() {
          axios.get("https://gers-garage.herokuapp.com/user/all")
               .then((response) => {
                    this.setState({ users: response.data });
               })
               .catch((error) => {
                    console.log(error);
               });
     }

     // FUNCTION THAT GENERATE THE LIST WITH THE MAP LOOPING
     usersList() {
          return this.state.users.map((currentUser) => {
               return <User user={currentUser} deleteUser={this.deleteUser} key={currentUser._id} />;
          });
     }

     render() {
          return (
               <div class="table-responsive">
                    <h3>User List</h3>
                    <table class="table table-striped table-hover">
                         <thead className="thead-light">
                              <tr>
                                   <th>Name</th>
                                   <th>E-mail</th>
                                   <th>Phone</th>
                                   <th>User Type</th>
                                   <th>Edit</th>
                              </tr>
                         </thead>
                         <tbody>{this.usersList()}</tbody>
                    </table>
               </div>
          );
     }
}

export default UsersList;
