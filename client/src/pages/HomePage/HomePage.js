import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { postActions } from "../../redux/actions/post.actions";

import "./style.css";

import Post from "../../components/Post";
import Composer from "../../components/Composer";

const SIDEBAR_BUTTONS = [
  {
    title: "Friends",
    icon: "users",
  },
  {
    title: "Events",
    icon: "calendar",
  },
  {
    title: "Groups",
    icon: "user-friends",
  },
  {
    title: "Pages",
    icon: "flag",
  },
  {
    title: "See More",
    icon: "angle-down",
  },
];

const SidebarButton = ({ title, icon }) => {
  return (
    <Button className="d-flex align-items-center sidebar-button border-0 text-dark btn-light">
      {" "}
      <FontAwesomeIcon icon={icon} size="lg" style={{ width: "4rem" }} />
      <span>{title}</span>
    </Button>
  );
};

/* STEP 3 */
export default function HomePage() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const posts = useSelector((state) => state.post.posts);
  console.log("posts nữa nè", posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postActions.postsRequest());
  }, []);
  if (!isAuthenticated) return <Navigate to="/auth" />;

  return (
    <Row>
      <Col className="d-flex flex-column pl-1 mt-3">
        <ButtonGroup vertical>
          {SIDEBAR_BUTTONS.map((b) => {
            return <SidebarButton key={b.title} {...b} />;
          })}
        </ButtonGroup>
      </Col>
      <Col
        xs={5}
        id="scrollingElement"
        className="d-flex flex-column align-items-center posts-container"
      >
        <Composer />
        <Post />
        <Post />
        <Post />
        <Post />
      </Col>
      <Col></Col>
    </Row>
  );
}
