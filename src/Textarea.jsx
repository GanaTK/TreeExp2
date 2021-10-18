import React, { useState } from "react";

/*
class Textarea extends Component {
  constructor() {
    super();
    this.state = {
      textAreaValue: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
*/
function Textarea(props) {
  const [txt, setTxt] = useState(props.children);

  function handleChange(event) {
    const { name, value } = event.target;
    setTxt(event.target.value);
    console.log(event.target.value);
    /*
    setTxt((prevNote) => {
      console.log(prevNote);
      return {
        ...prevNote,
        [name]: value
      };
    });
    */
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
