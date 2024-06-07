import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [searchData, setSearchData] = useState([]);
  const [inputName, setInputName] = useState("");

  const getData = async (name) => {
    const dataBook = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${name}`
    );
    console.log(dataBook.data.items[0].volumeInfo.title);
    setSearchData(dataBook.data.items);
  };
  useEffect(() => {
    getData(inputName);
  }, [inputName]);

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input
        type="text"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
      />
      <div>
        <ul>
          {searchData.map((item, index) => (
            <li key={index}>{item.volumeInfo.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
