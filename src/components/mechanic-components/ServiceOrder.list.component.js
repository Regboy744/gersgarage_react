import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import UserService from "../../services/user.service";

const Service = (props) => (
     <tr>
          <td>{props.so.status}</td>
          <td>{props.so.service_type}</td>
          <td>{props.so.mechanic_name}</td>
          <td>{props.so.issue_description}</td>
          <td>{new Date(props.so.start_date).toLocaleDateString()}</td>
          <td>{new Date(props.so.end_date).toLocaleDateString()}</td>

          <td>
               <Link to={"/serviceorder/edit/" + props.so._id}>edit</Link>
               {/* <a
                    href="#"
                    onClick={() => {
                         props.deleteSo(props.so._id);
                    }}
               >
                    delete
               </a> */}
          </td>
     </tr>
);

class ServiceOrderList extends Component {
     constructor(props) {
          super(props);

          this.deleteSo = this.deleteSo.bind(this);

          this.state = { serviceOrder: [] };
     }

     // GET ALL PARTS FROM STOCK IN THE DATA BASE AND PUT THEM IN A ARRAY CALLED parts

     componentDidMount() {
          UserService.getServiceBoard().then(
               (response) => {
                    this.setState({
                         serviceOrder: response.data,
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
     deleteSo(id) {
          axios.delete("https://gers-garage.herokuapp.com/delete/" + id).then((response) => {
               console.log(response.data);
          });

          // SET THE STATE WHITHOUT THE ID EXCLUDED AND REFRESH THE PAGE
          this.setState({
               serviceOrder: this.state.serviceOrder.filter((el) => el._id !== id),
          });
     }

     // FUNCTION THAT GENERATE THE LIST WITH THE MAP LOOPING
     SoList() {
          return this.state.serviceOrder.map((currentSo) => {
               return <Service so={currentSo} deleteSo={this.deleteSo} key={currentSo._id} />;
          });
     }

     render() {
          return (
               <div class="table-responsive">
                    <h3>Service Order List</h3>
                    <table class="table table-striped table-hover">
                         <thead className="thead-light">
                              <tr>
                                   <th>Status</th>
                                   <th>Service Type</th>
                                   <th>Mechanic</th>
                                   <th>Issue</th>
                                   <th>Booking Date</th>
                                   <th>Delivery date</th>
                                   <th>Edit</th>
                              </tr>
                         </thead>
                         <tbody>{this.SoList()}</tbody>
                    </table>
               </div>
          );
     }
}

export default ServiceOrderList;
