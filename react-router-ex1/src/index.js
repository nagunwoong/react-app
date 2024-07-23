import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Route, Routes, NavLink, BrowserRouter, useParams } from 'react-router-dom';
import styled from 'styled-components';

const SimpleButton = styled.button`
color: black;
background-color: green;
`;


function Home() {
  return(
    <div>
      <h2>내 이름은</h2>
      나건웅
    </div>
  );
}


var contents=[
  {id:1, title:'노래', description:'코인 노래방'},
  {id:2, title:'유튜브 보기', description:'영상 보기'},
  {id:3, title:'영화보기', description:'문화 생활'}
];

function Topic(){
  var params = useParams();
  var topic_id = params.topic_id;
  var selected_topic = {
    title : 'Sorry',
    description : 'Not Found'
  };
  for(var i=0; i<contents.length; i++) {
    if(contents[i].id === Number(topic_id)){
    selected_topic = contents[i];
    break;
  }
}
  console.log(params);
  return(
    <div>
      <h3>{selected_topic.title}</h3>
      {selected_topic.description}
    </div>
  );
}

function Topics() {
  var lis =[];
  for(var i=0; i<contents.length; i++) {
    lis.push(
      <li key={contents[i].id}><NavLink to={"/topics/" + contents[i].id}>{contents[i].title}</NavLink></li>
    );
  }
  return(
    <div>
      <h2>내 주특기는</h2>
      <ul>
        {lis}
      </ul>

        <Routes>
          <Route path='/:topic_id' element={<Topic></Topic>} />
        </Routes>


    </div>
  );
}


function Contact() {
  return(
    <div>
      <h2>내 연락처는</h2>
      010-4754-3187
    </div>
  );
}


function App() {
  return(
    <div>
      <SimpleButton><h1>자기소개 페이지</h1></SimpleButton>
    <ul>
      <li><NavLink to='/'>이름</NavLink></li>
      <li><NavLink to='/topics'>주특기</NavLink></li>
      <li><NavLink to='/contact'>연락처</NavLink></li>
    </ul>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/topics/*' element={<Topics />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/*' element={'Not Found'} />
    </Routes>
      </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<BrowserRouter><App /></BrowserRouter>);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
