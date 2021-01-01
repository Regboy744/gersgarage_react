import React, { Component, useEffect } from "react";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";

export default class Profile extends Component {
     constructor(props) {
          super(props);

          this.state = {
               content: "",
          };
     }

     componentDidMount() {
          this.timer = setInterval(() => {
               UserService.getUserBoard().then(
                    (response) => {
                         this.setState({
                              content: response.data,
                         });
                    },
                    (error) => {
                         this.setState({
                              content: (error.response && error.response.data) || error.message || error.toString(),
                         });
                    }
               );
          }, 1000);
     }

     componentWillUnmount() {
          clearInterval(this.timer);
     }

     render() {
          return (
               <div className="container">
                    <header className="jumbotron">
                         <h3>
                              <strong>{this.state.content.name}</strong> Profile
                         </h3>
                    </header>
                    <p>
                         {/* <strong>Token:</strong> {this.state.currentUser.accessToken.substring(0, 20)} ... {this.state.currentUser.accessToken.substr(this.state.currentUser.accessToken.length - 20)} */}
                    </p>
                    <p>
                         <strong>Id:</strong> {this.state.content._id}
                    </p>
                    <p>
                         <strong>Email:</strong> {this.state.content.email}
                    </p>
                    {/* <strong>Authorities:</strong> */}
                    {/* <ul>{this.state.currentUser.roles && this.state.currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}</ul> */}
               </div>
          );
     }
}
