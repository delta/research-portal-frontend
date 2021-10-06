import React from "react";
import "tailwindcss/tailwind.css";
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import SideBarMob from "./components/SideBarMob/SideBarMob";
import { useState } from "react";
import Home from "./components/Home";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Research from "./components/Research/Research";
import Professor from "./components/Professors/Professors";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
import CorrectionForm from "./components/CorrectionForm/CorrectionForm";
import UpdateRoles from "./components/Research/UpdateRoles";
import Lab from "./components/Labs/labs";
import Center from "./components/CentersOfExcellence/CentersOfExcellence";
import CreateProject from "./components/CreateProject/CreateProject";
import Project from "./components/Project/Project";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProjectResults from "./components/ProjectResults/ProjectResults";
import Profile from "./components/Profile/Profile";
import Resume from "./components/Resume/Resume.jsx";
import ResetPassword from "./components/ResetPassword/ResetPassword";

const Container = styled.div`
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(126, 7, 7, 0.3);
  }

  ::-webkit-scrollbar-thumb {
    background-color: #c729298b;
    border-radius: 4px;
  }
`;

const App = () => {
  const [state, setState] = useState("none");
  const [mobState, setMobState] = useState("none");
  const [hamburger, setHamburger] = useState("block");

  const closeSideBar = () => {
    if (state === "block") setState("none");
    if (mobState === "block") setState("none");
    setHamburger("block");
  };
  const toggleSideBar = () => {
    setState("block");
    setHamburger("none");
  };

  const toggleSideBarMobile = () => {
    if (mobState === "none") {
      setMobState("block");
    } else {
      setMobState("none");
    }
  };

  const NavigationBar = () => {
    const isAuthenticated = localStorage.getItem("email") != null;
    return (
      <div className="flex">
        <Router>
          <div className="flex-1">
            <NavBar
              toggleSideBar={toggleSideBar}
              toggleSideBarMobile={toggleSideBarMobile}
              hamburger={hamburger}
            ></NavBar>
            <div style={{ height: "88vh" }}>
              <Container
                className="h-full overflow-y-scroll"
                style={{ overflow: "scroll" }}
              >
                {/* Mobile Side Bar */}
                <div style={{ display: mobState }}>
                  <SideBarMob></SideBarMob>
                </div>
                <Switch>
                  <Route exact path="/login">
                    <Login />
                  </Route>
                  <Route exact path="/reset-password">
                    <ResetPassword />
                  </Route>
                  <Route exact path="/signup">
                    <Signup />
                  </Route>
                  {isAuthenticated ? (
                    <Route exact path="/">
                      <Profile />
                    </Route>
                  ) : (
                    <Route exact path="/">
                      <Home />
                    </Route>
                  )}
                  <Route exact path="/project/:id">
                    <Project />
                  </Route>
                  <Route exact path="/professors/:mail">
                    <Profile />
                  </Route>
                  <Route exact path="/professors">
                    <Professor />
                  </Route>
                  <Route exact path="/research">
                    <Research />
                  </Route>
                  <Route exact path="/edit-project/:id">
                    <CorrectionForm />
                  </Route>
                  <Route exact path="/create-project">
                    <CreateProject />
                  </Route>
                  <Route exact path="/update-role/:id">
                    <UpdateRoles />
                  </Route>
                  <Route exact path="/labs">
                    <Lab />
                  </Route>
                  <Route exact path="/results/:filterBy/:value">
                    <ProjectResults />
                  </Route>
                  <Route exact path="/home">
                    <Home />
                  </Route>
                  <Route exact path="/profile">
                    <Profile />
                  </Route>
                  <Route exact path="/resume">
                    <Resume />
                  </Route>
                  <Route exact path="/centers-of-excellence">
                    <Center />
                  </Route>
                </Switch>
              </Container>
            </div>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
          <div style={{ display: state }}>
            <SideBar closeSideBar={closeSideBar}></SideBar>
          </div>
        </Router>
      </div>
    );
  };

  return (
    <div>
      <NavigationBar />
    </div>
  );
};

export default App;
