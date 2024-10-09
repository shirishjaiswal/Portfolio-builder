"use strict";

import React from "react";
import { SketchPicker, ColorResult } from "react-color";

class SketchPick extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
      r: 241,
      g: 112,
      b: 19,
      a: 1,
    },
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color: ColorResult) => {
    this.setState({ color: color.rgb });
  };

  render() {
    return (
      <>
        <button
          className="p-2 w-20 h-12 bg-slate-100 rounded-md shadow-lg inline-block cursor-pointer"
          onClick={this.handleClick}
        >
          <div
            className="w-16 h-8 rounded-md"
            style={{
              backgroundColor: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
            }}
          />
        </button>
        {this.state.displayColorPicker ? (
          <div className="absolute z-50">
            <button
              className="fixed top-0 left-0 right-0 bottom-0"
              onClick={this.handleClose}
            />
            <SketchPicker
              color={this.state.color}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </>
    );
  }
}

export default SketchPick;
