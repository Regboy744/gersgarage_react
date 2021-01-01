import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import UserService from "../../services/user.service";

const Vehicle = (props) => (
     <tr>
          <td>{props.vehicle.make}</td>
          <td>{props.vehicle.model}</td>
          <td>{props.vehicle.year}</td>
          <td>{props.vehicle.register}</td>
          <td>{props.vehicle.engine}</td>
          <td>
               <Link to={"/vehicles/edit/" + props.vehicle._id}>edit</Link> |{" "}
               <a
                    href="#"
                    onClick={() => {
                         props.deleteVehicle(props.vehicle._id);
                    }}
               >
                    delete
               </a>
          </td>
          <td>
               <Link to={"/vehicles/booking/" + props.vehicle._id}>Booking</Link>
          </td>
     </tr>
);

class VehicleList extends Component {
     constructor(props) {
          super(props);

          this.deleteVehicle = this.deleteVehicle.bind(this);

          this.state = { vehicles: [] };
     }

     // GET ALL PARTS FROM STOCK IN THE DATA BASE AND PUT THEM IN A ARRAY CALLED parts

     componentDidMount() {
          UserService.getVehicleBoard().then(
               (response) => {
                    this.setState({
                         vehicles: response.data,
                    });
               },
               (error) => {
                    this.setState({
                         content: (error.response && error.response.data) || error.message || error.toString(),
                    });
               }
          );
     }

     //  FUNCTION TO DELETE BASE ON THE VEHICLE ID AND REFRESH THE PAGE WITH THE NEW STATE
     deleteVehicle(id) {
          axios.delete("https://gersgarage-api.herokuapp.com/vehicles/delete/" + id).then((response) => {
               console.log(response.data);
          });

          // SET THE STATE WHITHOUT THE ID EXCLUDED AND REFRESH THE PAGE
          this.setState({
               vehicles: this.state.vehicles.filter((el) => el._id !== id),
          });
     }

     // FUNCTION THAT GENERATE THE LIST WITH THE MAP LOOPING
     vehicleList() {
          return this.state.vehicles.map((currentVehicle) => {
               return <Vehicle vehicle={currentVehicle} deleteVehicle={this.deleteVehicle} key={currentVehicle._id} />;
          });
     }

     render() {
          return (
               <div class="table-responsive">
                    <h3>Vehicle List</h3>
                    <table class="table table-striped table-hover">
                         <thead className="thead-light">
                              <tr>
                                   <th>Make</th>
                                   <th>Model</th>
                                   <th>Year</th>
                                   <th>Regiter</th>
                                   <th>engine</th>
                                   <th>Edit info</th>
                                   <th>Get a booking</th>
                              </tr>
                         </thead>
                         <tbody>{this.vehicleList()}</tbody>
                    </table>
               </div>
          );
     }
}

export default VehicleList;
