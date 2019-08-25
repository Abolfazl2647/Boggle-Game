import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
const middleWare = [thunk];
const store = createStore( rootReducer ,
compose(
    applyMiddleware(...middleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
));

// store.subscribe( () => {
//     console.log('new State' , store.getState());
// });

export default store;
