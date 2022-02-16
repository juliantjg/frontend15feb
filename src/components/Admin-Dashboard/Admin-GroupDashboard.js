import React, { Component} from "react";
import AdminGroupItem from "../Admin-Groups/Admin-GroupItem"
import { Row, Col, Jumbotron } from "react-bootstrap";
import "react-input-range/lib/css/index.css";
import { connect } from "react-redux";
import { getGroups } from "../../actions/groupAction";
import {Loader} from "../stylesheet/Loader"; 
import CreateGroupModal from "../Admin-Groups/Admin-CreateGroup"

 class AdminGroupDashboard extends Component {
  componentDidMount() {
    this.props.getGroups();
  }
  render() {
    console.log(this.props);
    const { data } = this.props.groups;
    const { groups } = this.props.groups;
    let extraData = []; 
    
    if(groups.extradata != null){
      extraData = groups.extradata
    }

    if (extraData.CompanyAccount == null || extraData.JointAccount == null || extraData.TrusteeAccount == null) {
      extraData.CompanyAccount = <Loader />;
      extraData.JointAccount = <Loader />;
      extraData.TrusteeAccount = <Loader />;
    }

    return (
      <div>
        <div>
          <h1 className="primary-header">Groups</h1>
          <CreateGroupModal />
        </div>
       
        <Row className="mt-3 position-relative">
          <Col>
            <Jumbotron id="admin-userStatsCard">
              <div className="admin-userStats">
                <h2>{extraData.CompanyAccount}</h2>
                <h6>Company Account</h6>
              </div>
            </Jumbotron>
          </Col>
          <Col>
            <Jumbotron id="admin-userStatsCard">
              <div className="admin-userStats">
                <h2>{extraData.JointAccount}</h2>
                <h6>Joint Accounts</h6>
              </div>
            </Jumbotron>
          </Col>
          <Col>
            <Jumbotron id="admin-userStatsCard">
              <div className="admin-userStats">
                <h2>{extraData.TrusteeAccount}</h2>
                <h6>Trustee Accounts</h6>
              </div>
            </Jumbotron>
          </Col>
        </Row>
        <div className="assetCardContainer">
          <div className="flexCol2">
             <Row>
              {data.length > 0 ? (data.map((groupItem) => (
                <Col key={groupItem.id} sm={12} md={6} lg={3} xl={3}>
                  <AdminGroupItem groups={groupItem} />
                </Col>
              ))):(<h6 className="primary-header" >No groups created yet.</h6>)}
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
  groups: state.groups,
});

export default connect(mapStateToProps, { getGroups })(AdminGroupDashboard); 