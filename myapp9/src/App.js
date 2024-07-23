import React, {createContext, useContext} from 'react';
import './style.css';
const themeDefault = {border : '10px dotted blue'};
const themeContext = createContext(themeDefault);



export default function App() {
  const theme = useContext(themeContext);
  return(
    <div className='root' style={theme}>
      <h1>Hello World!!!</h1>
      <Sub1 />
    </div>
  );
}


function Sub1(){
  const theme = useContext(themeContext);
  return(
    <div style={theme}>
      <h1>Sub1</h1>
      <Sub2 />
    </div>
  );
}
  
function Sub2(){
  return(
    <div>
      <h1>Sub2</h1>
      <Sub3 />
    </div>
  );
}
  

function Sub3(){
  return(
    <div>
      <h1>Sub3</h1>
    </div>
  );
}