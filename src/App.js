import React, { useState } from "react";
import Show from "./components/valut.js";

function App() {
  const [value, setValue] = useState([]);

  return (
    <div>
      <Show setData={setValue} />
      <p>{value}</p>
    </div>
  );
}

export default App;
