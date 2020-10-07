import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';

const TopNavbar = () => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/inquiry">Trader Desktop</Navbar.Brand>
    <Nav className="link-container">
      <Nav.Link href={`#${routes.INQUIRY}`} target="_blank" id="inquiryLink">
        Inquiries
      </Nav.Link>
      <Nav.Link href={`#${routes.OFFERING}`} target="_blank" id="offeringLink">
        Offerings
      </Nav.Link>
      <Nav.Link id="positionLink">Positions</Nav.Link>
    </Nav>
  </Navbar>
);

export default TopNavbar;
