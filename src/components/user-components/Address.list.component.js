import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import UserService from "../../services/user.service";

const Address = (props) => (
     <tr>
          <td>{props.address.address_type}</td>
          <td>{props.address.street}</td>
          <td>{props.address.city}</td>
          <td>{props.address.code}</td>
          <td>{props.address.area}</td>
          <td>
               <Link to={"/address/edit/" + props.address._id}>edit</Link> |{" "}
               <a
                    href="#"
                    onClick={() => {
                         props.deleteAddress(props.address._id);
                    }}
               >
                    delete
               </a>
          </td>
     </tr>
);

class AddressList extends Component {
     constructor(props) {
          super(props);

          this.deleteAddress = this.deleteAddress.bind(this);

          this.state = { addressess: [] };
     }

     // GET ALL PARTS FROM STOCK IN THE DATA BASE AND PUT THEM IN A ARRAY CALLED parts

     componentDidMount() {
          UserService.getAddressBoard().then(
               (response) => {
                    this.setState({
                         addressess: response.data,
                    });
               },
               (error) => {
                    this.setState({
                         content: (error.response && error.response.data) || error.message || error.toString(),
                    });
               }
          );
     }

     //  FUNCTION TO DELETE BASE ON THE PART IDA AND REFRESH THE PAGE WITH THE NEW STATE
     deleteAddress(id) {
          axios.delete("https://gersgarage-api.herokuapp.com/address/delete/" + id).then((response) => {
               console.log(response.data);
          });

          // SET THE STATE WHITHOUT THE ID EXCLUDED AND REFRESH THE PAGE
          this.setState({
               addressess: this.state.addressess.filter((el) => el._id !== id),
          });
     }

     // FUNCTION THAT GENERATE THE LIST WITH THE MAP LOOPING
     addressList() {
          return this.state.addressess.map((currentAddress) => {
               return <Address address={currentAddress} deleteAddress={this.deleteAddress} key={currentAddress._id} />;
          });
     }

     render() {
          return (
               <div class="table-responsive">
                    <h3>Address List</h3>
                    <table class="table table-striped table-hover">
                         <thead className="thead-light">
                              <tr>
                                   <th>Address Type</th>
                                   <th>Street</th>
                                   <th>City</th>
                                   <th>Code</th>
                                   <th>Area</th>
                                   <th>Edit</th>
                              </tr>
                         </thead>
                         <tbody>{this.addressList()}</tbody>
                    </table>
               </div>
          );
     }
}

export default AddressList;
