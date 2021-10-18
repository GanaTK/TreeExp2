import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import "./styles.css";
import Textarea from "./Textarea";
const baseTree = require("./data.json");

const TreeLine = styled.button`
  font-family: Menlo, Consolas, monospace;
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  width: 80%;
`;

const options = {
  hour: "numeric",
  minute: "numeric",
  year: "2-digit",
  month: "short",
  day: "numeric"
};

function AddItem({ parent, funcs }) {
  return (
    <li>
      <TreeLine onClick={() => funcs.addChild(parent)}>+</TreeLine>
    </li>
  );
}

function TreeItem({ item, funcs }) {
  const { toggleOpen, makeParent } = funcs;
  return (
    <li>
      {item.isOpen ? (
        <i className="arrow down"></i>
      ) : (
        <i className="arrow right"></i>
      )}
      &nbsp;
      <TreeLine
        onClick={() => toggleOpen(item)}
        onDoubleClick={() => makeParent(item)}
      >
        <Textarea>{item.name}</Textarea>
      </TreeLine>
      {item.children && item.isOpen && (
        <TreeList item={item} tree={item.children} funcs={funcs} />
      )}
    </li>
  );
}

function TreeList({ item, tree, funcs }) {
  return (
    <ul>
      {tree.map((child, index) => (
        <TreeItem key={index} item={child} funcs={funcs} />
      ))}
      <AddItem parent={item} funcs={funcs} />
    </ul>
  );
}

function App() {
  const [tree, setTree] = useState(baseTree);

  const toggleOpen = (item) => {
    const newTree = [...tree];
    item.isOpen = !item.isOpen;
    setTree(newTree);
  };
  const makeParent = (item) => {
    const newTree = [...tree];
    item.children = [];
    setTree(newTree);
  };
  const addChild = (parent) => {
    const newTree = [...tree];
    if (!parent) {
      newTree.push({ name: "New Item" });
    } else {
      parent.children.push({ name: "New Item" });
    }
    setTree(newTree);
  };

  const funcs = {
    toggleOpen,
    addChild,
    makeParent
  };
  return (
    <div className="App">
      <h1>Simple Tree</h1>
      <TreeList tree={tree} funcs={funcs} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
