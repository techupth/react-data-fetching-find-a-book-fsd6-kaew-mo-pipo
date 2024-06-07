import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");

  function search(event) {
    setSearchText(event.target.value);
  }
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  async function getBook(text) {
    // console.log(`https://www.googleapis.com/books/v1/volumes?q=${text}`);
    try {
      const result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${text}`
      );
      // console.log(result.data.items);
      setBooks(result.data.items);
    } catch (error) {
      // setBooks([]);
      console.log(error);
    }
  }

  useEffect(() => {
    if (searchText) {
      debounce(getBook(searchText));
    } else {
      setBooks([]);
    }
  }, [searchText]);

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input type="text" value={searchText} onChange={search} />
      <ul>
        {books.map((item, index) => {
          return <li key={index}>{item.volumeInfo.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
