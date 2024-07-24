import React from 'react';
import { createStore } from 'react-redux';
import {Provider, useSelector, useDispatch} from 'react-redux'
import store from './store';
import { up } from './counterSlice';

function Counter(){
  const dispatch = useDispatch();
  const count = useSelector((state) => {
    console.log(state);
    return state.counter.value;
  });
  return(
    <div>
    <button onClick={() =>{
      dispatch(up(2))
    }}>
      +
    </button>{'  '}
    {count}
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

export default App;
