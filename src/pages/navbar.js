import { React } from 'react';
import { Outlet, Link, useParams, NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Container, Nav, Navbar, NavbarBrand } from 'react-bootstrap';

export default function NavBar() {
  return (<>
  
    <Navbar bg="dark" data-bs-theme="dark" sticky='top'>
      <Container>
        <Navbar.Brand className="fw-bold font-monospace">UniSystem</Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to="/degrees">Degrees </Nav.Link>
          <Nav.Link as={Link} to="/modules">Modules </Nav.Link>
          <Nav.Link as={Link} to="/cohorts">Cohorts </Nav.Link>
          <Nav.Link as={Link} to="/createdegree">Create Degree </Nav.Link>
          <Nav.Link as={Link} to="/createmodule">Create Module </Nav.Link>
          <Nav.Link as={Link} to="/createcohort">Create Cohort </Nav.Link>
          <Nav.Link as={Link} to="/createstudent">Create Student </Nav.Link>
          {/* <Nav.Link to="/"></Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
    
    <Outlet/>
    
  </>);
}

