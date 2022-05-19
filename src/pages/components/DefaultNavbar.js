import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Media,
} from "reactstrap";

const DefaultNavbar = ({ title, photoURL, displayName }) => {
  
  return (
    <>
      <Navbar className="navbar-top navbar-horizontal bg-white navbar-light box-me-up zind-home-prof" expand="md">
        <Container className="px-4">
          <NavbarBrand className="mr-lg-2">
            <span className="text-capitalize">{title}</span>
          </NavbarBrand>
          <span>
            <Media className="align-items-center">
              {photoURL && photoURL !== '' ? <span className="avatar avatar-sm rounded-circle">
                <img alt="..." src={photoURL} />
              </span> : <span className="avatar avatar-sm rounded-circle">
                <img alt="..."
                  src={require("assets/img/brand/avatar-placeholder.png")}
                />
              </span>}
              <Media className="ml-2 d-none d-lg-block">
                {displayName && <span className="mb-0 text-sm text-dark font-weight-bold">
                  {displayName}
                </span>}
              </Media>
            </Media>
          </span>
        </Container>
      </Navbar>
    </>
  );
};

export default DefaultNavbar;
