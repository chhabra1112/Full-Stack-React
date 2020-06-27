import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import {Link} from 'react-router-dom';

function RenderMenuItem({ dish}) {
    return (
        <Card>
            <Link to={`/menu/${dish.id}`} >
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay>
                <CardTitle>
                    {dish.name}
                </CardTitle>
            </CardImgOverlay>
            </Link>
        </Card>
    );
}

const Menu = (props) => {

    const menu = props.dishes.map((dish) => {
        return (
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <RenderMenuItem dish={dish} onClick = {props.onClick}/>
            </div>
        );
    });
    console.log('Menu Component constructed now');
    return (
        <div className="row">
            {menu}
        </div>
    );
}



export default Menu;