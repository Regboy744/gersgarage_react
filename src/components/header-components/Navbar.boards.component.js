import React, { Component } from "react";
import { Link } from "react-router-dom";

import AuthService from "../../services/auth.service";

export default class NavbarBoard extends Component {
     constructor(props) {
          super(props);
          this.logOut = this.logOut.bind(this);

          this.state = {
               showMechanicBoard: false,
               showCustomerBoard: false,
               showAdminBoard: false,
               currentUser: undefined,
          };
     }

     componentDidMount() {
          const user = AuthService.getCurrentUser();

          if (user) {
               this.setState({
                    currentUser: user,
                    showCustomerBoard: user.user_type.includes("customer"),
                    showMechanicBoard: user.user_type.includes("mechanic"),
                    // showAdminBoard: user.roles.includes("ROLE_ADMIN"),
               });
          }
     }

     logOut() {
          AuthService.logout();
     }
     render() {
          const { currentUser, showMechanicBoard, showCustomerBoard, showAdminBoard } = this.state;

          return (
               <nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary">
                    <div className="container-fluid">
                         <Link to="/" className="navbar-brand">
                              Ger's Garage
                         </Link>

                         {/* THE BUTOON BELOW WORKS FOR RESPOSIVE */}
                         <button
                              className="navbar-toggler"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#navbarSupportedContent"
                              aria-controls="navbarSupportedContent"
                              aria-expanded="false"
                              aria-label="Toggle navigation"
                         >
                              <span className="navbar-toggler-icon"></span>
                         </button>
                         {/* END */}

                         <div className="collapse navbar-collapse" id="navbarSupportedContent">
                              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                   <li className="nav-item">
                                        <Link to={"/home"} className="nav-link">
                                             Home
                                        </Link>
                                   </li>
                                   {/* STOCK COMPONENTS NAVBAR */}
                                   {showMechanicBoard && (
                                        <li className="nav-item dropdown ">
                                             <a
                                                  className="nav-link dropdown-toggle"
                                                  href={() => false}
                                                  id="navbarDropdown"
                                                  role="button"
                                                  data-bs-toggle="dropdown"
                                                  aria-expanded="false"
                                             >
                                                  Stock Components
                                             </a>
                                             <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                  <li>
                                                       <Link to="/partlist" className="dropdown-item">
                                                            Parts List
                                                       </Link>
                                                  </li>
                                                  <li>
                                                       <Link to="/create" className="dropdown-item">
                                                            Add new part
                                                       </Link>
                                                  </li>
                                             </ul>
                                        </li>
                                   )}

                                   {/*  USER COMPONENTS NAVBAR */}
                                   {showCustomerBoard && (
                                        <li className="nav-item dropdown ">
                                             <a
                                                  className="nav-link dropdown-toggle"
                                                  href={() => false}
                                                  id="navbarDropdown"
                                                  role="button"
                                                  data-bs-toggle="dropdown"
                                                  aria-expanded="false"
                                             >
                                                  User Components
                                             </a>
                                             <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                  <li>
                                                       <Link to="/user/edit" className="dropdown-item">
                                                            User edit
                                                       </Link>
                                                  </li>
                                                  <li>
                                                       <Link to="/address/register" className="dropdown-item">
                                                            Address Register
                                                       </Link>
                                                  </li>
                                                  <li>
                                                       <Link to="/address/list" className="dropdown-item">
                                                            Address list
                                                       </Link>
                                                  </li>
                                                  <li>
                                                       <Link to="/vehicle/register" className="dropdown-item">
                                                            Vehicle Register
                                                       </Link>
                                                  </li>
                                                  <li>
                                                       <Link to="/vehicles/list" className="dropdown-item">
                                                            Vehicle List
                                                       </Link>
                                                  </li>
                                             </ul>
                                        </li>
                                   )}
                              </ul>

                              {/* MECHANICS COMPONENTS NAVBAR */}

                              <div className="navbar-nav mr-auto">
                                   {showMechanicBoard && (
                                        <li className="nav-item dropdown ">
                                             <a
                                                  className="nav-link dropdown-toggle"
                                                  href={() => false}
                                                  id="navbarDropdown"
                                                  role="button"
                                                  data-bs-toggle="dropdown"
                                                  aria-expanded="false"
                                             >
                                                  Mechanics Components
                                             </a>
                                             <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                  <li>
                                                       <Link to="/serviceorder/register" className="dropdown-item">
                                                            Service Order Update
                                                       </Link>
                                                  </li>
                                                  <li>
                                                       <Link to="/serviceorder/list" className="dropdown-item">
                                                            Service Order List
                                                       </Link>
                                                  </li>
                                             </ul>
                                        </li>
                                   )}

                                   {showAdminBoard && (
                                        <li className="nav-item">
                                             <Link to={"/admin"} className="nav-link">
                                                  Admin Board
                                             </Link>
                                        </li>
                                   )}

                                   {/* THIS IS THE PUBLIC LINKS FOR ANY USER MECHANIC OR CUSTOMER */}
                                   {currentUser && (
                                        <li className="nav-item">
                                             <Link to={"/user"} className="nav-link">
                                                  User
                                             </Link>
                                        </li>
                                   )}
                              </div>

                              {currentUser ? (
                                   <div className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                             <Link to={"/profile"} className="nav-link">
                                                  {currentUser.name}
                                             </Link>
                                        </li>
                                        <li className="nav-item">
                                             <a href="/login" className="nav-link" onClick={this.logOut}>
                                                  LogOut
                                             </a>
                                        </li>
                                   </div>
                              ) : (
                                   <div className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                             <Link to={"/login"} className="nav-link">
                                                  Login
                                             </Link>
                                        </li>

                                        <li className="nav-item">
                                             <Link to={"/register"} className="nav-link">
                                                  Sign Up
                                             </Link>
                                        </li>
                                   </div>
                              )}
                         </div>
                    </div>
               </nav>
          );
     }
}
