import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import "./styles.css";
import TextareaAutosize from "react-textarea-autosize";
import { motion } from "framer-motion";
import { usePositionReorder } from "./usePositionReorder";
import { useMeasurePosition } from "./useMeasurePosition";

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
      <TreeLine className="addSign" onClick={() => funcs.addChild(parent)}>
        &nbsp;&nbsp;&nbsp;+
      </TreeLine>
    </li>
  );
}

function TreeItem({ ind, item, funcs }) {
  const { toggleOpen, makeParent, updatePosition, updateOrder } = funcs;
  const [isdragged, setIsDragged] = React.useState(false);
  const itemRef = useMeasurePosition((pos) => updatePosition(ind, pos));
  return (
    <li>
      <motion.div
        style={{
          zIndex: isdragged ? 2 : 1,
          height: name.length * 10
        }}
        dragConstraints={{
          top: 0,
          bottom: 0
        }}
        dragElastic={1}
        layout
        ref={itemRef}
        onDragStart={() => setIsDragged(true)}
        onDragEnd={() => setIsDragged(false)}
        animate={{
          scale: isdragged ? 1.05 : 1
        }}
        onViewportBoxUpdate={(_, delta) => {
          isdragged && updateOrder(ind, delta.y.translate);
        }}
        drag="y"
      >
        <ul id="first" className="ulcl">
          <li>
            {item.isOpen ? (
              <i class="fas fa-minus"></i>
            ) : (
              <i class="fas fa-plus"></i>
            )}
          </li>
        </ul>
        <TreeLine
          onClick={() => toggleOpen(item)}
          onDoubleClick={() => makeParent(item)}
        >
          <ul id="second" className="ulcls">
            <li>
              <TextareaAutosize className="divwidth">
                {item.name}
              </TextareaAutosize>
            </li>
          </ul>
          <ul id="third" className="ulcl">
            <li>
              <span className="spanhead dateAlign">
                {new Date().toDateString(options)}
              </span>
            </li>
          </ul>
        </TreeLine>
        {item.children && item.isOpen && (
          <TreeList item={item} tree={item.children} funcs={funcs} />
        )}
      </motion.div>
    </li>
  );
}

function TreeList({ item, tree, funcs }) {
  return (
    <ul>
      {tree.map((child, index) => (
        <TreeItem key={index} ind={index} item={child} funcs={funcs} />
      ))}
      <AddItem parent={item} funcs={funcs} />
    </ul>
  );
}

function App() {
  const [tree, setTree] = useState(baseTree);
  const [updatedList, updatePosition, updateOrder] = usePositionReorder(
    baseTree
  );

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
    makeParent,
    updatePosition,
    updateOrder
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
