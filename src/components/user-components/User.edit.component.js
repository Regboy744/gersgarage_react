import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import UserService from "../../services/user.service";

const required = (value) => {
     if (!value) {
          return (
               <div className="alert alert-danger" role="alert">
                    This field is required!
               </div>
          );
     }
};

const name = (value) => {
     if (value.length < 3 || value.length > 20) {
          return (
               <div className="alert alert-danger" role="alert">
                    The name must be between 3 and 20 characters.
               </div>
          );
     }
};

const email = (value) => {
     if (!isEmail(value)) {
          return (
               <div className="alert alert-danger" role="alert">
                    This is not a valid email.
               </div>
          );
     }
};

const phone = (value) => {
     if (value.length < 3 || value.length > 20) {
          return (
               <div className="alert alert-danger" role="alert">
                    The phone must be between 3 and 20 characters.
               </div>
          );
     }
};

const user_type = (value) => {
     if (value.length < 3 || value.length > 20) {
          return (
               <div className="alert alert-danger" role="alert">
                    The user type must be between 3 and 20 characters.
               </div>
          );
     }
};

export default class UserEditInfo extends Component {
     constructor(props) {
          super(props);
          this.handleRegister = this.handleRegister.bind(this);
          this.onChangeName = this.onChangeName.bind(this);
          this.onChangeEmail = this.onChangeEmail.bind(this);
          this.onChangePhone = this.onChangePhone.bind(this);
          this.onChangePassword = this.onChangePassword.bind(this);
          this.onChangeUser_type = this.onChangeUser_type.bind(this);

          this.state = {
               currentUser: "",
          };
     }

     componentDidMount() {
          UserService.getUserBoard().then(
               (response) => {
                    this.setState({
                         id: response.data._id,
                         name: response.data.name,
                         email: response.data.email,
                         phone: response.data.phone,
                         user_type: response.data.user_type,
                    });
               },
               (error) => {
                    this.setState({
                         content: (error.response && error.response.data) || error.message || error.toString(),
                    });
               }
          );
     }

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

     handleRegister(e) {
          e.preventDefault();

          this.setState({
               message: "",
               successful: false,
          });

          this.form.validateAll();

          if (this.checkBtn.context._errors.length === 0) {
               UserService.patchUser(
                    this.state.id,
                    this.state.name,
                    this.state.email,
                    this.state.phone,
                    this.state.password,
                    this.state.user_type
               ).then(
                    (response) => {
                         this.setState({
                              message: response.data.message,
                              successful: true,
                         });
                    },
                    (error) => {
                         const resMessage =
                              (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                         this.setState({
                              successful: false,
                              message: resMessage,
                         });
                    }
               );
          }
     }

     render() {
          return (
               <div className="col-md-12">
                    <div className="card card-container">
                         {/* <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card" /> */}

                         <Form
                              onSubmit={this.handleRegister}
                              ref={(c) => {
                                   this.form = c;
                              }}
                         >
                              {!this.state.successful && (
                                   <div>
                                        <div className="form-group">
                                             <label htmlFor="name">Name</label>
                                             <Input
                                                  type="text"
                                                  className="form-control"
                                                  name="name"
                                                  value={this.state.name}
                                                  onChange={this.onChangeName}
                                                  validations={[required, name]}
                                             />
                                        </div>

                                        <div className="form-group">
                                             <label htmlFor="email">Email</label>
                                             <Input
                                                  type="text"
                                                  className="form-control"
                                                  name="email"
                                                  value={this.state.email}
                                                  onChange={this.onChangeEmail}
                                                  validations={[required, email]}
                                             />
                                        </div>

                                        <div className="form-group">
                                             <label htmlFor="phone">Phone</label>
                                             <Input
                                                  type="text"
                                                  className="form-control"
                                                  name="phone"
                                                  value={this.state.phone}
                                                  onChange={this.onChangePhone}
                                                  validations={[required, phone]}
                                             />
                                        </div>

                                        <div className="form-group">
                                             <label htmlFor="password">Password</label>
                                             <Input
                                                  type="password"
                                                  className="form-control"
                                                  name="password"
                                                  value={this.state.password}
                                                  onChange={this.onChangePassword}
                                                  validations={[required]}
                                             />
                                        </div>

                                        <div className="form-group">
                                             <label>User Type</label>
                                             <select
                                                  type="text"
                                                  className="form-control"
                                                  disabled="disabled"
                                                  name="user_type"
                                                  value={this.state.user_type}
                                                  onChange={this.onChangeUser_type}
                                                  validations={[required, user_type]}
                                             >
                                                  <option value="customer">Customer</option>
                                                  <option value="mechanic">Mechanic</option>
                                             </select>
                                        </div>

                                        <div className="form-group">
                                             <button className="btn btn-primary btn-block">Save Changes</button>
                                        </div>
                                   </div>
                              )}

                              {this.state.message && (
                                   <div className="form-group">
                                        <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                             {this.state.message}
                                        </div>
                                   </div>
                              )}
                              <CheckButton
                                   style={{ display: "none" }}
                                   ref={(c) => {
                                        this.checkBtn = c;
                                   }}
                              />
                         </Form>
                    </div>
               </div>
          );
     }
}
