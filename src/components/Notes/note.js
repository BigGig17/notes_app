import React, { Component } from 'react'
 class Note extends Component {
  render() {
    return (
          <div className={`${this.props.isCurrent === true ? "active" : "text-white"} nav-link note-box`}>
            <h4 className={"note-title mb-0"}>
              {this.props.note.title}
            </h4>
          </div>
    )
  }
}

export default Note
