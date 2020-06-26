import React from 'react';
import { Card, CardBody, CardText, CardTitle, CardImg } from 'reactstrap';



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
function RenderComments({dish}){
    if (dish != null) {
        const comments = dish.comments.map((com) => {
            return (
                <blockquote className="blockquote" key={com.id}>
                    <p className="mb-0">{com.comment}</p>
                    <footer className="blockquote-footer">{com.author} ,<cite title="Source Title">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(com.date))}</cite></footer></blockquote>
            );
        });
        return (
            <ul className="list-unstyled">
                {comments}
            </ul>
        )
    }
    else {
        return (
            <div>

            </div>
        );
    }

}
const DishDetail = (props)=> {
    console.log(' DishDetail Component Rendered');
    return (
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish = {props.dish}/>
            </div>
            <div className="col-12 col-md m-1">
                <RenderComments dish = {props.dish}/>
            </div>
        </div>
    );
}

export default DishDetail;