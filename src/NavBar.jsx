import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="userCount">
          { this.props.online ? `${this.props.onlineUsers} user(s) online` : 'Offline' }
        </span>
      </nav>
    );
  }
}
export default NavBar;
