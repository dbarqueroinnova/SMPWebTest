import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
function Module(props) {
  const items = props.items;

  const changeState = (value, checked) => {
    props.changeState({ value: value, checked: checked });
  };

  return (
    <div className="container">
      <div>
        <div className="row">
          <div className="col-sm-10">
            <span className="inline">
              <b>{props.name}</b>
            </span>
          </div>
        </div>

        {items.map((item, i) => {
          return (
            <SubModule
              key={i}
              optionMenu={item}
              module={props.name.trim()}
              changeState={changeState}
            />
          );
        })}
      </div>
    </div>
  );
}

function SubModule(props) {
  const [active, setActive] = useState(false);
  const changeState = (e) => {
    props.changeState(e.target.value, e.target.checked);
    setActive(e.target.checked);
  };

  useEffect(() => {
    setActive(props.optionMenu.checked || false);
  }, [props.optionMenu.checked]);

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="custom-control custom-switch">
          <Form>
            <Form.Check
              type="switch"
              className="custom-control-input"
              id={`option-${props.optionMenu.optionId}`}
              name={props.module}
              value={props.optionMenu.optionId}
              onChange={(e) => changeState(e)}
              checked={active}
              aria-label="check-rol-option"
              label={props.optionMenu.name}
            />
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Module;
