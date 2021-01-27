import React, { Component } from "react";
import axios from "axios";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import CheckButton from "react-validation/build/button";
import Textarea from "react-validation/build/textarea";

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

const status = (value) => {
     if (value.length < 3 || value.length > 20) {
          return (
               <div className="alert alert-danger" role="alert">
                    The status must be between 3 and 20 characters.
               </div>
          );
     }
};

const service_type = (value) => {
     if (value.length < 3 || value.length > 20) {
          return (
               <div className="alert alert-danger" role="alert">
                    The serive type name must be between 3 and 20 characters.
               </div>
          );
     }
};

const mechanic_name = (value) => {
     if (value.length < 3 || value.length > 20) {
          return (
               <div className="alert alert-danger" role="alert">
                    The mechanic name must be between 3 and 20 characters.
               </div>
          );
     }
};

const issue_description = (value) => {
     if (value.length < 3 || value.length > 100) {
          return (
               <div className="alert alert-danger" role="alert">
                    The issue description must be between 3 and 20 characters.
               </div>
          );
     }
};

const start_date = (value) => {
     if (value.length < 3 || value.length > 120) {
          return (
               <div className="alert alert-danger" role="alert">
                    The booking date must be between 3 and 20 characters.
               </div>
          );
     }
};

const end_date = (value) => {
     if (value.length < 3 || value.length > 20) {
          return (
               <div className="alert alert-danger" role="alert">
                    The delivery date must be between 3 and 20 characters.
               </div>
          );
     }
};

const service_cost = (value) => {
     if (value.length < 3 || value.length > 20) {
          return (
               <div className="alert alert-danger" role="alert">
                    The cost date must be between 3 and 20 characters.
               </div>
          );
     }
};

export default class ServiceEditInfo extends Component {
     constructor(props) {
          super(props);

          this.handleRegister = this.handleRegister.bind(this);
          this.onChangeStatus = this.onChangeStatus.bind(this);
          this.onChangeServiceType = this.onChangeServiceType.bind(this);
          this.onChangeMechanicName = this.onChangeMechanicName.bind(this);
          this.onChangeIssueDescription = this.onChangeIssueDescription.bind(this);
          this.onChangeStartDate = this.onChangeStartDate.bind(this);
          this.onChangeEndDate = this.onChangeEndDate.bind(this);
          this.onChangeServiceCost = this.onChangeServiceCost.bind(this);

          this.state = {
               status: "",
               service_type: "",
               mechanic_name: "",
               issue_description: "",
               start_date: "",
               end_date: null,
               service_cost: "",
               mechanicsArray: [],
               serviceOrderId: this.props.match.params.id,
               soArray: "",
          };
     }

     // CREATE A LIFE CICLE COMPONENT TO REATRIEVE THE DATA FROM THE DATA BASE AND CREATE THE DROPDOWN.

     componentDidMount() {
          axios.get("https://gers-garage.herokuapp.com/servicesorder/" + this.props.match.params.id + "/" + USER.accessToken + "/" + USER.id)
               .then((response) => {
                    this.setState({
                         status: response.data.status,
                         service_type: response.data.service_type,
                         mechanic_name: response.data.mechanic_name,
                         issue_description: response.data.issue_description,
                         start_date: new Date(response.data.start_date).toLocaleDateString(),
                         // end_date: new Date(response.data.end_date).toLocaleDateString(),
                         service_cost: response.data.service_cost,
                         soArray: response.data,
                    });
               })
               .catch(function (error) {
                    this.setState({
                         content: (error.response && error.response.data) || error.message || error.toString(),
                    });
               });

          axios.get("https://gers-garage.herokuapp.com/user/all")
               .then((response) => {
                    if (response.data.length > 0) {
                         this.setState({
                              mechanicsArray: response.data.map(function (user) {
                                   if (user.user_type === "mechanic") {
                                        return user.name;
                                   }
                              }),
                         });
                    }
               })
               .catch((error) => {
                    console.log(error);
               });
     }

     onChangeStatus(e) {
          this.setState({
               status: e.target.value,
          });
     }
     onChangeServiceType(e) {
          this.setState({
               service_type: e.target.value,
          });
     }

     onChangeMechanicName(e) {
          this.setState({
               mechanic_name: e.target.value,
          });
     }

     onChangeIssueDescription(e) {
          this.setState({
               issue_description: e.target.value,
          });
     }

     onChangeStartDate(e) {
          this.setState({
               start_date: e.target.value,
          });
     }

     onChangeEndDate(e) {
          this.setState({
               end_date: e,
          });
     }

     onChangeServiceCost(e) {
          this.setState({
               service_cost: e.target.value,
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
               UserService.patchServices(
                    this.state.serviceOrderId,
                    this.state.status,
                    this.state.service_type,
                    this.state.mechanic_name,
                    this.state.start_date,
                    this.state.end_date,
                    this.state.service_cost
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

          // window.location = "/vehicles/list";
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
                                             <label>Status</label>
                                             <select
                                                  type="text"
                                                  className="form-control"
                                                  name="user_type"
                                                  value={this.state.status}
                                                  onChange={this.onChangeStatus}
                                             >
                                                  <option value="Booked">Booked</option>
                                                  <option value="In Service">In Service</option>
                                                  <option value="Fixed">Fixed</option>
                                                  <option value="Collected">Collected</option>
                                                  <option value="Unrepairable">Unrepairable</option>
                                             </select>
                                        </div>

                                        <div className="form-group">
                                             <label htmlFor="model">Sertvice Type</label>
                                             <Input
                                                  disabled="disabled"
                                                  type="text"
                                                  className="form-control"
                                                  name="service_type"
                                                  value={this.state.service_type}
                                                  onChange={this.onChangeServiceType}
                                             />
                                        </div>

                                        <div className="form-group">
                                             <label>Mechanic </label>
                                             <select
                                                  ref="userInput"
                                                  required
                                                  className="form-control"
                                                  value={this.state.mechanic_name}
                                                  onChange={this.onChangeMechanicName}
                                                  validations={[required, mechanic_name]}
                                             >
                                                  {this.state.mechanicsArray.map(function (name) {
                                                       return (
                                                            <option key={name} value={name}>
                                                                 {name}
                                                            </option>
                                                       );
                                                  })}
                                             </select>
                                        </div>

                                        <div className="form-group">
                                             <label htmlFor="register">Issue Description</label>
                                             <Textarea
                                                  type="text"
                                                  className="form-control"
                                                  name="issue_description"
                                                  rows="4"
                                                  value={this.state.issue_description}
                                                  onChange={this.onChangeIssueDescription}
                                                  validations={[required, issue_description]}
                                             />
                                        </div>

                                        <div className="form-group">
                                             <label htmlFor="engine">Booking date</label>

                                             <Input
                                                  disabled="disabled"
                                                  type="text"
                                                  className="form-control"
                                                  name="start_date"
                                                  value={this.state.start_date}
                                                  validations={[required, start_date]}
                                                  onChange={this.onChangeStartDate}
                                             />
                                        </div>

                                        <div className="form-group">
                                             <label htmlFor="start_date">Delivere date</label>
                                             {/* <br></br> */}
                                             {new Date(this.state.soArray.end_date).toLocaleDateString()}
                                             <br></br>
                                             <br></br>
                                             <label htmlFor="start_date">Update delivere date</label>
                                             <DatePicker
                                                  type="text"
                                                  className="form-control"
                                                  name="start_date"
                                                  dateFormat="dd/MM/yyyy"
                                                  filterDate={(date) => date.getDay() != 0}
                                                  isClearable
                                                  disableHistory
                                                  minDate={new Date()}
                                                  value={this.state.end_date}
                                                  selected={this.state.end_date}
                                                  onChange={this.onChangeEndDate}
                                                  validations={[required, end_date]}
                                             />
                                        </div>

                                        <div className="form-group">
                                             <label htmlFor="engine">Service Cost</label>
                                             <Input
                                                  type="text"
                                                  className="form-control"
                                                  name="service_cost"
                                                  value={this.state.service_cost}
                                                  onChange={this.onChangeServiceCost}
                                                  validations={[required, service_cost]}
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
