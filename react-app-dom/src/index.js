import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes, NavLink, useParams} from 'react-router-dom';

function Home(){
  return(
    <div>
      <h2>Home</h2>
      Home.....
    </div>
  );
}

var Contents = [
  {id:1, Title:'HTML', description:'HTML .......'},
  {id:2, Title:'JS', description:'HTML .......'},
  {id:3, Title:'React', description:'HTML .......'}
]

function Subject() {
  var params = useParams();
  var subject_id = params.subject_id;
  var selected_topic = {
    Title : 'AAA',
    description: 'BBB'
  };
for(var i=0; i<Contents.length; i++) {
  if(Contents[i].id === Number(subject_id)) {
    selected_topic = Contents[i];
    break;
  }

}

  return(
    <div>
      <h3>{selected_topic.title}</h3>
      {selected_topic.description}
    </div>
  );
}


function Subjects(){
  var lis = [];
  for(var i=0;i<Contents.length; i++) {
    lis.push(
      <li key={Contents[i].id}>{Contents[i].Title}<NavLink to ={'/Subjects/'+ Contents[i].id}></NavLink></li>
    );
  }
  return(
    <div>
      <h2>Subjects</h2>
      <ul>
        {lis}
      </ul>
      <Routes>
        <Route path='/:subject_id' element={<Subject />} />
      </Routes>
    </div>
  );
}


function Titles(){
  return(
    <div>
      <h2>Title</h2>
      titles.....
    </div>
  );
}



function App(){
  return(
    <div>
      <h1>Hello React Router DOM</h1>
      <ul>
        <li><NavLink to='/'> Home</NavLink></li>
        <li><NavLink to='/subjects'> Subjects</NavLink></li>
        <li><NavLink to='/titles'> Titles</NavLink></li>
      </ul>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/subjects/*' element={<Subjects/>}></Route>
        <Route path='/titles' element={<Titles/>}></Route>
        <Route path='/*' element={'not found'}></Route>
      </Routes>
      
    </div>
  );
}


ReactDOM.createRoot(document.getElementById('root')).render(<BrowserRouter><App /></BrowserRouter>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
