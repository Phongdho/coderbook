import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, Navigate } from "react-router-dom";

import {
  Col,
  Row,
  Card,
  Form,
  Modal,
  Button,
  Container,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import "./style.css";

import { authActions } from "../../redux/actions";

import Footer from "../../components/Footer";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [user, setUser] = useState({ firstName:"", lastName:"", date: "", gender: "", email: "", password: "" });
  const [show, setShow] = useState(false);

  const onToggleModal = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const onLogin = (e) => {
    e.preventDefault();
    dispatch(authActions.loginRequest(user.email, user.password));
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value});
  }

  const handleClick = (e) => {
    if(e.target.checked) {
      // console.log("gender nè", e.target.id);
      setUser({...user, [e.target.name]: e.target.id});
    };
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(authActions.register(user.firstName, user.lastName, user.date, user.gender, user.email, user.password));
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Coderbook - Login or Sign Up</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Container
        fluid
        className="min-vh-100 d-flex flex-column align-items-center justify-content-center"
      >
        <Row>
          <Col className="d-flex flex-column justify-content-center align-items-center align-items-md-start">
            <h1 className="text-primary text-sm-left">coderbook</h1>
            <p className="header">
              Coderbook let's you share with your friends and family.
            </p>
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <Card style={{ width: "30rem" }} className="p-3 box-shadow">
              <Form className="d-flex flex-column justify-content-center align-content-center text-align-center">
                <Form.Group controlId="email">
                  <Form.Control
                    type="email"
                    onChange={onChange}
                    placeholder="Email or Phone Number"
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={onChange}
                  />
                </Form.Group>
                <Button
                  block
                  type="submit"
                  variant="primary"
                  onClick={onLogin}
                  className="font-weight-bold"
                >
                  Login
                </Button>
                <Form.Group
                  className="mx-auto mt-3"
                  controlId="formBasicPassword"
                >
                  <Link className="" to="#">
                    Forgot Password?
                  </Link>
                </Form.Group>
                <hr className="hr" />
                <Button
                  type="submit"
                  variant="success"
                  onClick={onToggleModal}
                  className="mx-auto w-50 font-weight-bold"
                >
                  Create an account
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal
        show={show}
        dialogClassName="modal-90w"
        onHide={() => setShow(false)}
        aria-labelledby="example-custom-modal-styling-title"
        className="d-flex align-items-center justify-content-center"
      >
        <Modal.Header>
          <Modal.Title>
            Sign Up
            <p className="text-secondary font-weight-light p-modal">
              It's quick and easy.
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* STEP 1 */}
          <Form 
              onSubmit={handleOnSubmit}
              className="d-flex flex-column justify-content-center">
            <Form.Row>
              {/* <Form.Group as={Col} controlId="name">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="name"
                    name="name"
                    placeholder="Your Name"
                    onChange={handleOnChange}
                  />
              </Form.Group> */}
              <Form.Group as={Col} controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="firstName"
                  name="firstName"
                  placeholder="Your First Name"
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="lastName"
                  name="lastName"
                  placeholder="Your Last Name"
                  onChange={handleOnChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleOnChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group controlId="date" bsSize="large" as={Col}>
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  onChange={handleOnChange}/>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group controlId="gender" as={Col}>
                <Form.Label>Gender</Form.Label>
                <Form.Check
                  type="radio"
                  label="Male"
                  name="gender"
                  id="male"
                  onClick={handleClick}
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  name="gender"
                  id="female"
                  onClick={handleClick}
                />
              </Form.Group>
            </Form.Row>
            <p className="text-center p-terms">
              By clicking Sign Up, you agree to our Terms, Data Policy and
              Cookie Policy. You may receive SMS notifications from us and can
              opt out at any time.
            </p>
            <Button className="mx-auto w-50" variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Footer />
    </div>
  );
}
