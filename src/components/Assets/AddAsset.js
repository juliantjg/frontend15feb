import React, { Component } from "react";
import { Row, Col, Form, Button, Card, Badge } from "react-bootstrap";
import { connect } from "react-redux";
import { createAsset } from "../../actions/assetAction";
import { withRouter } from "react-router-dom";
import { LoaderOnConfirm } from "../stylesheet/Loader";
import store from "../../store";
import { GET_ERRORS } from "../../actions/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingUsd,
  faPercentage,
  faCheck,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import dummyAsset from "../includes/asset.jpg";
import { SuccessToasts } from "../stylesheet/ErrorToasts";

class AddAsset extends Component {
  constructor() {
    super();
    this.state = {
      assetType: "",
      assetTitle: "",
      location: "",
      streetName: "",
      suburb: "",
      state: "",
      postcode: "",
      investmentGoal: "",
      investmentTerm: "",
      minInvestmentAmount: "",
      interestRate: "",
      investmentReceived: "",
      assetInfo: "",
      description: "",
      nameContact: "",
      emailContact: "",
      phoneContact: "",
      streetNameContact: "",
      suburbContact: "",
      stateContact: "",
      postcodeContact: "",
      file: null,
      load: false,
      show: false,
      addChecked: false,
      agreeCheck: false,
      currentStep: 1,
      highlights: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.imageChange = this.imageChange.bind(this);
    this.setShow = this.setShow.bind(this);
    this.handleAddressCheck = this.handleAddressCheck.bind(this);
    this.handleAgreeCheck = this.handleAgreeCheck.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  handleAgreeCheck(e) {
    if (e.target.checked) {
      this.setState({ agreeCheck: true });
    } else {
      this.setState({ agreeCheck: false });
    }
  }

  handleAddressCheck(e) {
    if (e.target.checked) {
      this.setState({ addChecked: true });
    } else {
      this.setState({ addChecked: false });
    }
  }

  handleDescriptionChange = (index) => (e) => {
    const newHighLights = this.state.highlights.map((highlight, l_index) => {
      if (index !== l_index) return highlight;
      return { ...highlight, description: e.target.value };
    });

    this.setState({ highlights: newHighLights });
    console.log("desc handler");
    console.log(this.state.highlights);
  };

  handleAddHighLight = () => {
    this.setState({
      highlights: this.state.highlights.concat([{ description: "" }]),
    });
  };

  handleRemoveHighlight = (index) => () => {
    this.setState({
      highlights: this.state.highlights.filter(
        (l, l_index) => index !== l_index
      ),
    });
  };

  componentDidMount() {
    store.dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  imageChange(e) {
    this.setState({
      file: URL.createObjectURL(e.target.files[0]),
    });
  }

  setShow() {
    this.setState({ show: true });
  }

  onSubmit(e) {
    e.preventDefault();
    const newAsset = {
      assetType: this.state.assetType,
      assetTitle: this.state.assetTitle,
      location: this.state.location,
      streetName: this.state.streetName,
      suburb: this.state.suburb,
      state: this.state.state,
      postcode: this.state.postcode,
      investmentGoal: this.state.investmentGoal,
      investmentTerm: this.state.investmentTerm,
      minInvestmentAmount: this.state.minInvestmentAmount,
      interestRate: this.state.interestRate,
      investmentReceived: this.state.investmentReceived,
      assetInfo: this.state.assetInfo,
      eventDate: this.state.eventDate,
      eventInfo: this.state.eventInfo,
      file: this.state.file,
      highlight: this.state.highlights,
      nameContact: this.state.nameContact,
      emailContact: this.state.emailContact,
      phoneContact: this.state.phoneContact,
      streetNameContact: this.state.streetNameContact,
      suburbContact: this.state.suburbContact,
      stateContact: this.state.stateContact,
      postcodeContact: this.state.postcodeContact,
    };

    this.setState({ load: true }, () => {
      this.props
        .createAsset(newAsset, this.props.history)
        .then(() => {
          this.setState({ load: false });
        })
        .catch(() => {
          this.setState({ load: false });
        });
    });
    console.log(newAsset);
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }

    return null;
  }

  _next = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <button
          className="btn btn-secondary border-0"
          type="button"
          onClick={this._prev}
        >
          Previous Step
        </button>
      );
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep == 1) {
      return (
        <button
          className="btn btn-primary float-right border-0"
          id="submitBtn-standard"
          type="button"
          onClick={this._next}
          disabled={
            !this.state.assetType ||
            !this.state.assetTitle ||
            !this.state.assetInfo ||
            !this.state.streetName ||
            !this.state.suburb ||
            !this.state.state ||
            !this.state.postcode ||
            this.state.highlights.length <= 0
          }
        >
          Proceed Next
        </button>
      );
    } else if (currentStep == 3) {
      return (
        <Button
          className="btn btn-primary float-right my-0 mr-0"
          id="submitBtn"
          variant="primary"
          type="submit"
          disabled={
            !this.state.investmentGoal ||
            !this.state.investmentTerm ||
            !this.state.minInvestmentAmount ||
            !this.state.interestRate ||
            !this.state.agreeCheck
          }
        >
          {(() => {
            if (this.state.load) {
              return <LoaderOnConfirm />;
            } else {
              return <>Submit</>;
            }
          })()}
        </Button>
      );
    } else if (currentStep == 2) {
      return (
        <button
          className="btn btn-primary float-right border-0"
          id="submitBtn-standard"
          type="button"
          onClick={this._next}
          disabled={
            !this.state.addChecked
              ? !this.state.streetNameContact ||
                !this.state.suburbContact ||
                !this.state.stateContact ||
                !this.state.postcodeContact ||
                !this.state.nameContact ||
                !this.state.emailContact ||
                !this.state.phoneContact
              : !this.state.nameContact ||
                !this.state.emailContact ||
                !this.state.phoneContact
          }
        >
          Next Step
        </button>
      );
    }
    return null;
  }

  render() {
    let error = this.props.errors;

    if (this.state.currentStep == 1) {
      var stepCss = (
        <>
          <span className="assetFormProgress active">1</span>
          <span className="assetFormProgress">2</span>
          <span className="assetFormProgress">3</span>
        </>
      );
    } else if (this.state.currentStep == 2) {
      stepCss = (
        <>
          <span className="assetFormProgress currStep">
            {" "}
            <FontAwesomeIcon icon={faCheck} style={{ color: "white" }} />
          </span>
          <span className="assetFormProgress active">2</span>
          <span className="assetFormProgress ">3</span>
        </>
      );
    } else {
      stepCss = (
        <>
          <span className="assetFormProgress currStep">
            <FontAwesomeIcon icon={faCheck} style={{ color: "white" }} />
          </span>
          <span className="assetFormProgress currStep">
            <FontAwesomeIcon icon={faCheck} style={{ color: "white" }} />
          </span>
          <span className="assetFormProgress active">3</span>
        </>
      );
    }

    return (
      <div>
        {(() => {
          if (error.success == true && error.message && !this.state.load) {
            return (
              <SuccessToasts errors={error.message} setShow={this.setShow} />
            );
          }
        })()}
        <h1 className="primary-header mt-4">Asset Application</h1>
        <br />
        <hr />
        <div className="addAssetJumbotron">
          <div className="w-100 p-3">
            <div>
              <small className="text-muted">
                <p id="authFailed">
                  {error.success == false ? error.message : ""}
                </p>
              </small>
            </div>
            <div className="row">
              <div className="col-md-12 m-auto">
                <form onSubmit={this.onSubmit}>
                  {
                    {
                      1: (
                        <Step1
                          currentStep={this.state.currentStep}
                          onChange={this.onChange}
                          assetType={this.state.assetType}
                          assetTitle={this.state.assetTitle}
                          //updated
                          streetName={this.state.streetName}
                          suburb={this.state.suburb}
                          state={this.state.state}
                          postcode={this.state.postcode}
                          assetInfo={this.state.assetInfo}
                          description={this.state.description}
                          highlights={this.state.highlights}
                          handleAddHighlight={this.handleAddHighLight}
                          handleRemoveHighlight={this.handleRemoveHighlight}
                          handleDescriptionChange={this.handleDescriptionChange}
                        />
                      ),
                      2: (
                        <Step2
                          currentStep={this.state.currentStep}
                          onChange={this.onChange}
                          nameContact={this.state.nameContact}
                          emailContact={this.state.emailContact}
                          phoneContact={this.state.phoneContact}
                          streetNameContact={this.state.streetNameContact}
                          suburbContact={this.state.suburbContact}
                          stateContact={this.state.stateContact}
                          postcodeContact={this.state.postcodeContact}
                          addChecked={this.state.addChecked}
                          handleAddressCheck={this.handleAddressCheck}
                        />
                      ),
                      3: (
                        <Step3
                          currentStep={this.state.currentStep}
                          onChange={this.onChange}
                          investmentGoal={this.state.investmentGoal}
                          investmentTerm={this.state.investmentTerm}
                          minInvestmentAmount={this.state.minInvestmentAmount}
                          interestRate={this.state.interestRate}
                          load={this.state.load}
                          agreeCheck={this.state.agreeCheck}
                          handleAgreeCheck={this.handleAgreeCheck}
                          //cardData
                          assetTitle={this.state.assetTitle}
                          assetType={this.state.assetType}
                          suburb={this.state.suburb}
                          postcode={this.state.postcode}
                        />
                      ),
                    }[this.state.currentStep]
                  }
                  {this.previousButton()}
                  {this.nextButton()}
                </form>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="addAssetJumbotron mb-3">{stepCss}</div>
      </div>
    );
  }
}

function Step1(props) {
  if (props.currentStep !== 1) {
    return null;
  }

  return (
    <>
      <Card className="p-3 border-0">
        <Row className="assetView">
          <Col>
            <div className="form-group">
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Col xs={4} className="propertyTypeRadioCol">
                  <h5 className="mb-3">
                    <b>Type and Title</b>
                  </h5>
                  <Form.Label className="addAssetFormLabels">
                    Choose your asset type:
                  </Form.Label>
                  <br />
                  <Card id="propertyTypeCard">
                    <label className="propertyTypeRadioDiv">
                      <div className="my-3">
                        <FontAwesomeIcon
                          id="formIcons"
                          icon={faBuilding}
                          style={{ color: "#282c35" }}
                        />
                        <h6>Property</h6>
                        <Form.Check
                          type="radio"
                          name="assetType"
                          id="mb-3"
                          value="Property"
                          assetType={props.value}
                          onChange={props.onChange}
                        />
                        {/*  <div className="borderActive"></div> */}
                      </div>
                    </label>
                  </Card>
                </Col>
                <Col xs={4} className="propertyTypeRadioCol">
                  <Card id="propertyTypeCard">
                    <label className="propertyTypeRadioDiv">
                      <div className="my-3">
                        <FontAwesomeIcon
                          id="formIcons"
                          icon={faPercentage}
                          style={{ color: "#ac162c" }}
                        />
                        <h6>Private Debt</h6>
                        <Form.Check
                          type="radio"
                          name="assetType"
                          id="mb-3"
                          value="Private Debt"
                          assetType={props.value}
                          onChange={props.onChange}
                        />
                      </div>
                    </label>
                  </Card>
                </Col>
                <Col xs={4} className="propertyTypeRadioCol">
                  <Card id="propertyTypeCard">
                    <label className="propertyTypeRadioDiv">
                      <div className="my-3">
                        <FontAwesomeIcon
                          id="formIcons"
                          icon={faHandHoldingUsd}
                          style={{ color: "#779cab" }}
                        />
                        <h6>Private Equity</h6>
                        <Form.Check
                          type="radio"
                          name="assetType"
                          id="mb-3"
                          value="Private Equity"
                          assetType={props.value}
                          onChange={props.onChange}
                        />
                      </div>
                    </label>
                  </Card>
                </Col>
              </Form.Group>
            </div>
          </Col>
        </Row>
        <Col>
          <div className="form-group">
            <Form.Label className="addAssetFormLabels">
              Name your asset:
            </Form.Label>
            <input
              type="text"
              className="my-2 p-3 rounded form-control form-control-lg addAssetInput"
              id="formFocus"
              placeholder="SILC Asset 1"
              name="assetTitle"
              value={props.assetTitle}
              onChange={props.onChange}
              required
            />
          </div>
        </Col>
      </Card>
      <hr />
      <Card className="p-3 border-0 mb-2">
        <Col>
          <h5 className="mb-3">
            <b>Location and Information</b>
          </h5>
          <Row className="assetView">
            <Col xs={6}>
              <div className="form-group">
                <Form.Label className="addAssetFormLabels">Street:</Form.Label>
                <input
                  type="text"
                  className="my-2 p-3 rounded form-control form-control-lg addAssetInput"
                  id="formFocus"
                  placeholder="123 Queen St"
                  name="streetName"
                  value={props.streetName}
                  onChange={props.onChange}
                  required
                />
              </div>
            </Col>
            <Col xs={6}>
              <div className="form-group">
                <Form.Label className="addAssetFormLabels">Suburb:</Form.Label>
                <input
                  type="text"
                  className="my-2 p-3 rounded form-control form-control-lg addAssetInput"
                  id="formFocus"
                  placeholder="Melbourne"
                  name="suburb"
                  value={props.suburb}
                  onChange={props.onChange}
                  required
                />
              </div>
            </Col>
          </Row>
          <Row className="assetView">
            <Col xs={6}>
              <div className="form-group">
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label className="addAssetFormLabels">State:</Form.Label>
                  <Form.Control
                    as="select"
                    name="state"
                    className="my-2 rounded form-control form-control-lg addAssetInput"
                    value={props.state}
                    onChange={props.onChange}
                    required
                  >
                    <option value="">State</option>
                    <option value="ACT">ACT</option>
                    <option value="NSW">NSW</option>
                    <option value="NT">NT</option>
                    <option value="QLD">QLD</option>
                    <option value="SA">SA</option>
                    <option value="VIC">VIC</option>
                    <option value="TAS">TAS</option>
                    <option value="WA">WA</option>
                  </Form.Control>
                </Form.Group>
              </div>
            </Col>
            <Col xs={6}>
              <div className="form-group">
                <Form.Label className="addAssetFormLabels">
                  Postcode:
                </Form.Label>
                <input
                  type="text"
                  className="my-2 p-3 rounded form-control form-control-lg addAssetInput"
                  id="formFocus"
                  placeholder="3000"
                  name="postcode"
                  value={props.postcode}
                  onChange={props.onChange}
                  required
                />
              </div>
            </Col>
          </Row>
          <Row className="assetView">
            <Col>
              <div className="form-group">
                <Form.Label className="addAssetFormLabels">
                  Asset Details:
                </Form.Label>
                <textarea
                  className="my-2 p-3 rounded form-control form-control-lg addAssetInput"
                  id="formFocus"
                  placeholder="Asset Summary"
                  name="assetInfo"
                  value={props.assetInfo}
                  onChange={props.onChange}
                  required
                />
              </div>
            </Col>
          </Row>
          <Row className="assetView">
            <Col>
              <div className="form-group">
                <Form.Label className="addAssetFormLabels">
                  Add Highlights:
                </Form.Label>
                <br />
                {props.highlights.map((highlight, index) => (
                  <React.Fragment key={index}>
                    <div className="form-group">
                      <input
                        className="my-2 p-3 rounded form-control form-control-lg addField-animated addAssetInput"
                        id="formFocus"
                        placeholder="Asset Highlight"
                        value={props.highlight}
                        onChange={props.handleDescriptionChange(index)}
                        required
                      />
                      {console.log("high")}
                      {console.log(highlight)}
                      {console.log(props.highlights)}
                    </div>

                    <button
                      onClick={props.handleRemoveHighlight(index)}
                      className="btn btn-danger mr-2 text-muted bg-transparent"
                    >
                      <FontAwesomeIcon icon={faMinus} className="text-muted" />
                    </button>
                  </React.Fragment>
                ))}
                <button
                  onClick={props.handleAddHighlight}
                  className="btn btn-success text-muted bg-transparent"
                >
                  {props.highlights.length <= 0 ? (
                    "Add Highlights"
                  ) : (
                    <FontAwesomeIcon icon={faPlus} className="text-muted" />
                  )}
                </button>
              </div>
            </Col>
          </Row>
        </Col>
      </Card>
    </>
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null;
  }
  return (
    <>
      <Card className="p-3 border-0 mb-2">
        <Col>
          <h5>
            <b>Primary Contact</b>
          </h5>
          <Row className="assetView">
            <Col xs={6}>
              <div className="form-group">
                <Form.Label className="addAssetFormLabels">Name:</Form.Label>
                <input
                  type="text"
                  className="my-2 p-3 rounded form-control form-control-lg addAssetInput"
                  id="formFocus"
                  placeholder="name"
                  name="nameContact"
                  value={props.nameContact}
                  onChange={props.onChange}
                  required
                />
              </div>
            </Col>
            <Col xs={6}>
              <div className="form-group">
                <Form.Label className="addAssetFormLabels">Email:</Form.Label>
                <input
                  type="email"
                  className="my-2 p-3 rounded form-control form-control-lg addAssetInput"
                  id="formFocus"
                  placeholder="email"
                  name="emailContact"
                  value={props.emailContact}
                  onChange={props.onChange}
                  required
                />
              </div>
            </Col>
          </Row>
          <Row className="assetView">
            <Col xs={6}>
              <div className="form-group">
                <Form.Label className="addAssetFormLabels">Phone:</Form.Label>
                <input
                  type="tel"
                  className="my-2 p-3 rounded form-control form-control-lg addAssetInput"
                  id="formFocus"
                  placeholder="phone"
                  name="phoneContact"
                  value={props.phoneContact}
                  onChange={props.onChange}
                  required
                />
              </div>
            </Col>
            <Col xs={6}>
              <div className="form-group">
                <Form.Label className="addAssetFormLabels">Address:</Form.Label>

                <Form.Control
                  as="checkbox"
                  name="sameAdd"
                  className="my-2 rounded form-control form-control-lg addAssetInput"
                  onChange={props.handleAddressCheck}
                >
                  <Form.Check
                    label="Same as account holder"
                    name="sameAdd"
                    type="checkbox"
                    id={`inline-checkbox-4`}
                    checked={props.addChecked}
                  />
                </Form.Control>
              </div>
            </Col>
          </Row>
          {props.addChecked != true ? (
            <>
              <div
                className="w-100 border-bottom text-center mb-5"
                style={{ height: "20px" }}
              >
                <span style={{ padding: "0 10px", backgroundColor: "#f2f2f2" }}>
                  <b>Fill if address isn't the same as the profile</b>
                </span>
              </div>
              <Row className="assetView">
                <Col xs={6}>
                  <div className="form-group">
                    <Form.Label className="addAssetFormLabels">
                      Street:
                    </Form.Label>
                    <input
                      type="text"
                      className="my-2 p-3 rounded form-control form-control-lg addAssetInput"
                      id="formFocus"
                      placeholder="123 Queen St"
                      name="streetNameContact"
                      value={props.streetNameContact}
                      onChange={props.onChange}
                    />
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="form-group">
                    <Form.Label className="addAssetFormLabels">
                      Suburb:
                    </Form.Label>
                    <input
                      type="text"
                      className="my-2 p-3 rounded form-control form-control-lg addAssetInput"
                      id="formFocus"
                      placeholder="Melbourne"
                      name="suburbContact"
                      value={props.suburbContact}
                      onChange={props.onChange}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="assetView">
                <Col xs={6}>
                  <div className="form-group">
                    <Form.Group controlId="exampleForm.ControlSelect2">
                      <Form.Label className="addAssetFormLabels">
                        State:
                      </Form.Label>
                      <Form.Control
                        as="select"
                        name="stateContact"
                        className="my-2 rounded form-control form-control-lg addAssetInput"
                        onChange={props.onChange}
                        value={props.stateContact}
                      >
                        <option value="">State</option>
                        <option value="ACT">ACT</option>
                        <option value="NSW">NSW</option>
                        <option value="NT">NT</option>
                        <option value="QLD">QLD</option>
                        <option value="SA">SA</option>
                        <option value="VIC">VIC</option>
                        <option value="TAS">TAS</option>
                        <option value="WA">WA</option>
                      </Form.Control>
                    </Form.Group>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="form-group">
                    <Form.Label className="addAssetFormLabels">
                      Postcode:
                    </Form.Label>
                    <input
                      type="text"
                      className="my-2 p-3 rounded form-control form-control-lg addAssetInput"
                      id="formFocus"
                      placeholder="3000"
                      name="postcodeContact"
                      value={props.postcodeContact}
                      onChange={props.onChange}
                    />
                  </div>
                </Col>
              </Row>
            </>
          ) : (
            ""
          )}
        </Col>
      </Card>
    </>
  );
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null;
  }
  return (
    <>
      <Card className="p-3 border-0 mb-2">
        <Col>
          <h5>
            <b>Terms</b>
          </h5>
          <Row className="mb-4">
            <Col>
              <Row className="assetView">
                <Col>
                  <div className="form-group">
                    <Form.Label className="addAssetFormLabels">
                      Investment Goal ($):
                    </Form.Label>
                    <input
                      type="number"
                      className="my-2 p-3 rounded form-control form-control-lg addAssetInput"
                      id="formFocus"
                      placeholder="800000"
                      name="investmentGoal"
                      value={props.investmentGoal}
                      onChange={props.onChange}
                      required
                    />
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <Form.Label className="addAssetFormLabels">
                      Investment Term (months):
                    </Form.Label>
                    <input
                      type="text"
                      className="my-2 p-3 rounded form-control form-control-lg addAssetInput"
                      id="formFocus"
                      placeholder="10"
                      name="investmentTerm"
                      value={props.investmentTerm}
                      onChange={props.onChange}
                      required
                    />
                  </div>
                </Col>
              </Row>
              <Row className="assetView">
                <Col>
                  <div className="form-group">
                    <Form.Label className="addAssetFormLabels">
                      Min Investment Amount ($):
                    </Form.Label>
                    <input
                      type="number"
                      className="my-2 p-3 rounded form-control form-control-lg addAssetInput"
                      id="formFocus"
                      placeholder="200000"
                      name="minInvestmentAmount"
                      value={props.minInvestmentAmount}
                      onChange={props.onChange}
                      required
                    />
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <Form.Label className="addAssetFormLabels">
                      Target Return (%):
                    </Form.Label>
                    <input
                      type="number"
                      className="my-2 p-3 rounded form-control form-control-lg addAssetInput"
                      id="formFocus"
                      placeholder="4"
                      name="interestRate"
                      value={props.interestRate}
                      onChange={props.onChange}
                      required
                    />
                  </div>
                </Col>
              </Row>

              <Form.Group>
                <Form.Control
                  as="checkbox"
                  name="agreeCheck"
                  onChange={props.handleAgreeCheck}
                  className="border-0"
                >
                  <Form.Check
                    type="checkbox"
                    label="I agree to the listing rules of this application."
                    checked={props.agreeCheck}
                  />
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Col>
      </Card>
    </>
  );
}

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createAsset })(withRouter(AddAsset));
