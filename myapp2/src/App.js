import React, {createContext, useContext} from 'react';
import './style.css';
const themeDefault = {border: '10px solid yellow'};
const themeContext = createContext(themeDefault);

export default function App() {
  const theme = useContext(themeContext);
  return (
    <themeContext.Provider value={{border: '20px solid green'}}>
    <div className="root" style={theme}>
       <h1>hello world!!</h1>
       <Sub1></Sub1>
    </div>
    </themeContext.Provider>
);
}

function Sub1(){
  const theme = useContext(themeContext);
  return(
    <themeContext.Provider value={{border:'10px solid blue'}}>
    <div style={theme}>
      <h1>Sub1</h1>
      <Sub2></Sub2>
    </div>
    </themeContext.Provider>
  );
}
  
function Sub2(){
  const theme = useContext(themeContext);
  return(
    <div style={theme}>
      <h1>Sub2</h1>
      <Sub3></Sub3>
    </div>
  );
}

function Sub3(){
  const theme = useContext(themeContext);
  return(
    <themeContext.Provider value={{border:'5px solid pink'}}>
    <div style={theme}>
      <h1>Sub3</h1>
      <Sub4></Sub4>
    </div>
    </themeContext.Provider>
  );
}

function Sub4(){
  const theme = useContext(themeContext);
  return(
    <div style={theme}>
      <h1>Sub4</h1>
    </div>
  );
}
