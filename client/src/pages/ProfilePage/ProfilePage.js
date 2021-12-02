import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Row, Col, Nav, Button, Container, ButtonGroup } from "react-bootstrap";
import { authActions, userActions, postActions } from "../../redux/actions";
import Post from "../../components/Post";
import "./style.css";

import Composer from "../../components/Composer/Composer";

export default function ProfilePage() {

  const params = useParams();
  const {name} = params;
  const dispatch = useDispatch();
  //login user
  const user = useSelector((state) => state.auth.user);

  //users that match with the slug: other users
  const otherUser = useSelector(state => state.user.otherUser);

  //all the posts display on profile page(related to the slug user)
  const posts = useSelector((state) => state.post.posts);
  console.log("post nè", posts);

  // console.log("it's me", user);
  // useEffect(() => {
  //   dispatch(authActions.getCurrentUser());
  // }, []);

  useEffect(() => {
    if (name === user.displayName){
      //true => the user === other User => get into his own profile page
      dispatch(postActions.postsRequest(1, 10, null, user._id, null))
    } else {
      //false => user != other User => user get into otherUser profile page
      dispatch(userActions.singleUsersRequest({displayName:name}))
    }
  }, [name]);
  useEffect(() => {
    if(otherUser) {
      dispatch(postActions.postsRequest(1, 10, null, otherUser._id, null))
    }
  }, [otherUser]);

  let renderUser;
  if (name === user.displayName){
    renderUser = user;
  } else {
    renderUser = otherUser;
  }

  // useEffect(() => {
  //   if (user[1]?.userId) {
  //     dispatch(postActions.getSinglePost(user[1]?.userId));
  //   }
  // }, [user[1]?.userId]);

  return (
    <div>
      <Row className="centered hero">
        <Container className="centered flex-column">
          <img
            alt="lighthouse"
            className="position-relative img-fluid rounded-md"
            src="https://images.unsplash.com/photo-1507725914440-e1e434774828?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&w=2389&q=100"
          />
          <div className="centered position-relative">
            <img
              alt="profile"
              className="position-absolute rounded-circle cover-profile-photo"
              src={renderUser?.avatarUrl}
            />
            <h5 className="profile-name">{renderUser?.firstName + " " + renderUser?.lastName}</h5>
          </div>
        </Container>
        <hr className="w-75" />
      </Row>
      <Row className="rounded profile-nav bg-white">
        <Container className="centered">
          <Container>
            <Nav
              activeKey="/posts"
              onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            >
              <Nav.Item>
                <Nav.Link className="text-secondary" href="/posts">
                  Posts
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-secondary" href="/about">
                  About
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-secondary" href="/friends">
                  Friends
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-secondary" href="/photos">
                  Photos
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-secondary" href="/more">
                  More
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Container>

          <Container>
            <ButtonGroup
              className="d-flex p-2 align-items-between justify-content-between"
              aria-label="First group"
            >
              <Button variant="light" className="rounded-sm mr-1">
                Edit
              </Button>
              <Button variant="light" className="rounded-sm mr-1">
                View As
              </Button>
              <Button variant="light" className="rounded-sm mr-1">
                Search
              </Button>
              <Button variant="light" className="rounded-sm mr-1">
                Settings
              </Button>
            </ButtonGroup>
          </Container>
        </Container>
      </Row>
      <Row className="mt-3 profile-content">
        <Container className="d-flex">
          <Col xs={5} className="d-flex justify-content-end">
            <h1>Sidebar</h1>
          </Col>
          <Col xs={7} className="posts-col">
          {name === user.displayName?<Composer type="profile"/>:null}
              {
              posts?.posts.length > 0 && 
                posts?.posts.map((p)=> <Post key={p._id} user={renderUser} p={p} type="user" />)
            }
          </Col>
        </Container>
      </Row>
    </div>
  );
}
