import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt, faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faBuilding, faUserCircle, faChartBar } from '@fortawesome/free-regular-svg-icons';
import "../stylesheet/app.scss";
import logo from "../includes/silc logo HD - EN.png";
import { adminLogout } from "../../actions/securityActions";
import store from "../../store";

class AdminSidebar extends Component {
  state = {
    menus: [
      {
        id: 0,
        menu: "Users",
        urlLink: "/AdminUserDashboard",
        menuIcons: <FontAwesomeIcon id="icons" icon={faUserCircle} />,
      },
      {
        id: 1,
        menu: "Groups",
        urlLink: "/AdminGroupDashboard",
        menuIcons: <FontAwesomeIcon id="icons" icon={faUsers} />,
      },
      {
        id: 2,
        menu: "Assets",
        urlLink: "/AdminAssetDashboard",
        menuIcons: <FontAwesomeIcon id="icons" icon={faBuilding} />,
      },
       {
        id: 3,
        menu: "Investments",
        urlLink: "/AdminInvDashboard",
        menuIcons: <FontAwesomeIcon id="icons" icon={faChartBar} />,
      }, 
    ],
  };

  addClass = (e) => {
    this.setState({
      menus: this.state.menus.map((menu) => ({
        ...menu,
        isActive: e.target.id == menu.id,
      })),
    });
  };

  handleClick = () => {
    store.dispatch(adminLogout());
    window.location.href = "/adminSignIn";
  };

  render() {
    return (
      <div className="sidebar">
        <img className="logo" src={logo} alt="Logo" />
        {this.state.menus.map((menu) => (
          <Link
            className={` ${menu.isActive ? "active" : ""}`}
            key={menu.id}
            id={menu.id}
            onClick={this.addClass}
            to={menu.urlLink}
          >
            {menu.menuIcons}
            {menu.menu}
          </Link>
        ))}
         <hr className="w-75"/>
        <button className="px-4 pt-4 logoutButton" onClick={this.handleClick}>
          <FontAwesomeIcon id="icons" icon={faSignOutAlt} /> Logout
        </button>
      </div>
    );
  }
}

export default withRouter(AdminSidebar);
