import {createStore,combineReducers,applyMiddleware} from 'redux';
import {createForms} from 'react-redux-form';
import {Dishes} from './dishes';
import {Comments} from './comments';
import {Leaders} from './leaders';
import {Promotions} from './promotions';
import {initialFeedback} from './forms'
import thunk from 'redux-thunk';
import logger from 'redux-logger';



export const ConfigureStore = ()=>{
    const store = createStore(
        combineReducers({
            dishes:Dishes,
            promotions:Promotions,
            comments:Comments,
            leaders:Leaders,
            ...createForms({
                feedback:initialFeedback
            })
        }),
        applyMiddleware(thunk,logger)
    );
    return store;
};