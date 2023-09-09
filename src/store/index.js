import { createStore, bindActionCreators, applyMiddleware } from 'redux';
import reducer from './reducer';
import {
	createAddUserAction,
	createDeleteUserAction,
} from './action/usersAction';

/**
 * 一个中间件函数
 * @param {*} store
 */
const logger1 = (store) => (next) => (action) => {
	console.log('中间件1');
	console.log('旧数据', store.getState());
	console.log('action', action);
	next(action);
	console.log('新数据', store.getState());
	console.log('');
};
/**
 * 一个中间件函数
 * @param {*} store
 */
const logger2 = (store) => (next) => (action) => {
	console.log('中间件2');
	console.log('旧数据', store.getState());
	console.log('action', action);
	next(action);
	console.log('新数据', store.getState());
	console.log('');
};

//应用中间件，方式2：
// 当创建一个store的时候，会调用一次reducer，此时会初始化state数据
// 将多个中间件作为参数给redux applyMiddleware函数即可,每次执行dispatch时，都会触发action动作 以及中间件
const store = applyMiddleware(logger1, logger2)(createStore)(reducer);

const actionCreators = {
	addUser: createAddUserAction,
	deleteUser: createDeleteUserAction,
};

//第一个参数，是action创建函数合并的对象，第二个参数是仓库的dispatch函数
//得到一个新的对象，新对象中的属性名与第一个参数的属性名一致
const actions = bindActionCreators(actionCreators, store.dispatch);

actions.addUser({ id: 3, name: 'abc', age: 111 });
actions.deleteUser(3);
