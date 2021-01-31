import React, { Component } from "react";
import axios from "axios";

class CreateParts extends Component {
     // CREATE A CONSTRUCTOR
     constructor(props) {
          super(props);

          // BIND THE METHODS TO THIS CLASS

          this.onChangefactory_ref = this.onChangefactory_ref.bind(this);
          this.onChangeCategory = this.onChangeCategory.bind(this);
          this.onChangeMake = this.onChangeMake.bind(this);
          this.onChangeModel = this.onChangeModel.bind(this);
          this.onChangeVariante = this.onChangeVariante.bind(this);
          this.onChangeEngine = this.onChangeEngine.bind(this);
          this.onChangeName = this.onChangeName.bind(this);
          this.onChangeDescription = this.onChangeDescription.bind(this);
          this.onChangePrice = this.onChangePrice.bind(this);
          this.onChangeQuantity = this.onChangeQuantity.bind(this);
          this.onSubmit = this.onSubmit.bind(this);

          // SET NULL STATE

          this.state = {
               factory_ref: "",
               category: "",
               make: "",
               model: "",
               variante: "",
               engine: "",
               name: "",
               description: "",
               price: 0,
               quantity: 0,
               categories: [],
          };
     }

     // CREATE A LIFE CICLE COMPONENT TO REATRIEVE THE DATA FROM THE DATA BASE AND CREATE THE DROPDOWN.

     componentDidMount() {
          this.setState({
               categories: ["Filters "],
               category: "Filters",
          });
     }

     // SET THE STATE FOR EACH ITEM INSIDE OF CONSTRUCTOR ( DATA FROM THE FORM)

     onChangefactory_ref(e) {
          this.setState({
               factory_ref: e.target.value,
          });
     }
     onChangeCategory(e) {
          this.setState({
               category: e.target.value,
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
     onChangeVariante(e) {
          this.setState({
               variante: e.target.value,
          });
     }
     onChangeEngine(e) {
          this.setState({
               engine: e.target.value,
          });
     }
     onChangeName(e) {
          this.setState({
               name: e.target.value,
          });
     }
     onChangeDescription(e) {
          this.setState({
               description: e.target.value,
          });
     }
     onChangePrice(e) {
          this.setState({
               price: e.target.value,
          });
     }
     onChangeQuantity(e) {
          this.setState({
               quantity: e.target.value,
          });
     }

     // CREATE A SUBMIT BUTTON

     onSubmit(e) {
          e.preventDefault(); // This will to prevent that the form does not do its default behavior and do what we wanto below

          const parts = {
               factory_ref: this.state.factory_ref,
               category: this.state.category,
               make: this.state.make,
               model: this.state.model,
               variante: this.state.variante,
               engine: this.state.engine,
               name: this.state.name,
               description: this.state.description,
               price: this.state.price,
               quantity: this.state.quantity,
          };

          axios.post("https://gersgarage-api.herokuapp.com/stock/create", parts).then((res) => console.log(res.data));
          console.log(parts);

          window.location = "/partlist";
     }

     render() {
          return (
               <div className="container" style={{ maxWidth: "50%" }}>
                    <h3>Create New Parts Log</h3>
                    <form onSubmit={this.onSubmit}>
                         <div className="form-group">
                              <label>Category: </label>
                              <select required className="form-control" value={this.state.category} onChange={this.onChangeCategory}>
                                   {this.state.categories.map(function (category) {
                                        return (
                                             <option key={category} value={category}>
                                                  {category}
                                             </option>
                                        );
                                   })}
                              </select>
                         </div>
                         <div className="form-group">
                              <label>Factory reference </label>
                              <input
                                   type="text"
                                   required
                                   className="form-control"
                                   value={this.state.factory_ref}
                                   onChange={this.onChangefactory_ref}
                              />
                         </div>

                         <div className="form-group">
                              <label>Make</label>
                              <input type="text" className="form-control" value={this.state.make} onChange={this.onChangeMake} />
                         </div>
                         <div className="form-group">
                              <label>Model</label>
                              <input type="text" className="form-control" value={this.state.model} onChange={this.onChangeModel} />
                         </div>
                         <div className="form-group">
                              <label>Variante</label>
                              <input type="text" className="form-control" value={this.state.variante} onChange={this.onChangeVariante} />
                         </div>
                         <div className="form-group">
                              <label>Engine</label>
                              <input type="text" className="form-control" value={this.state.engine} onChange={this.onChangeEngine} />
                         </div>
                         <div className="form-group">
                              <label>Name</label>
                              <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName} />
                         </div>
                         <div className="form-group">
                              <label>Description</label>
                              <input type="text" className="form-control" value={this.state.description} onChange={this.onChangeDescription} />
                         </div>
                         <div className="form-group">
                              <label>Price</label>
                              <input type="text" className="form-control" value={this.state.price} onChange={this.onChangePrice} />
                         </div>
                         <div className="form-group">
                              <label>Quantity</label>
                              <input type="text" className="form-control" value={this.state.quantity} onChange={this.onChangeQuantity} />
                         </div>

                         <div className="form-group">
                              <input type="submit" value="Create Part Log" className="btn btn-primary" />
                         </div>
                    </form>
               </div>
          );
     }
}

export default CreateParts;
