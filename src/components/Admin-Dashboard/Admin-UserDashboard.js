import React, { Component} from "react";
import {AdminUserItem} from "../Admin-Users/Admin-UserItem";
import { Row, Col, Jumbotron } from "react-bootstrap";
import "react-input-range/lib/css/index.css";
import { connect } from "react-redux";
import { getUsers } from "../../actions/securityActions";
import {Loader} from "../stylesheet/Loader"; 
import Broadcast from "../Admin-Users/Admin-Broadcast";

 class AdminUserDashboard extends Component {
  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    console.log(this.props);
    const { data } = this.props.security;
    const { users } = this.props.security;
    let extraData = []; 
    
    if(users.extradata != null){
      extraData = users.extradata
    }

    if (extraData.totalInvestors == null ||extraData.totalAssetManagers == null) {
      extraData.totalAssetManagers = <Loader />;
      extraData.totalInvestors = <Loader />;
    }

    return (
      <div>
        <div>
          <h1 className="primary-header">Users</h1>
          <Broadcast/>
        </div>
       
        <Row className="mt-3 position-relative">
          <Col>
            <Jumbotron id="admin-userStatsCard">
              <div className="admin-userStats">
                <h2>{extraData.totalAssetManagers}</h2>
                <h6>Total Asset Managers</h6>
              </div>
            </Jumbotron>
          </Col>
          <Col>
            <Jumbotron id="admin-userStatsCard">
              <div className="admin-userStats">
                <h2>{extraData.totalInvestors}</h2>
                <h6>Total Investors</h6>
              </div>
            </Jumbotron>
          </Col>
        </Row>
        <div className="assetCardContainer">
          <div className="flexCol2">
             <Row>
              {data.map((userItem) => (
                <Col key={userItem.id} sm={12} md={6} lg={3} xl={3}>
                  <AdminUserItem security={userItem} />
                </Col>
              ))}
            </Row> 
          </div>
          <br />
        </div>
        <hr />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, { getUsers })(AdminUserDashboard); 
