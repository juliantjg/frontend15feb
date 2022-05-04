import React, { Component } from "react";
import AssetItem from "../Assets/AssetItem";
import { Row, Col, DropdownButton, Dropdown, Tabs, Tab } from "react-bootstrap";
import "react-input-range/lib/css/index.css";
import { connect } from "react-redux";
import { getAssets, getPastAssets } from "../../actions/assetAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faBookmark,
  faKey,
  faCheckSquare,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { ShimmerCard } from "../stylesheet/Loader";
import BookmarkButton from "../Assets/BookmarkButton";
import AssetBookmark from "../Assets/AssetBookmark";
import axios from "axios";
import Footer from "../Layout/Footer"


class AMdashboard extends Component {
  constructor() {
    super();
    this.state = {
      load: false,
      bookmarkData: [],
      sentenceId: 0,
      searchData: [],
      searchText: "",
    };
    this.bookmark = this.bookmark.bind(this);
    this.handleSearchAsset = this.handleSearchAsset.bind(this);
    this.handleClearSearch = this.handleClearSearch.bind(this);
  }

  searchController(val, item) {
    return val.toLowerCase().includes(item.toLowerCase());
  }

  handleSearchAsset(e) {
    const seachedItem = e.target.value;
    this.setState({ searchText: seachedItem });
    const newFilter = this.props.asset.allData.filter((value) => {
      if (this.searchController(value.assetTitle, seachedItem)) {
        /* return value.assetTitle.toLowerCase().includes(seachedItem.toLowerCase()); */
        return this.searchController(value.assetTitle, seachedItem);
      } else if (this.searchController(value.assetType, seachedItem)) {
        /* return value.assetType.toLowerCase().includes(seachedItem.toLowerCase()); */
        return this.searchController(value.assetType, seachedItem);
      }
      /*  return value.assetTitle.toLowerCase().includes(seachedItem.toLowerCase()); */
    });
    if (seachedItem === "") {
      this.setState({ searchData: [] });
    } else {
      this.setState({ searchData: newFilter });
    }
  }

  handleClearSearch() {
    this.setState({ searchData: [] });
    this.setState({ searchText: "" });
  }

  sortState = {
    menus: [
      { id: 0, menu: "Default", urlLink: "/Marketplace" },
      { id: 1, menu: "Property Type", urlLink: "/Marketplace" },
      { id: 2, menu: "Investment Term", urlLink: "/Marketplace" },
      { id: 3, menu: "Min Investment", urlLink: "/Marketplace" },
      { id: 4, menu: "Max Investment", urlLink: "/Marketplace" },
    ],
  };

  addClass = (e) => {
    this.setState({
      menus: this.sortState.menus.map((menu) => ({
        ...menu,
        isActive: e.target.id == menu.id,
      })),
    });

    switch (e.target.id) {
      case "0":
        this.props.asset.allData.sort((a, b) => (a.id > b.id ? 1 : -1));
        return;
      case "1":
        this.props.asset.allData.sort((a, b) =>
          a.assetType > b.assetType ? 1 : -1
        );
        return;
      case "2":
        this.props.asset.allData.sort((a, b) =>
          a.investmentTerm > b.investmentTerm ? 1 : -1
        );
        console.log(e.target.menu);
        return;
      case "3":
        this.props.asset.allData.sort((a, b) =>
          a.minInvestmentAmount > b.minInvestmentAmount ? 1 : -1
        );
        console.log(e.target.menu);
        return;
      case "4":
        this.props.asset.allData.sort((a, b) =>
          a.assetType > b.assetType ? 1 : -1
        );
        return;
      default:
        console.log(e.target.id);
        return;
    }

    /*  console.log(e.target.id); */
  };

  async componentDidMount() {
    this.setState({ load: true }, () => {
      this.props
        .getAssets()
        .then(() => {
          this.setState({ load: false });
        })
        .then(() => {
          this.props.getPastAssets();
        })
        .catch(() => {
          this.setState({ load: false });
        });
    });

    await axios.get(`http://ec2-3-25-245-63.ap-southeast-2.compute.amazonaws.com:8000/api/bookmarks`).then((response) => {
      this.setState({ bookmarkData: response.data.data });
    });

    this.timeout = setInterval(() => {
      let currentSentenceId = this.state.sentenceId;
      this.setState({ sentenceId: currentSentenceId + 1 });
    }, 4000);
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  async bookmark() {
    this.setState({ load: true }, () => {
      this.props
        .getAssets()
        .then(() => {
          this.setState({ load: false });
        })
        .catch(() => {
          this.setState({ load: false });
        });
    });

    await axios.get(`http://ec2-3-25-245-63.ap-southeast-2.compute.amazonaws.com:8000/api/bookmarks`).then((response) => {
      this.setState({ bookmarkData: response.data.data });
    });

    console.log("allData: " + this.state.bookmarkData);
  }

  render() {
    const { allData } = this.props.asset;
    const { allPastData } = this.props.asset;

    const tabData = [
      {
        id: 0,
        title: <b>Current</b>,
      },
      {
        id: 1,
        title: <b>Successful</b>,
      },
    ];

    const info1 = (
      <>
        Navigate to the icon{" "}
        <FontAwesomeIcon icon={faBookmark} color="#ac162c" /> and see all your
        saved assets.
      </>
    );
    const info2 = (
      <>
        Easily sort the marketplace assets using the{" "}
        <FontAwesomeIcon icon={faSort} color="#2D87E2" /> icon.
      </>
    );
    const info3 = (
      <>
        The <FontAwesomeIcon icon={faKey} color="#2D87E2" /> icon represents the
        assets you can manage.
      </>
    );
    const info4 = (
      <>
        The <FontAwesomeIcon icon={faCheckSquare} color="#008000" /> icon
        confirms that the asset has been verified.
      </>
    );

    const sentenceArray = [info1, info2, info3, info4];
    let sentenceArraySwap =
      sentenceArray[this.state.sentenceId % sentenceArray.length];

    let addToBookmark = {
      variant: "none",
      // borderColor: "#ac162c",
      color: "#ac162c",
      text: "add",
      icon: "faBookmark",
    };
    let removeFromBookmark = {
      variant: "none",
      // backgroundColor: "#ac162c",
      color: "#ac162c",
      text: "remove",
      icon: "faBookmark",
    };
    let disabledBookmark = {
      variant: "none",
      text: "Owned",
    };

    return (
      <div>
        <div className="d-inline-block w-100">
          <hr id="hr" />
          <h1 className="primary-header">Marketplace</h1>
          {/*  <br />
         <span className="text-muted p-3 d-inline-block">{sentenceArraySwap}</span> */}
          {/* ----------------------Search----------------------------*/}

          <div className="allFilters">
            <div className="searchInputDiv">
              <input
                type="text"
                placeholder="Search Assets"
                value={this.state.searchText}
                onChange={this.handleSearchAsset}
                className="searchInput"
              />
              <div className="searchIcon">
                {this.state.searchData.length === 0 ? (
                  <FontAwesomeIcon icon={faSearch} />
                ) : (
                  <FontAwesomeIcon
                    icon={faTimes}
                    id="clearBtn"
                    onClick={this.handleClearSearch}
                  />
                )}
              </div>

              {this.state.searchData.length != 0 && (
                <div className="dataResult">
                  {this.state.searchData.map((value, key) => {
                    return (
                      <a
                        className="dataItem"
                        href={`/AssetOverview/${value.id}`}
                      >
                        <p>
                          {value.assetTitle}
                          <br />
                          <small className="text-muted">
                            {value.assetType}
                          </small>
                        </p>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
            {/* ----------------------End of Search----------------------------*/}

            {/* ----------------------Asset Sort button ----------------------------*/}
            <Dropdown className="sortDropdown">
              <DropdownButton className="" onClick={this.displayType}>
                {/*  <FontAwesomeIcon id="dropIcon" icon={faSort} size="lg" />  */}
                <div className="sortDropdown-content">
                  {this.sortState.menus.map((menu) => (
                    <Dropdown.Item
                      key={menu.id}
                      style={{ color: menu.isActive ? "#ac162c" : "" }}
                      className={` ${menu.isActive ? "active" : ""}`}
                      id={menu.id}
                      onClick={this.addClass}
                      to={menu.urlLink}
                    >
                      {menu.menu}
                    </Dropdown.Item>
                  ))}
                </div>
              </DropdownButton>
            </Dropdown>

            {/* ------------------------- End of Asset Sort -------------------------------- */}
            {/* ----------------------Bookmark----------------------------*/}
            {(() => {
              if (localStorage.getItem("scopes") !== "basic") {
                return <AssetBookmark allData={this.state.bookmarkData} />;
              }
            })()}
          </div>
        </div>
        {/* ----------------------End of Bookmark----------------------------*/}
        <div>
          <br />
          <Tabs
            defaultActiveKey={0}
            id="uncontrolled-tab-example"
            className="mb-3 marketplaceTabs"
            // style={{ borderRadius: "8px" }}
            /* variant="pills" */
          >
            {tabData.map((tabs) => (
              <Tab eventKey={tabs.id} title={tabs.title}>
                {tabs.id == 0 ? (<span className="text-muted p-3 d-inline-block">
                  {sentenceArraySwap}
                </span>) :("")}
                <div className="assetCardContainer">
                  <div className="flexCol2">
                    {(() => {
                      if (this.state.load) {
                        var arr = [];
                        for (var i = 0; i < 4; i++) {
                          arr.push(i + 1);
                        }
                        return (
                          <div>
                            <ShimmerCard />
                            <div className="shimmerBG title-line"></div>
                          </div>
                        );
                      } else {
                        return (
                          <>
                            <Row>
                              {tabs.id == 0 ? (
                                allData.map((assetItem) => (
                                  <Col
                                    key={assetItem.id}
                                    sm={12}
                                    md={6}
                                    lg={3}
                                    xl={3}
                                  >
                                    <div className="position-relative">
                                      <AssetItem asset={assetItem} />

                                      {(() => {
                                        if (
                                          localStorage.getItem("scopes") !=
                                          "basic"
                                        ) {
                                          if (
                                            localStorage.getItem("id") ==
                                            assetItem.user_id
                                          ) {
                                            return (
                                              <BookmarkButton
                                                assetItem={assetItem.id}
                                                bookmark={this.bookmark}
                                                bookmarkStyle={disabledBookmark}
                                                disabled={true}
                                              />
                                            );
                                          } else if (assetItem.bookmark) {
                                            return (
                                              <BookmarkButton
                                                assetItem={assetItem.id}
                                                bookmark={this.bookmark}
                                                bookmarkStyle={
                                                  removeFromBookmark
                                                }
                                                disabled={false}
                                              />
                                            );
                                          } else {
                                            return (
                                              <BookmarkButton
                                                assetItem={assetItem.id}
                                                bookmark={this.bookmark}
                                                bookmarkStyle={addToBookmark}
                                                disabled={false}
                                              />
                                            );
                                          }
                                        }
                                      })()}
                                    </div>
                                  </Col>
                                ))
                              ) : allPastData.length != 0 ? (
                                allPastData.map((assetItem) => (
                                  <Col
                                    key={assetItem.id}
                                    sm={12}
                                    md={6}
                                    lg={3}
                                    xl={3}
                                  >
                                    <div className="position-relative">
                                      <AssetItem asset={assetItem} />
                                    </div>
                                  </Col>
                                ))
                              ) : (
                                <div className="text-muted p-3 d-inline-block">
                                  <h5>
                                    All 100% invested assets will appear here
                                  </h5>
                                </div>
                              )}
                            </Row>
                          </>
                        );
                      }
                    })()}
                  </div>
                  <br />
                </div>
              </Tab>
            ))}
          </Tabs>
        </div>
       <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  asset: state.asset,
  pastAssets: state.asset.pastAssets,
});

export default connect(mapStateToProps, { getAssets, getPastAssets })(
  AMdashboard
);
