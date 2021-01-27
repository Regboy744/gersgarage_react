import React, { Component } from "react";
import axios from "axios";

class CreateUser extends Component {
     // CREATE A CONSTRUCTOR
     constructor(props) {
          super(props);

          // BIND THE METHODS TO THIS CLASS

          this.onChangeName = this.onChangeName.bind(this);
          this.onChangeEmail = this.onChangeEmail.bind(this);
          this.onChangePhone = this.onChangePhone.bind(this);
          this.onChangePassword = this.onChangePassword.bind(this);
          this.onChangeUser_type = this.onChangeUser_type.bind(this);
          this.onSubmit = this.onSubmit.bind(this);

          // SET NULL STATE

          this.state = {
               name: "",
               email: "",
               phone: "",
               password: "",
               user_type: "",
               user_types: [],
          };
     }

     // CREATE A LIFE CICLE COMPONENT TO REATRIEVE THE DATA FROM THE DATA BASE AND CREATE THE DROPDOWN.

     componentDidMount() {
          this.setState({
               user_types: ["Customer", "Mechanic"],
               user_type: "Customer",
          });
     }

     // SET THE STATE FOR EACH ITEM INSIDE OF CONSTRUCTOR ( DATA FROM THE FORM)

     onChangeName(e) {
          this.setState({
               name: e.target.value,
          });
     }
     onChangeEmail(e) {
          this.setState({
               email: e.target.value,
          });
     }
     onChangePhone(e) {
          this.setState({
               phone: e.target.value,
          });
     }
     onChangePassword(e) {
          this.setState({
               password: e.target.value,
          });
     }
     onChangeUser_type(e) {
          this.setState({
               user_type: e.target.value,
          });
     }

     // CREATE A SUBMIT BUTTON

     onSubmit(e) {
          e.preventDefault(); // This will to prevent that the form does not do its default behavior and do what we wanto below

          const users = {
               name: this.state.name,
               email: this.state.email,
               phone: this.state.phone,
               password: this.state.password,
               user_type: this.state.user_type,
          };

          axios.post("https://gersgarage-api.herokuapp.com/user/signup", users).then((res) => console.log(res.data));
          console.log(users);

          window.location = "/userlist";
     }

     render() {
          return (
               <div className="container" style={{ maxWidth: "50%" }}>
                    <h3>Create New User</h3>
                    <form onSubmit={this.onSubmit}>
                         <div className="form-group">
                              <label>User Type </label>
                              <select required className="form-control" value={this.state.category} onChange={this.onChangeCategory}>
                                   {this.state.user_types.map(function (user_type) {
                                        return (
                                             <option key={user_type} value={user_type}>
                                                  {user_type}
                                             </option>
                                        );
                                   })}
                              </select>
                         </div>

                         <div className="form-group">
                              <label>Username </label>
                              <input type="text" required className="form-control" value={this.state.name} onChange={this.onChangeName} />
                         </div>

                         <div className="form-group">
                              <label>E-mail </label>
                              <input type="text" required className="form-control" value={this.state.email} onChange={this.onChangeEmail} />
                         </div>

                         <div className="form-group">
                              <label>Phone</label>
                              <input type="text" className="form-control" value={this.state.phone} onChange={this.onChangePhone} />
                         </div>

                         <div className="form-group">
                              <label>Password</label>
                              <input type="text" className="form-control" value={this.state.password} onChange={this.onChangePassword} />
                         </div>

                         <div className="form-group">
                              <input type="submit" value="Sign Up" className="btn btn-primary" />
                         </div>
                    </form>
               </div>
          );
     }
}

export default CreateUser;
