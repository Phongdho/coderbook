import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  Form,
  Card,
  Button,
  ListGroup,
  ButtonGroup,
  ListGroupItem,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./style.css";
import { commentActions } from "../../redux/actions/comment.action";
import { postActions } from "../../redux/actions";
const COMMENTS = [
  {
    id: 1,
    body: `Loi you're such a talented developer. I hope one day I can be just like you. Hihi =)`,
    user: {
      name: "Charles Lee",
      avatarUrl:
        "https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-1/p480x480/13924881_10105599279810183_392497317459780337_n.jpg?_nc_cat=109&ccb=3&_nc_sid=7206a8&_nc_ohc=uI6aGTdf9vEAX8-Aev9&_nc_ht=scontent.fsgn5-6.fna&tp=6&oh=e8b18753cb8aa63937829afe3aa916a7&oe=6064C685",
    },
  },
  {
    id: 2,
    body: `Thank you...`,
    user: {
      name: "Loi Tran",
      avatarUrl:
        "https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.0-1/14633014_10154745913714359_6100717154322258576_n.jpg?_nc_cat=105&ccb=3&_nc_sid=7206a8&_nc_ohc=PO1d3X9U7egAX9IFy1u&_nc_oc=AQlNWL-YG7EdcZYBqWlyn2vCvGxKMG6jXMOdGl-GUkRLMAxUZPnM2mMfh_mjayYJMyA&_nc_ht=scontent.fsgn5-2.fna&oh=abda95a6abf3b5883dbd6078cd8f36a3&oe=6061BFC6",
    },
  },
  {
    id: 3,
    body: `SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! 
    SO talented! 
    SO talented! 
    SO talented! `,
    user: {
      name: "Charles Lee",
      avatarUrl:
        "https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-1/p480x480/13924881_10105599279810183_392497317459780337_n.jpg?_nc_cat=109&ccb=3&_nc_sid=7206a8&_nc_ohc=uI6aGTdf9vEAX8-Aev9&_nc_ht=scontent.fsgn5-6.fna&tp=6&oh=e8b18753cb8aa63937829afe3aa916a7&oe=6064C685",
    },
  },
];

const Avatar = ({url}) => {
  return <img alt="profile" className="rounded-circle" src={url} />;
};

/* STEP 4 */
const CommentForm = (props) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user)
  const otherUser = useSelector(state => state.user.otherUser)
  console.log("props", props);
  const onSubmit = (e) => {
    e.preventDefault();
    if(props.types ==="user" && user.displayName===otherUser?.displayName){
    dispatch(commentActions.createComment(props.postId, comment, user._id));
    } else if( props.types ==="user" && user.displayName!==otherUser?.displayName){
      dispatch(postActions.createComment(props.postId, comment, otherUser?._id));
    } else if (props.types === "home"){
      dispatch(postActions.createComment(props.postId, comment, null));
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Row>
        <Col className="d-flex">
          <Form.Control
            size="sm"
            type="text"
            placeholder="Write a comment..."
            className="border-0 rounded-md bg-light"
            onChange={(e) => setComment(e.target.value)}
          />
        </Col>
      </Form.Row>
    </Form>
  );
};

const Comment = ({d}) => {

  console.log("comment d", d);
  
  return (
    <ListGroupItem className="justify-content-start border-bottom-0 pr-0 py-0">
      {/* <Avatar url={owner?.avatarUrl} />
      <div className="col">
        <div className="comment-bubble">
          <div className="font-weight-bold">{owner?.displayName}</div>
          <p>{body}</p>
        </div>
      </div> */}
    </ListGroupItem>
  );
};

const PostComments = (props) => {
  console.log("its props", props);
  return (
    <Card.Body>
      <ListGroup className="list-group-flush">
        {props?.comments?.length > 0 && props?.comments.map((c) => {
        return (
          <ListGroupItem className="justify-content-start border-bottom-0 pr-0 py-0">
          <Avatar url={c?.owner?.avatarUrl} />
          <div className="col">
            <div className="comment-bubble">
              <div className="font-weight-bold">{c?.owner?.displayName}</div>
              <p>{c?.body}</p>
            </div>
          </div>
        </ListGroupItem>
        )
        })}
      </ListGroup>
    </Card.Body>
  );
};

const POST_ACTIONS = [
  { title: "Like", icon: "thumbs-up" },
  { title: "Comment", icon: "comment" },
  { title: "Share", icon: "share" },
];

const PostActionButton = ({ title, icon }) => {
  return (
    <Button className="bg-light bg-white text-dark border-0">
      {" "}
      <FontAwesomeIcon
        size="lg"
        icon={icon}
        color="black"
        className="mr-2 action-icon"
      />
      {title}
    </Button>
  );
};

const PostActions = () => {
  return (
    <ButtonGroup aria-label="Basic example">
      {POST_ACTIONS.map((a) => {
        return <PostActionButton key={a.title} {...a} />;
      })}
    </ButtonGroup>
  );
};

const PostReactions = () => {
  return (
    <div className="d-flex justify-content-between my-2 mx-3">
      <p className="mb-0">Vinh Nguyen, Bitna Kim and 21 others</p>
      <p className="mb-0">20 comments</p>
    </div>
  );
};

function PostHeader({data}) {
  return (
    <div className="d-flex align-items-center p-3">
      <Avatar url={data?.avatarUrl} />
      <h3 className="font-weight-bold ml-3">
        {data?.firstName + " " + data?.lastName}
      </h3>
    </div>
  );
}

export default function Post({user, p, type}) {

  // console.log("2021 nè", p);
  return (
    <Card className="p-3 mb-3 shadow rounded-md">
      <PostHeader data={user}/>
      <div>{p?.body}</div>
      <Card.Img
        variant="top"
        src={p?.imageUrl}
      />
      <PostReactions />
      <hr className="my-1" />
      <PostActions />
      <hr className="mt-1" />
      <PostComments comments={p?.comments} />
      <CommentForm postId={p?._id} types={type}/>
      {/* <Comment /> */}
    </Card>
  );
}
