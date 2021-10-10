import React from "react";
import reactDom from "react-dom";
//css
import "./index.css";

// You can use <React.Fragment> or <>
// variables
const books = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1633326259678-fec951d6a797?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80",
    title: "I love you to the moon and back",
    author: "Amelia Hepworth",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1633114073758-c4be9aeb15ac?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    title: "Our class is a family",
    author: "Shannon Olsen",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1633801695482-f3a98465b84b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1287&q=80",
    title: "The Vanishing Half: A Novel",
    author: "Brit Bennet",
  },
];

function BookList() {
  return (
    <section className="booklist">
      {books.map((book) => {
        return <Book key={book.id} {...book} />;
      })}
    </section>
  );
}

const Book = (props) => {
  const { img, title, author } = props;

  const clickHandler = (e) => {
    console.log(e);
    console.log(e.target);
    alert("hello World");
  };

  const complexExample = (author) => {
    console.log(author);
  };

  return (
    <article
      className="book"
      onMouseOver={() => {
        console.log(title);
      }}
    >
      <img src={img} alt="" width="200px" height="200px" />
      <h1 onClick={() => console.log(title)}>{title}</h1>
      <h4>{author.toUpperCase()}</h4>
      <button type="button" onClick={clickHandler}>
        Reference example
      </button>
      <button type="button" onClick={() => complexExample(author)}>
        More complex example
      </button>
    </article>
  );
};

reactDom.render(<BookList />, document.getElementById("root"));

{
  /* <h4
        style={{ color: "#617d98", fontSize: "0.75rem", marginTop: "0.25rem" }}
      > */
}
