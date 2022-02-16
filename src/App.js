import "./App.css";
import AMdashboard from "./components/Dashboards/AMdashboard";
import InvestorDashboard from "./components/Dashboards/InvestorDashboard";
import NavbarHeader from "./components/Layout/NavbarHeader";
import AdminNavbarHeader from "./components/Admin-Layout/Admin-NavbarHeader";
import Sidebar from "./components/Layout/Sidebar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import AddAsset from "./components/Assets/AddAsset";
import { Provider } from "react-redux";
import store from "./store";
import AssetOverview from "./components/Assets/AssetOverview";
import Marketplace from "./components/Dashboards/Marketplace";
import SignIn from "./components/SignUp-SignIn/signinCard";
import Signup from "./components/SignUp-SignIn/signupCard";
import Verification from "./components/SignUp-SignIn/Verification";
import ResetPassword from "./components/SignUp-SignIn/ResetPassword";
import ResetPwVerification from "./components/SignUp-SignIn/ResetPwVerification";
import SelectGroup from "./components/Groups/Groups"
import AdminSigninCard from "./components/Admin-Login/Admin-SigninCard";
import AdminAssetDashboard from "./components/Admin-Dashboard/Admin-AssetDashboard";
import AdminSidebar from "./components/Admin-Layout/Admin-Sidebar";
import AdminAssetOverview from "./components/Admin-Assets/Admin-AssetOverview";
import AdminUserDashboard from "./components/Admin-Dashboard/Admin-UserDashboard";
import AdminAMOverview from "./components/Admin-Users/Admin-AMOverview";
import AdminInvOverview from "./components/Admin-Users/Admin-InvOverview";
import AdminAMInvOverview from "./components/Admin-Users/Admin-AM+InvOverview";
import AdminInvDashboard from "./components/Admin-Dashboard/Admin-InvDashboard";
import UserProfile from "./components/Dashboards/UserProfile";
import BasicUserDashboard from "./components/Dashboards/BasicUserDashboard";
import NotFound from "./components/Layout/NotFound";
import setToken from "./securityUtils/setToken";
import jwt_decode from "jwt-decode";
import { GET_LOGOUT_STATUS, SET_CURRENT_USER } from "./actions/types";
import axios from "axios";
import AdminGroupDashboard from "./components/Admin-Dashboard/Admin-GroupDashboard";
import AdminGroupOverview from "./components/Admin-Groups/Admin-GroupOverview";


const token = localStorage.getItem("token");

const MultipleSignIn = async () => {
  await axios.post("http://localhost:8000/api/checkToken").catch((error) => {
    localStorage.clear();
    window.location.reload();
  });
};

const AdminVerified = async () => {
  const res = await axios.get("http://localhost:8000/api/getLogoutStatus");

  store.dispatch({
    type: GET_LOGOUT_STATUS,
    payload: res.data,
  });

  const state = store.getState();
  const message = state.security.logoutStatus;
  return message;
};

if (token) {
  setToken(token);
  const decoded_jwtToken = jwt_decode(token);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken,
  });

  AdminVerified().then((result) => {
    console.log(result);
    if (result !== "") {
      axios.get('http://localhost:8000/api/logout')
      .then (()=>{
        localStorage.clear();
        alert(result);
        window.location.reload();
      })
    }
  });

  // window.location.reload();
  if (localStorage.getItem("tokenIsValid")) {
    MultipleSignIn();
  }
}

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("token");
  console.log("this", isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/SignIn" />
      }
    />
  );
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/SignIn" component={SignIn} />
            <Route exact path="/SignUp" component={Signup} />
            <Route exact path="/VerifyAccount/*" component={Verification} />
            <Route exact path="/verifyEmail" component={ResetPwVerification} />
            <Route exact path="/ResetPassword/*" component={ResetPassword} />
            {/* <Route exact path="/SelectGroup" component={SelectGroup} /> */}

            <Route exact path="/AdminSignIn" component={AdminSigninCard} />

            <ProtectedRoute
              exact
              path="/SelectGroup"
            >
              <div >
                <ProtectedRoute
                  exact
                  path="/SelectGroup"
                  component={SelectGroup}
                />
              </div>
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/AdminAssetDashboard/AdminAssetOverview/:id"
            >
              <AdminSidebar />
              <AdminNavbarHeader />
              <div className="content">
                <ProtectedRoute
                  exact
                  path="/AdminAssetDashboard/AdminAssetOverview/:id"
                  component={AdminAssetOverview}
                />
              </div>
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/AdminGroupDashboard/AdminGroupOverview/:id"
            >
              <AdminSidebar />
              <AdminNavbarHeader />
              <div className="content">
                <ProtectedRoute
                  exact
                  path="/AdminGroupDashboard/AdminGroupOverview/:id"
                  component={AdminGroupOverview}
                />
              </div>
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/AdminUserDashboard/AdminAM+InvOverview/:id"
            >
              <AdminSidebar />
              <AdminNavbarHeader />
              <div className="content">
                <ProtectedRoute
                  exact
                  path="/AdminUserDashboard/AdminAM+InvOverview/:id"
                  component={AdminAMInvOverview}
                />
              </div>
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/AdminUserDashboard/AdminAMOverview/:id"
            >
              <AdminSidebar />
              <AdminNavbarHeader />
              <div className="content">
                <ProtectedRoute
                  exact
                  path="/AdminUserDashboard/AdminAMOverview/:id"
                  component={AdminAMOverview}
                />
              </div>
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/AdminUserDashboard/AdminInvOverview/:id"
            >
              <AdminSidebar />
              <AdminNavbarHeader />
              <div className="content">
                <ProtectedRoute
                  exact
                  path="/AdminUserDashboard/AdminInvOverview/:id"
                  component={AdminInvOverview}
                />
              </div>
            </ProtectedRoute>

            <ProtectedRoute exact path="/AssetOverview/:id">
              <Sidebar />
              <NavbarHeader />
              <div className="content">
                <ProtectedRoute
                  exact
                  path="/AssetOverview/:id"
                  component={AssetOverview}
                />
              </div>
            </ProtectedRoute>

            {/* <ProtectedRoute
              exact
              path="/ResetPassword/verifyEmail"
              component={ResetPwVerification}
            /> */}

            <ProtectedRoute exact path="/NotFound">
              <Sidebar />
              <NavbarHeader />
              <div className="content">
                <ProtectedRoute exact path="/NotFound" component={NotFound} />
              </div>
            </ProtectedRoute>

            <ProtectedRoute exact path="/BasicUserDashboard">
              <Sidebar />
              <NavbarHeader />
              <div className="content">
                <ProtectedRoute
                  exact
                  path="/BasicUserDashboard"
                  component={BasicUserDashboard}
                />
              </div>
            </ProtectedRoute>

            <ProtectedRoute exact path="/AMdashboard">
              <Sidebar />
              <NavbarHeader />
              <div className="content">
                <ProtectedRoute
                  exact
                  path="/AMdashboard"
                  component={AMdashboard}
                />
              </div>
            </ProtectedRoute>

            <ProtectedRoute exact path="/InvDashboard">
              <Sidebar />
              <NavbarHeader />
              <div className="content">
                <ProtectedRoute
                  exact
                  path="/InvDashboard"
                  component={InvestorDashboard}
                />
              </div>
            </ProtectedRoute>

            <ProtectedRoute exact path="/Marketplace">
              <Sidebar />
              <NavbarHeader />
              <div className="content">
                <ProtectedRoute
                  exact
                  path="/Marketplace"
                  component={Marketplace}
                />
              </div>
            </ProtectedRoute>

            <ProtectedRoute exact path="/AdminAssetDashboard">
              <AdminSidebar />
              <AdminNavbarHeader />
              <div className="content">
                <ProtectedRoute
                  exact
                  path="/AdminAssetDashboard"
                  component={AdminAssetDashboard}
                />
              </div>
            </ProtectedRoute>

            <ProtectedRoute exact path="/AdminUserDashboard">
              <AdminSidebar />
              <AdminNavbarHeader />
              <div className="content">
                <ProtectedRoute
                  exact
                  path="/AdminUserDashboard"
                  component={AdminUserDashboard}
                />
              </div>
            </ProtectedRoute>

            <ProtectedRoute exact path="/AdminGroupDashboard">
              <AdminSidebar />
              <AdminNavbarHeader />
              <div className="content">
                <ProtectedRoute
                  exact
                  path="/AdminGroupDashboard"
                  component={AdminGroupDashboard}
                />
              </div>
            </ProtectedRoute>

            <ProtectedRoute exact path="/AdminInvDashboard">
              <AdminSidebar />
              <AdminNavbarHeader />
              <div className="content">
                <ProtectedRoute
                  exact
                  path="/AdminInvDashboard"
                  component={AdminInvDashboard}
                />
              </div>
            </ProtectedRoute>

            <ProtectedRoute exact path="/addAsset">
              <Sidebar />
              <NavbarHeader />
              <div className="content">
                <ProtectedRoute exact path="/addAsset" component={AddAsset} />
              </div>
            </ProtectedRoute>

            <ProtectedRoute exact path="/Profile">
              <Sidebar />
              <NavbarHeader />
              <div className="content">
                <ProtectedRoute exact path="/Profile" component={UserProfile} />
              </div>
            </ProtectedRoute>

            <Route exact path="*" component={SignIn} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
