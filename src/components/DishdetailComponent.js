import React from 'react';
import { Card, CardBody, CardText, CardTitle, CardImg,Breadcrumb,BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';


function RenderDish({dish}) {
    if (dish != null) {
        return (
            <React.Fragment>
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    } else {
        return (
            <div></div>
        );
    }
}
function RenderComments({comments}){
    if (comments != null) {
        const comment = comments.map((com) => {
            return (
                <li><blockquote className="blockquote" key={com.id}>
                    <p className="mb-0">{com.comment}</p>
                    <footer className="blockquote-footer">{com.author} ,<cite title="Source Title">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(com.date))}</cite></footer></blockquote>
            </li>
            );
        });
        return (
            <ul className="list-unstyled">
                {comment}
            </ul>
        );
    }
    else {
        return (
            <div>

            </div>
        );
    }

}

const DishDetail = (props)=> {

    return(
        <>
        <div className="row">
            <Breadcrumb>
            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active> {props.dish.name} </BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
            </div>
            <hr/>
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish = {props.dish}/>
            </div>
            <div className="col-12 col-md m-1">
                <RenderComments comments = {props.comments}/>
            </div>
        </div>
        </>
    );
};

export default DishDetail;