import React, { Component } from "react";
import axios from "axios";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import UserService from "../../services/user.service";
const USER = JSON.parse(localStorage.getItem("user"));

const required = (value) => {
     if (!value) {
          return (
               <div className="alert alert-danger" role="alert">
                    This field is required!
               </div>
          );
     }
};

const make = (value) => {
     if (value.length < 3 || value.length > 20) {
          return (
               <div className="alert alert-danger" role="alert">
                    The make must be between 3 and 20 characters.
               </div>
          );
     }
};

const model = (value) => {
     if (value.length < 3 || value.length > 20) {
          return (
               <div className="alert alert-danger" role="alert">
                    The model name must be between 3 and 20 characters.
               </div>
          );
     }
};

const year = (value) => {
     if (value.length < 3 || value.length > 20) {
          return (
               <div className="alert alert-danger" role="alert">
                    The year must be between 3 and 20 characters.
               </div>
          );
     }
};

const register = (value) => {
     if (value.length < 3 || value.length > 20) {
          return (
               <div className="alert alert-danger" role="alert">
                    The register must be between 3 and 20 characters.
               </div>
          );
     }
};

const engine = (value) => {
     if (value.length < 3 || value.length > 20) {
          return (
               <div className="alert alert-danger" role="alert">
                    The engine must be between 3 and 20 characters.
               </div>
          );
     }
};

export default class VehiclesEditInfo extends Component {
     constructor(props) {
          super(props);

          this.handleRegister = this.handleRegister.bind(this);
          this.onChangeMake = this.onChangeMake.bind(this);
          this.onChangeModel = this.onChangeModel.bind(this);
          this.onChangeYear = this.onChangeYear.bind(this);
          this.onChangeRegister = this.onChangeRegister.bind(this);
          this.onChangeEngine = this.onChangeEngine.bind(this);

          this.state = {
               currentVehicle: "",
          };
     }

     // CREATE A LIFE CICLE COMPONENT TO REATRIEVE THE DATA FROM THE DATA BASE AND CREATE THE DROPDOWN.

     componentDidMount() {
          axios.get("https://gersgarage-api.herokuapp.com/vehicles/edit/" + this.props.match.params.id + "/" + USER.accessToken + "/" + USER.id)
               .then((response) => {
                    this.setState({
                         vid: this.props.match.params.id,
                         make: response.data.make,
                         model: response.data.model,
                         year: response.data.year,
                         register: response.data.register,
                         engine: response.data.engine,
                    });
               })
               .catch(function (error) {
                    this.setState({
                         content: (error.response && error.response.data) || error.message || error.toString(),
                    });
               });
     }

     onChangeMake(e) {
          this.setState({
               make: e.target.value,
          });
     }

     onChangeModel(e) {
          this.setState({
               model: e.target.value,
          });
     }

     onChangeYear(e) {
          this.setState({
               year: e.target.value,
          });
     }

     onChangeRegister(e) {
          this.setState({
               register: e.target.value,
          });
     }

     onChangeEngine(e) {
          this.setState({
               engine: e.target.value,
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
               UserService.patchVehicles(
                    this.state.vid,
                    this.state.make,
                    this.state.model,
                    this.state.year,
                    this.state.register,
                    this.state.engine
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

          window.location = "/vehicles/list";
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
                                             <label htmlFor="make">Make</label>
                                             <Input
                                                  type="text"
                                                  className="form-control"
                                                  name="make"
                                                  value={this.state.make}
                                                  onChange={this.onChangeMake}
                                                  validations={[required, make]}
                                             />
                                        </div>

                                        <div className="form-group">
                                             <label htmlFor="model">Model</label>
                                             <Input
                                                  type="text"
                                                  className="form-control"
                                                  name="model"
                                                  value={this.state.model}
                                                  onChange={this.onChangeModel}
                                                  validations={[required, model]}
                                             />
                                        </div>

                                        <div className="form-group">
                                             <label htmlFor="year">Year</label>
                                             <Input
                                                  type="text"
                                                  className="form-control"
                                                  name="year"
                                                  value={this.state.year}
                                                  onChange={this.onChangeYear}
                                                  validations={[required, year]}
                                             />
                                        </div>

                                        <div className="form-group">
                                             <label htmlFor="register">register</label>
                                             <Input
                                                  type="text"
                                                  className="form-control"
                                                  name="register"
                                                  value={this.state.register}
                                                  onChange={this.onChangeRegister}
                                                  validations={[required, register]}
                                             />
                                        </div>

                                        <div className="form-group">
                                             <label htmlFor="engine">Engine</label>
                                             <Input
                                                  type="text"
                                                  className="form-control"
                                                  name="engine"
                                                  value={this.state.engine}
                                                  onChange={this.onChangeEngine}
                                                  validations={[required, engine]}
                                             />
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
