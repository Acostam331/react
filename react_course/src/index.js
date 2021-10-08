import React from "react";
import reactDom from "react-dom";

// You can use <React.Fragment> or <>

function BookList() {
  return (
    <section>
      <Book />
      <Book />
      <Book />
      <Book />
      <Book />
      <Book />
    </section>
  );
}

const Book = () => {
  return (
    <article>
      <Image />
      <Title />
      <Author />
    </article>
  );
};

const Image = () => (
  <img
    src="https://images.unsplash.com/photo-1633326259678-fec951d6a797?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80"
    alt=""
    width="200px"
  />
);

const Title = () => <h1>I love you to the moon and back</h1>;

const Author = () => <h4>Amelia Hepworth</h4>;

reactDom.render(<BookList />, document.getElementById("root"));
