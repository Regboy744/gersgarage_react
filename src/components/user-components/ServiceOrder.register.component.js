import React, { Component } from "react";
import axios from "axios";
import Form from "react-validation/build/form";
import Select from "react-validation/build/select";
import Textarea from "react-validation/build/textarea";

import CheckButton from "react-validation/build/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BookingCalendar from "react-booking-calendar";
import "./bookingCalendar.css";

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

const service_type = (value) => {
     if (value.length < 3 || value.length > 20) {
          return (
               <div className="alert alert-danger" role="alert">
                    The service_type must be between 3 and 20 characters.
               </div>
          );
     }
};

const issue_description = (value) => {
     if (value.length < 3 || value.length > 100) {
          return (
               <div className="alert alert-danger" role="alert">
                    The Issue Description name must be between 3 and 20 characters.
               </div>
          );
     }
};

const start_date = (value) => {
     if (value.length < 3 || value.length > 20) {
          return (
               <div className="alert alert-danger" role="alert">
                    The required date must be between 3 and 20 characters.
               </div>
          );
     }
};

export default class ServiceOrderRegister extends Component {
     constructor(props) {
          super(props);

          this.handleRegister = this.handleRegister.bind(this);
          this.onChangeServiceType = this.onChangeServiceType.bind(this);
          this.onChangeIssueDescription = this.onChangeIssueDescription.bind(this);
          this.onChangeStartDate = this.onChangeStartDate.bind(this);

          this.state = {
               currentService: "",
               service_type: "",
               issue_description: "",
               bookings: [],
          };
     }

     // CREATE A LIFE CICLE COMPONENT TO REATRIEVE THE DATA FROM THE DATA BASE AND CREATE THE DROPDOWN.

     componentDidMount() {
          axios.get("https://gers-garage.herokuapp.com/vehicles/edit/" + this.props.match.params.id + "/" + USER.accessToken + "/" + USER.id)
               .then((response) => {
                    this.setState({
                         status: "Booked",
                         make: response.data.make,
                         register: response.data.register,
                         v_id: this.props.match.params.id,
                         end_date: "",
                    });
               })
               .catch(function (error) {
                    this.setState({
                         content: (error.response && error.response.data) || error.message || error.toString(),
                    });
               });

          axios.get("https://gers-garage.herokuapp.com/servicesorder/availability")
               .then((response) => {
                    this.setState({
                         bookings: response.data,
                    });
               })
               .catch(function (error) {
                    this.setState({
                         content: (error.response && error.response.data) || error.message || error.toString(),
                    });
               });
     }

     onChangeServiceType(e) {
          this.setState({
               service_type: e.target.value,
          });
     }

     onChangeIssueDescription(e) {
          this.setState({
               issue_description: e.target.value,
          });
     }

     onChangeStartDate(e) {
          this.setState({
               start_date: e,
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
               UserService.registerServiceOrders(
                    this.state.v_id,
                    this.state.status,
                    this.state.service_type,
                    this.state.issue_description,
                    this.state.start_date,
                    this.state.end_date
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
                    {/* <div className="card calendar-container">
                         <BookingCalendar bookings={this.state.bookings} disableHistory />
                    </div> */}
                    <div className="card card-container">
                         {/* <img
                              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                              alt="profile-img"
                              className="profile-img-card"
                         /> */}

                         <Form
                              onSubmit={this.handleRegister}
                              ref={(c) => {
                                   this.form = c;
                              }}
                         >
                              {!this.state.successful && (
                                   <div>
                                        <label>
                                             Vehicle: {this.state.make}
                                             <br></br>
                                             Register:
                                             {this.state.register}
                                        </label>
                                        <br></br>
                                        <div className="form-group">
                                             <label>Service Type</label>
                                             <Select
                                                  type="text"
                                                  className="form-control"
                                                  name="service_type"
                                                  value={this.state.service_type}
                                                  onChange={this.onChangeServiceType}
                                                  validations={[required, service_type]}
                                             >
                                                  <option value="" valselected>
                                                       Choose a service
                                                  </option>
                                                  <option value="Basic repair">Basic Repair</option>
                                                  <option value="Anual service">Annual Service</option>
                                                  <option value="Major Service">Major Service</option>
                                                  <option value="Major Repair">Major Repair</option>
                                             </Select>
                                        </div>

                                        <div className="form-group">
                                             <label htmlFor="issue_description">Issue Description</label>
                                             <Textarea
                                                  rows="4"
                                                  type="text"
                                                  className="form-control"
                                                  name="issue_description"
                                                  value={this.state.issue_description}
                                                  onChange={this.onChangeIssueDescription}
                                                  validations={[required, issue_description]}
                                             />
                                        </div>

                                        <div className="form-group">
                                             <label htmlFor="start_date">Required date</label>

                                             <DatePicker
                                                  type="text"
                                                  className="form-control"
                                                  name="start_date"
                                                  dateFormat="dd/MM/yyyy"
                                                  filterDate={(date) => date.getDay() != 0}
                                                  isClearable
                                                  required
                                                  disableHistory
                                                  minDate={new Date()}
                                                  // showTimeSelect
                                                  // dateFormat="Pp"
                                                  value={this.state.start_date}
                                                  selected={this.state.start_date}
                                                  onChange={this.onChangeStartDate}
                                                  validations={[required, start_date]}
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
