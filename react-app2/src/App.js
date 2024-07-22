import './App.css';
import { useState } from 'react';

function Header(props) {
  console.log('props', props.title);
  return (
    <header>
      <h1>
        <a href="/" onClick={(event) => {
          event.preventDefault();
          props.onChangeMode();
        }}>{props.title}</a>
      </h1>
    </header>
  );
}

function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a id={t.id} href={'/read/' + t.id} onClick={event => {
          event.preventDefault();
          props.onChangeMode(Number(event.target.id));
        }}>{t.title}</a>
      </li>
    );
  }
  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={event => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title, body);
      }}>
        <p><input type='text' name='title' placeholder='title' /></p>
        <p><textarea name='body' placeholder='body'></textarea></p>
        <p><input type='submit' value='Create'></input></p>
      </form>
    </article>
  );
}

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return (
    <article>
      <h2>Update</h2>
      <form onSubmit={event => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onUpdate(title, body);
      }}>
        <p><input type='text' name='title' placeholder='title' value={title} onChange={event => {
          console.log(event.target.value);
          setTitle(event.target.value);
        }}/></p>
        <p><textarea name='body' placeholder='body' value={body} onChange={event => {
          setBody(event.target.value);
        }}></textarea></p>
        <p><input type='submit' value='Update'></input></p>
      </form>
    </article>
  );
}

function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: '직업', body: '안녕하세요. 저는 자바 개발자입니다.' },
    { id: 2, title: '기술', body: 'Java, Spring, JS' },
    { id: 3, title: '경험', body: '경력 없음' }
  ]);

  const time = () => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    return `${date} ${time}`;
  };

  let content = null;
  let contextControl = null;
  let title, body = null;

  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="안녕하세요, 제 소개 페이지입니다."></Article>;
  } else if (mode === "READ") {
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>;
    contextControl = <>
    <li><a href={'/update/' + id} onClick={event =>{
      event.preventDefault();
      setMode('UPDATE');
    }}>Update</a></li>
    <li><input type='button' value= "Delete" onClick={() => {
      const newTopics = topics.filter(topic => topic.id !== id);
      setTopics(newTopics);
      setMode("WELCOME");
    }} /></li>
  </>

  } else if (mode === "CREATE") {
    content = <Create onCreate={(_title, _body) => {
      const newTopic = { id: nextId, title: _title, body: _body };
      const newTopics = [...topics, newTopic];
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId + 1);
    }}></Create>;
    
  } else if(mode === 'UPDATE') {
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate = {(title, body) => {
      console.log(title, body);
      const newTopics = [...topics];
      const updatedTopic = {id:id, title:title, body:body}
      for(let i=0; i<newTopics.length; i++) {
        if(newTopics[i].id === id) {
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ');      

    }}></Update>
  }

  return (
    <div className='APP'>
      <Header title="자기소개" onChangeMode={() => {
        setMode("WELCOME");
      }}></Header>

      <Nav topics={topics} onChangeMode={(_id) => {
        setMode("READ");
        setId(_id);
      }}></Nav>

      {content}

      <ul>
        <li><a href='/create' onClick={event => {
          event.preventDefault();
          setMode('CREATE');
      }}>Create</a></li>
        {contextControl}
      </ul>
      
    
        <p>현재 날짜와 시간: {time()}</p>

    </div>
  );
}

export default App;
