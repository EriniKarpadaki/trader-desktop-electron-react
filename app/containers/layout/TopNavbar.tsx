import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const { ipcRenderer } = require('electron');

const TopNavbar = () => {
  const ipcRendererMsg = (page: number) => {
    // 0: inquiry page, 1: offering page
    console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // prints "pong"

    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      console.log(arg); // prints "pong"
    });
    ipcRenderer.send('asynchronous-message', page);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>Trader Desktop</Navbar.Brand>
      <Nav className="link-container">
        <Nav.Link onClick={() => ipcRendererMsg(0)} id="inquiryLink">
          Inquiries
        </Nav.Link>
        <Nav.Link onClick={() => ipcRendererMsg(1)} id="offeringLink">
          Offerings
        </Nav.Link>
        <Nav.Link id="positionLink">Positions</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default TopNavbar;
