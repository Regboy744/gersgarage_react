import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// HEADER COMPONENTS IMPORTS
import NavbarBoard from "./components/header-components/Navbar.boards.component";

// PARTS COMPONENTS IMPORTS
import CreateParts from "./components/mechanic-components/Create-parts.component";
import PartsList from "./components/mechanic-components/Parts-list.component";
import EditParts from "./components/mechanic-components/Edit-parts.component";

// USERS COMPONENTS IMPORTS
import UsersList from "./components/user-components/Users-list.component";
import UserEditInfo from "./components/user-components/User.edit.component";
import AddressRegister from "./components/user-components/Address.register.component";
import AddressList from "./components/user-components/Address.list.component";
import AddressEditInfo from "./components/user-components/Address.edit.component";

// LOGIN AND BOARDS ACCESS
import Login from "./components/auth-components/Login.component";
import Register from "./components/auth-components/Register.component";
import Home from "./components/resource.components/Home.component";
import Profile from "./components/resource.components/Profile.component";
import BoardUser from "./components/resource.components/Board-user.component";
import BoardModerator from "./components/resource.components/Board-moderator.component";
import BoardAdmin from "./components/resource.components/Board-admin.component";

// VEHICLES COMPONENTS IMPORTS
import VehicleRegister from "./components/user-components/Vehicle.register.component";
import VehicleList from "./components/user-components/Vehicle.list.component";
import VehiclesEditInfo from "./components/user-components/Vehicles.edit.component";

// SERVICE ORDERS COMPONENTS IMPORTS
import ServiceOrderRegister from "./components/user-components/ServiceOrder.register.component";
import ServiceOrderList from "./components/mechanic-components/ServiceOrder.list.component";
import ServiceEditInfo from "./components/mechanic-components/ServiceOrder.edit.component";

function App() {
     return (
          <Router>
               <NavbarBoard />
               <div className="container" style={{ maxWidth: "100%" }}>
                    <br />
                    <Route path="/partlist" component={PartsList} />
                    <Route path="/stock/edit/:id" component={EditParts} />
                    <Route path="/create" component={CreateParts} />
                    <Route path="/userlist" component={UsersList} />
                    <Route path="/user/edit" component={UserEditInfo} />
                    <Route exact path="/address/register" component={AddressRegister} />
                    <Route path="/address/list" component={AddressList} />
                    <Route path="/address/edit/:id" component={AddressEditInfo} />
                    <Route path="/vehicle/register" component={VehicleRegister} />
                    <Route path="/vehicles/list" component={VehicleList} />
                    <Route path="/vehicles/edit/:id" component={VehiclesEditInfo} />
                    <Route path="/vehicles/booking/:id" component={ServiceOrderRegister} />
                    <Route path="/serviceorder/list" component={ServiceOrderList} />
                    <Route path="/serviceorder/edit/:id" component={ServiceEditInfo} />
                    <Route exact path={["/", "/home"]} component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/user" component={BoardUser} />
                    <Route path="/mod" component={BoardModerator} />
                    <Route path="/admin" component={BoardAdmin} />
               </div>
               <div className="col-md-12">
                    <div class="footer">
                         <p>Ger's Garage</p>
                    </div>
               </div>
          </Router>
     );
}

export default App;
