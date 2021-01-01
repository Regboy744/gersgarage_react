import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

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

const address_type = (value) => {
     if (value.length < 3 || value.length > 20) {
          return (
               <div className="alert alert-danger" role="alert">
                    The Address Type must be between 3 and 20 characters.
               </div>
          );
     }
};

const city = (value) => {
     if (value.length < 3 || value.length > 20) {
          return (
               <div className="alert alert-danger" role="alert">
                    The City name must be between 3 and 20 characters.
               </div>
          );
     }
};

const code = (value) => {
     if (value.length < 3 || value.length > 20) {
          return (
               <div className="alert alert-danger" role="alert">
                    The Code must be between 3 and 20 characters.
               </div>
          );
     }
};

const area = (value) => {
     if (value.length < 3 || value.length > 20) {
          return (
               <div className="alert alert-danger" role="alert">
                    The Code must be between 3 and 20 characters.
               </div>
          );
     }
};

export default class AddressRegister extends Component {
     constructor(props) {
          super(props);

          this.handleRegister = this.handleRegister.bind(this);
          this.onChangeAddress_type = this.onChangeAddress_type.bind(this);
          this.onChangeStreet = this.onChangeStreet.bind(this);
          this.onChangeCity = this.onChangeCity.bind(this);
          this.onChangeCode = this.onChangeCode.bind(this);
          this.onChangeArea = this.onChangeArea.bind(this);

          this.state = {
               currentUser: "",
          };
     }

     componentDidMount() {
          UserService.registerAddress().then(
               (response) => {
                    this.setState({
                         address_type: response.data.address_type,
                         street: response.data.street,
                         city: response.data.city,
                         code: response.data.code,
                         area: response.data.area,
                    });
               },
               (error) => {
                    this.setState({
                         content: (error.response && error.response.data) || error.message || error.toString(),
                    });
               }
          );
     }

     onChangeAddress_type(e) {
          this.setState({
               address_type: e.target.value,
          });
     }

     onChangeStreet(e) {
          this.setState({
               street: e.target.value,
          });
     }

     onChangeCity(e) {
          this.setState({
               city: e.target.value,
          });
     }

     onChangeCode(e) {
          this.setState({
               code: e.target.value,
          });
     }

     onChangeArea(e) {
          this.setState({
               area: e.target.value,
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
               UserService.registerAddress(this.state.address_type, this.state.street, this.state.city, this.state.code, this.state.area).then(
                    (response) => {
                         this.setState({
                              message: response.data.message,
                              successful: true,
                         });
                    },
                    (error) => {
                         const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

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
                         <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card" />

                         <Form
                              onSubmit={this.handleRegister}
                              ref={(c) => {
                                   this.form = c;
                              }}
                         >
                              {!this.state.successful && (
                                   <div>
                                        <div className="form-group">
                                             <label htmlFor="address">Address</label>
                                             <Input
                                                  type="text"
                                                  className="form-control"
                                                  name="address_type"
                                                  value={this.state.address_type}
                                                  onChange={this.onChangeAddress_type}
                                                  validations={[required, address_type]}
                                             />
                                        </div>

                                        <div className="form-group">
                                             <label htmlFor="email">Street</label>
                                             <Input
                                                  type="text"
                                                  className="form-control"
                                                  name="street"
                                                  value={this.state.street}
                                                  onChange={this.onChangeStreet}
                                                  validations={[required, address_type]}
                                             />
                                        </div>

                                        <div className="form-group">
                                             <label htmlFor="phone">City</label>
                                             <Input type="text" className="form-control" name="city" value={this.state.city} onChange={this.onChangeCity} validations={[required, city]} />
                                        </div>

                                        <div className="form-group">
                                             <label htmlFor="password">Code</label>
                                             <Input type="text" className="form-control" name="code" value={this.state.code} onChange={this.onChangeCode} validations={[required, code]} />
                                        </div>

                                        <div className="form-group">
                                             <label htmlFor="user_type">Area</label>
                                             <Input type="text" className="form-control" name="area" value={this.state.area} onChange={this.onChangeArea} validations={[required, area]} />
                                        </div>

                                        <div className="form-group">
                                             <button className="btn btn-primary btn-block">Save Changes</button>
                                        </div>
                                   </div>
                              )}

                              {this.state.message && (
                                   <div className="form-group">
                                        <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert" onDurationChange={6000}>
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
