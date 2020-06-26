import React, { Component } from 'react';
import Header from './HeaderComponent'
import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes';
import DishDetail from './DishdetailComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import {Switch, Route,Redirect} from 'react-router-dom';

class Main extends Component{

  constructor(props){
    super(props);
    this.state = {
    dishes: DISHES,
    };
  }
  render(){
    const HomePage = ()=>{
      return(
        <Home/>
      );
    }
  return (
    <div>
      < Header/>
      <div className="container">
      <Switch>
        <Route path="/home" component= {HomePage}/>
        <Route exact path="/menu" component = {()=> <Menu dishes={this.state.dishes}/>}/>
        <Redirect to ="/home"/>
      </Switch>
      </div>
      <Footer/>
    </div>
  );
}
}

export default Main;
