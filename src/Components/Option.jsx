import "../Styles/Option.scss";
import React from "react";
import "react-toggle/style.css";
import Toggle from "react-toggle";

function Option(props) {
  return (
    <>
      <div className={"option"}>
        <div className={"text-col"}>
          <div className={"option-title"}>{props.title}</div>
          <div className={"option-desc"}>{props.desc}</div>
        </div>
        <div className={"control"}>
          <Toggle
            defaultChecked={props.status}
            icons={false}
            onChange={props.toggle}
          />
        </div>
      </div>
    </>
  );
}

export default Option;
