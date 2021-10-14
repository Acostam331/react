import React from "react";
import reactDom from "react-dom";
//css
import "./index.css";
//various imports and components
import { data } from "./books";
import SpecificBook from "./book";
import { greeting } from "./testing/testing";
// You can use <React.Fragment> or <>

function BookList() {
  console.log(greeting);

  return (
    <section className="booklist">
      {data.map((book) => {
        return <SpecificBook key={book.id} {...book} />;
      })}
    </section>
  );
}

reactDom.render(<BookList />, document.getElementById("root"));

{
  /* <h4
        style={{ color: "#617d98", fontSize: "0.75rem", marginTop: "0.25rem" }}
      > */
}
