import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/AuthSlice";
import { useLogoutMutation } from "../slices/UserApiSlice";
import { toast } from "react-toastify";

const Header = () => {
  const { cartItem } = useSelector((state) => state.cartSlice);
  const { userInfo } = useSelector((state) => state.Auth);
  console.log(userInfo)

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [logoutcallapi] = useLogoutMutation();

  const Handler_logout = async () => {
    console.log("logout called")
    try {
      await logoutcallapi().unwrap();
      dispatch(logout()); 
      navigate("/login");  
      toast.success("you have logged out");
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(cartItem[0].name+" "+cartItem[0].qty)//item1
  // console.log(cartItem[1].name +" "+cartItem[1].qty)//item2
  // console.log(cartItem[2].name+" "+cartItem[2].qty)//item3

  return (
    <>
      <header>
        <Navbar expand="md" className="nav_header">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>
                <img src={logo} alt="logo" className="logo" />
                <span className="logo_text">Shop</span>
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <FaShoppingCart />
                    Cart
                    {cartItem.length > 0 && (
                      <span className="badge badge-pill count-cart text-center">
                        {cartItem.reduce((a, b) => a + Number(b.qty), 0)}
                      </span>
                    )}
                  </Nav.Link>
                </LinkContainer>
              
                 {userInfo? (
                    <NavDropdown title={userInfo.user} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={Handler_logout}> Logout </NavDropdown.Item>
                  </NavDropdown>
                  ):(
                    <LinkContainer to="/login">
                    <Nav.Link>
                      <FaUser />
                      Login
                    </Nav.Link>
                  </LinkContainer>
                  )
                 }
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
