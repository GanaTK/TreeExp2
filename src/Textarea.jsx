import React, { useEffect, useRef, useState } from "react";

function Textarea(props) {
  const [txt, setTxt] = useState(props.children);

  function handleChange(event) {
    const { name, value } = event.target;
    setTxt(event.target.value);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      console.log("enter press here! ");
    }
  }

  return (
    <div className="divwidth">
      <textarea
        name="textAreaValue"
        onChange={handleChange}
        value={txt}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}

export default Textarea;
