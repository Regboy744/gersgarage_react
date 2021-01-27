import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Part = (props) => (
     <tr>
          <td>{props.part.factory_ref}</td>
          <td>{props.part.category}</td>
          <td>{props.part.make}</td>
          <td>{props.part.model}</td>
          <td>{props.part.variante}</td>
          <td>{props.part.engine}</td>
          <td>{props.part.name}</td>
          <td>{props.part.description}</td>
          <td>{props.part.price}</td>
          <td>{props.part.quantity}</td>
          <td>
               <Link to={"/stock/edit/" + props.part._id}>edit</Link> |{" "}
               <a
                    href="#"
                    onClick={() => {
                         props.deletePart(props.part._id);
                    }}
               >
                    delete
               </a>
          </td>
     </tr>
);

class PartsList extends Component {
     constructor(props) {
          super(props);

          this.deletePart = this.deletePart.bind(this);

          this.state = { parts: [] };
     }

     // GET ALL PARTS FROM STOCK IN THE DATA BASE AND PUT THEM IN A ARRAY CALLED parts

     componentDidMount() {
          axios.get("https://gersgarage-api.herokuapp.com/stock/")
               .then((response) => {
                    this.setState({ parts: response.data });
               })
               .catch((error) => {
                    console.log(error);
               });
     }

     //  FUNCTION TO DELETE BASE ON THE PART IDA AND REFRESH THE PAGE WITH THE NEW STATE
     deletePart(id) {
          axios.delete("https://gersgarage-api.herokuapp.com/stock/delete/" + id).then((response) => {
               console.log(response.data);
          });

          // SET THE STATE WHITHOUT THE ID EXCLUDED AND REFRESH THE PAGE
          this.setState({
               parts: this.state.parts.filter((el) => el._id !== id),
          });
     }

     // FUNCTION THAT GENERATE THE LIST WITH THE MAP LOOPING
     partsList() {
          return this.state.parts.map((currentPart) => {
               return <Part part={currentPart} deletePart={this.deletePart} key={currentPart._id} />;
          });
     }

     render() {
          return (
               <div class="table-responsive">
                    <h3>Parts List</h3>
                    <table class="table table-striped table-hover">
                         <thead className="thead-light">
                              <tr>
                                   <th>factory_ref</th>
                                   <th>category</th>
                                   <th>make</th>
                                   <th>model</th>
                                   <th>variante</th>
                                   <th>engine</th>
                                   <th>name</th>
                                   <th>description</th>
                                   <th>price</th>
                                   <th>quantity</th>
                                   <th>Edit</th>
                              </tr>
                         </thead>
                         <tbody>{this.partsList()}</tbody>
                    </table>
               </div>
          );
     }
}

export default PartsList;
