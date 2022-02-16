import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

class AssetSort extends Component {
  state = {
    menus: [
      { id: 0, menu: "Default", urlLink: "/AMdashboard" },
      { id: 1, menu: "Property Type", urlLink: "/AMdashboard" },
      { id: 2, menu: "Investment Term", urlLink: "/AMdashboard" },
      { id: 3, menu: "Min Investment", urlLink: "/AMdashboard" },
      { id: 4, menu: "Max Investment", urlLink: "/AMdashboard" },
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

  render() {
    return (
      <div className="sortDropdown">
        <button className="sortBtn">
          Sort Assets
          <FontAwesomeIcon id="dropIcon" icon={faCaretDown} />
        </button>
        <div className="sortDropdown-content">
          {this.state.menus.map((menu) => (
            <Link
              key={menu.id}
              style={{ color: menu.isActive ? "#ac162c" : "" }}
              className={` ${menu.isActive ? "active" : ""}`}
              id={menu.id}
              onClick={this.addClass}
              to={menu.urlLink}
            >
              {menu.menu}
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default AssetSort;
