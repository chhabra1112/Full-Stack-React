import React, { Component } from 'react';
import Header from './HeaderComponent'
import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments';
import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';
import DishDetail from './DishdetailComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import {Switch, Route,Redirect} from 'react-router-dom';
import Contact from './ContactComponent';
import About from './AboutComponent';

class Main extends Component{

  constructor(props){
    super(props);
    this.state = {
    dishes: DISHES,
    comments:COMMENTS,
    promotions:PROMOTIONS,
    leaders:LEADERS
    };
  }
  

  render(){
    const HomePage = ()=>{
      return(
        <Home dish={this.state.dishes.filter((dish)=>dish.featured)[0]}
        promotion={this.state.promotions.filter((promotion)=>promotion.featured)[0]}
        leader={this.state.leaders.filter((leader)=>leader.featured)[0]}
        />
      );
    };
    const  dishWithId = ({match})=>{
      return(
        <DishDetail dish = {this.state.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0]}
        comments={this.state.comments.filter((comment)=>comment.dishId===parseInt(match.params.dishId,10))}/>
      );
    };

  return (
    <div>
      < Header/>
      <div className="container">
      <Switch>
        <Route path="/home" component= {HomePage}/>
        <Route exact path="/menu" component = {()=> <Menu dishes={this.state.dishes}/>}/>
        <Route path="/menu/:dishId" component={dishWithId}/>
        <Route exact path='/contactus' component={Contact} />
        <Route exact path='/aboutus' component={()=><About leaders={this.state.leaders}/>} />
        <Redirect to ="/home"/>
      </Switch>
      </div>
      <Footer/>
    </div>
  );
}
}

export default Main;
