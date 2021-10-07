import React from 'react';
import reactDom from 'react-dom';

// You can use <React.Fragment> or <>

function Greeting() {
  return (
    <div>
      <h3>Hello people</h3>
      <ul>
        <li>
          <a href="#">Hello World</a>
        </li>
        <img src="" alt="" />
        <input type="text" />
      </ul>
    </div>
  );
}

reactDom.render(<Greeting />, document.getElementById('root'));