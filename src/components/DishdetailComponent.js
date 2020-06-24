import React,{Component} from 'react';
import {Card,CardBody,CardText,CardTitle,CardImg,CardImgOverlay} from 'reactstrap';

class DishDetail extends Component{
    constructor(props){
        super(props);
    }
    renderDish=(dish)=>
    {
        if(dish!=null){
            return(
                <React.Fragment>
                <Card>
                    <CardImg width="100%" object src= {dish.image} alt = {dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </React.Fragment>
                );
       }else{
            return(
                <div></div>
            );
        }
    }
    formatDate(date)
    {
        const option = {year: 'numeric', month: 'short', day: 'numeric' };
        const date1 = new Date(date)
        const newdate = date1.toLocaleDateString("en-US", option)
        return newdate;
    
    }
    renderComments=(dish)=>
    {
        if(dish!=null){
            const comments=dish.comments.map((com)=>{
                var d = new Date(com.date);
                return (
                <blockquote className="blockquote">
                <p className="mb-0">{com.comment}</p>
                <footer className="blockquote-footer">{com.author} ,<cite title="Source Title">{this.formatDate(com.date)}</cite></footer></blockquote>
                );
            });
            return(
                <ul className="list-unstyled">
                {comments}
                </ul>
            )
        }
            else{
                return(
                    <div>

                    </div>
                );
        }

    }
    render() {
        const {dish} = this.props;
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(dish)}
                </div>
                <div className="col-12 col-md m-1">
                {this.renderComments(dish)}
                </div>
            </div>
        );
    }
}

export default DishDetail;