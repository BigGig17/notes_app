import React from 'react'
import Note from './note'
// import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreateNote = this.handleCreateNote.bind(this)
    this.handleClick = this.handleClick.bind(this);
    this.state = {currentNote: this.props.note}
  }

  handleClick(note) {
    this.currentNote = note;
    this.props.handleSetNote(note)
  }
  
  handleCreateNote(){
    this.props.handleCreateNote();
  }
  
  render(){
    return (
      <>
          <ul className="nav nav-pills flex-column mb-auto">
            {this.props.notes.sort((a ,b)=>{ return a.id - b.id }).map((note) => {
              return (
                <li key={note.id} className='nav-item list-border' >
                  <a href="#" className="no-decoration" onClick={this.handleClick.bind(this, note)}>
                    <Note note={note} isCurrent={this.props.note.id === note.id}/>
                  </a>
              </li>
              );
            })}
          </ul>
      </>
    )
  }
}

export default Notes