import React, { PureComponent } from "react";

class History extends PureComponent {
  render() {
    const { v } = this.props;
    return (
      <li>
        <b>{v.try}</b> - {v.result}
      </li>
    );
  }
}

export default History;
