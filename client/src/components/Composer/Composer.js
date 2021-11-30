import React, {useState} from "react";
import { Card, Form, Button, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { postActions } from "../../redux/actions";
import { useDispatch } from "react-redux";
import "./style.css";

const ComposerButton = ({ title, icon }) => {
  return (
    <Button className="d-flex justify-content-center align-items-center bg-light bg-white text-dark border-0 rounded-md">
      {" "}
      <FontAwesomeIcon icon={icon} className="mr-2" size="lg" />
      {title}
    </Button>
  );
};

export default function Composer() {
  const [post, setPost] = useState({ body: "" });

  const onChange = (e) => {
    setPost({ ...post, [e.target.id]: e.target.value });
  };
  console.log({ post });
 
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(postActions.createPost(post.body));
  };

  return (
    <Card className="mb-3 w-100 shadow composer-card">
      <Card.Body className="px-3 pt-3">
        {" "}
        {/* STEP 2 */}
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Control
              id="body"
              type="text"
              onChange={onChange}
              placeholder="What's on your mind?"
              className="border-0 rounded-md post-text"
            />
          </Form.Group>
        </Form>
      </Card.Body>
      <hr className="mt-0" />
      <ButtonGroup size="lg" className="m-2">
        <ComposerButton title="Live Video" icon="video" />
        <ComposerButton title="Photo Video" icon="photo-video" />
        <ComposerButton title="Feeling/Activity" icon="smile" />
      </ButtonGroup>
    </Card>
  );
}
