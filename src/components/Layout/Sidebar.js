import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThLarge,
  faSignOutAlt,
  faTasks,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBuilding,
  faUserCircle,
  faChartBar,
} from "@fortawesome/free-regular-svg-icons";
import "../stylesheet/app.scss";
import logo from "../includes/silc logo HD - EN.png";
import { logout } from "../../actions/securityActions";
import store from "../../store";
import axios from "axios";
import { GET_LOGOUT_STATUS } from "../../actions/types";
import { connect } from "react-redux";
import { getUser } from "../../actions/securityActions";


class Sidebar extends Component {
  componentDidMount() {
      this.props
        .getUser(localStorage.getItem("id"))
        .then(() => {
          this.setState({ load: false });
        })
        .catch(() => {
          this.setState({ load: false });
        });
  }


  state = {
    menus: [
      {
        id: 0,
        menu: "Dashboard",
        urlLink: "/BasicUserDashboard",
        menuIcons: <FontAwesomeIcon id="icons" icon={faThLarge} />,
      },
      {
        id: 1,
        menu: "Investment Portfolio",
        urlLink: "/InvDashboard",
        menuIcons: <FontAwesomeIcon id="icons" icon={faChartBar} />,
      },
      {
        id: 2,
        menu: "Asset Sponsor",
        urlLink: "/AMdashboard",
        menuIcons: <FontAwesomeIcon id="icons" icon={faTasks} />,
      },

      {
        id: 3,
        menu: "Marketplace",
        urlLink: "/Marketplace",
        menuIcons: <FontAwesomeIcon id="icons" icon={faBuilding} />,
      },
      {
        id: 4,
        menu: "My Profile",
        urlLink: "/Profile",
        menuIcons: <FontAwesomeIcon id="icons" icon={faUserCircle} />,
      },
    ],
  };

  /* componentDidMount(){
    this.setState({userName: localStorage.getItem("userName") })
    this.setState({groupType: localStorage.getItem("groupName") })
  } */

  AdminVerified = async () => {
    const res = await axios.get("http://localhost:8000/api/getLogoutStatus");

    store.dispatch({
      type: GET_LOGOUT_STATUS,
      payload: res.data,
    });

    const state = store.getState();
    const message = state.security.logoutStatus;
    return message;
  };

  addClass = (e) => {
    this.setState({
      menus: this.state.menus.map((menu) => ({
        ...menu,
        isActive: e.target.id == menu.id,
      })),
    });

    axios.post("http://localhost:8000/api/checkToken").catch((error) => {
      localStorage.clear();
      alert("Multiple Signin detected");
      window.location.reload();
    });

    this.AdminVerified().then((result) => {
      console.log(result);
      if (result !== "") {
        axios.get("http://localhost:8000/api/logout").then(() => {
          localStorage.clear();
          alert(result);
          window.location.reload();
        });
      }
    });
  };
  
  
  UNSAFE_componentWillMount() {
    if (localStorage.getItem("scopes") == "investor") {
      this.state.menus.splice(0, 1);
      this.state.menus.splice(1, 1);  
    } else if (localStorage.getItem("scopes") == "AM") {
      this.state.menus.splice(0, 2);
      // console.log("remove inv");
    } else if (localStorage.getItem("scopes") == "basic") {
      this.state.menus.splice(1, 2);
      // console.log("remove inv");
    } else {
      this.state.menus.splice(0, 1);
    }
  }

  handleGroups = () => {
    window.location.href = "/selectGroup";
  };

  handleClick = () => {
    this.props.logout(this.props.history);
    // window.location.href = "/SignIn";
  };

  render() {
    const { userData } = this.props.security;

    return (
      <div className="sidebar">
        <img className="logo" src={logo} alt="Logo" />
        {localStorage.getItem("scopes") == "AM" || localStorage.getItem("scopes") == "basic" ? (""):( <div className="px-4">
          <div className=" mb-2 userLoginInfo text-center">
            <Row>
              <Col>
                <h6>
                  {userData.groupName}
                  <br />
                  <small>{userData.groupType}</small>
                </h6>
              </Col>
            </Row>
          </div>
        </div>)}
       
        <hr className="w-75" />
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
        <hr className="w-75" />
        {localStorage.getItem("scopes") == "AM"  || localStorage.getItem("scopes") == "basic" ? (""):(<div className="px-4 pt-4">
          <button className="logoutButton" onClick={this.handleGroups}>
            <FontAwesomeIcon id="icons" icon={faUsers} /> Groups
          </button>
        </div>)}
        
        <div className="px-4 pt-4">
          <button className="logoutButton" onClick={this.handleClick}>
            <FontAwesomeIcon id="icons" icon={faSignOutAlt} /> Logout
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, { logout, getUser })(withRouter(Sidebar));


