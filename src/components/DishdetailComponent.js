import React, { Component } from 'react';
import { Card, CardBody, CardText, CardTitle, CardImg, Breadcrumb, BreadcrumbItem, Button, Row, Modal, ModalBody, ModalHeader, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModal: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal = () => {
        this.setState({
            isModal: !this.state.isModal
        })
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    render() {
        return (
            <>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg" /> Submit Comment
            </Button>
                <Modal isOpen={this.state.isModal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select id="rating" name="rating"
                                        className="form-control" model=".rating">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="author">Name</Label>
                                    <Control.text id="author" name="author" className="form-control" model=".author"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea id="comment" name="comment"
                                        className="form-control" model=".comment" rows="3" />
                                </Row>
                                <Row className="form-group">
                                    <Button type="submit" value="submit" color="primary">Add Comment</Button>
                                </Row>
                            </LocalForm>
                        </div>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <React.Fragment>
                <FadeTransform in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <Card>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            </React.Fragment >
        );
    } else {
        return (
            <div></div>
        );
    }
}
function RenderComments({ comments, postComment, dishId }) {
    if (comments != null) {
        const comment = comments.map((com) => {
            return (
                <Fade in>
                <li key={com.id}><blockquote className="blockquote" >
                    <p className="mb-0">{com.comment}</p>
                    <footer className="blockquote-footer">{com.author} ,<cite title="Source Title">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(com.date))}</cite></footer></blockquote>
                </li>
                </Fade>
            );
        });
        return (
            <>
                <ul className="list-unstyled">
                    <Stagger in>
                    {comment}
                    </Stagger>
                </ul>
                <CommentModal dishId={dishId}
                    postComment={postComment} />
            </>
        );
    }
    else {
        return (
            <div>

            </div>
        );
    }

}

const DishDetail = (props) => {
    if (props.isLoadinng) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }
    else if (props.dish != null) {


        return (
            <>
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active> {props.dish.name} </BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                        </div>
                        <hr />
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md m-1">
                            <RenderComments comments={props.comments}
                                postComment={props.postComment}
                                dishId={props.dish.id} />

                        </div>
                    </div>
                </div>
            </>
        );
    }
    else {
        return (
            <div></div>
        );
    }
};

export default DishDetail;