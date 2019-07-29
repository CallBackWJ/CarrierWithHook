import { createStore, combineReducers } from 'redux';
import * as modules from "./modules";

const configure = () => createStore(combineReducers(modules));
 
export default configure;