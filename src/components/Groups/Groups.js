import React, { Component } from "react";
import { Form, Button, Card, Row, Col, Badge } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import store from "../../store";
import { GET_ERRORS } from "../../actions/types";
import { ErrorToasts, SuccessToasts } from "../stylesheet/ErrorToasts";
import { getAccountGroups, selectGroup } from "../../actions/groupAction";
import { connect } from "react-redux";
import { LoaderOnConfirm } from "../stylesheet/Loader";
import logo from "../includes/silc logo HD - EN.png";
import { logout } from "../../actions/securityActions";

class Groups extends Component {
  constructor() {
    super();
    this.state = {
      groupName: "",
      load: false,
      checked: false,
    };

    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.getAccountGroups();
  }

  handleCheck(e) {
    if (e.target.checked) {
      this.setState({ checked: true });
    } else {
      this.setState({ checked: false });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const SelectGroup = {
      groupName: this.state.groupName,
    };

    // console.log(SelectGroup);

    this.setState({ load: true }, () => {
      this.props
        .selectGroup(SelectGroup, this.props.history)
        .then(() => {
          setTimeout(() => {
            this.setState({ load: false });
          }, 1000);
          // console.log(SelectGroup);
          // console.log("success");
        })
        .catch(() => {
          this.setState({ load: false });
          console.log("fail");

          //   this.setShow();
        });
      //   this.setShow();
    });
  }

  handleClick = () => {
    this.props.logout(this.props.history);
  };
  render() {
    const { data } = this.props.groups;
    return (
      <div>
        <Row className="ml-0">
          <Col className="selectGroupCol">
            <Card className="my-3 p-5 selectGroupContainer" id="loginCard">
              <img style={{ width: "30%" }} src={logo} alt="Logo" />
              <Card.Title>
                Welcome {localStorage.getItem("userName")}
                <hr />
                <small className="text-muted">Choose an account type</small>
              </Card.Title>
              <Form onSubmit={this.handleSubmit}>
                {data.map((groupItem) => (
                  <Card
                    key={groupItem.id}
                    className={
                      groupItem.status == "active"
                        ? "my-3 p-4 selectGroupCard"
                        : "my-3 p-4"
                    }
                  >
                    <label
                      className={
                        groupItem.status == "active"
                          ? "groupLabel"
                          : "inactiveGroup"
                      }
                    >
                      {groupItem.status != "active" ? (
                        <Badge variant="dark" size="sm">
                          Inactive
                        </Badge>
                      ) : (
                        ""
                      )}
                      <div className="my-3">
                        <Card.Title>{groupItem.groupType}</Card.Title>
                        <Form.Text>{groupItem.groupName}</Form.Text>
                        <Form.Text className="text-muted">
                          <div>
                            All your transaction will be recorded from the{" "}
                            {groupItem.groupType} Account.
                          </div>
                        </Form.Text>
                        <br />
                        <Form.Check
                          type="radio"
                          name="groupName"
                          id="mb-3"
                          value={groupItem.groupName}
                          groupType={this.state.value}
                          onChange={this.onChange}
                          handleCheck={this.handleCheck}
                          disabled={groupItem.status != "active" ? true : false}
                        />
                      </div>
                    </label>
                  </Card>
                ))}
                <div>
                  <Button variant="primary" type="submit" id="loginBtn">
                    {(() => {
                      if (this.state.load) {
                        return <LoaderOnConfirm />;
                      } else {
                        return <>Proceed</>;
                      }
                    })()}
                  </Button>
                </div>
                <div className="mt-4">
                  <Button
                    variant="primary"
                    type="submit"
                    id="loginBtn"
                    onClick={this.handleClick}
                  >
                    Logout
                  </Button>
                </div>
              </Form>
              <br />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  groups: state.groups,
  security: state.security,
});

export default connect(mapStateToProps, {
  logout,
  getAccountGroups,
  selectGroup,
})(Groups);
