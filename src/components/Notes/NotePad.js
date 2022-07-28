import React, { useState, useEffect } from 'react'
import Notes from './../Notes/notes'
import NotesForm from './../Notes/NotesForm'
import axios from 'axios'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const API_URL = "http://localhost:3000/api/v1/notes"

function NotePad() {

  let [note, setNote] = useState({})
  const [notes, setNotes] = useState([])

  function loadNotes(setIndex) {
    let mounted = true;
    getAPIData().then((items) => {
      if(mounted) {
        setNotes(items);
        if(setIndex != null && setIndex <= items.length){
          setNote(items[setIndex])
        }
      }
    });
    return () => (mounted = false);
  }

  //REST FUNCTIONS

  function deleteAPIData(data){
    axios.delete(`${API_URL}/${data.note.id}`).then((response) => loadNotes(0))
  }

  function postAPIData(data){
    axios.post(API_URL, data).then((response) => loadNotes(notes.length))
  }

  function getAPIData(){
    return axios.get(API_URL).then((response) => response.data)
  }
  
  function patchAPIData(data){
    axios.patch(`${API_URL}/${data.note.id}`, data).then((response) => loadNotes(null))
  }

  useEffect(() => {
    loadNotes(0)
    document.body.style.backgroundColor = "#698fa5";
  }, [])

  function handleSetNote(note){
    setNote(note);
    patchAPIData({note: note});
    loadNotes(null)
  }

  function handleDeleteNote(note){
    deleteAPIData({note: note})
  }

  function handleCreateNote(){
    postAPIData({note: {title: "New Note", body: "<h1>New Note Content</h1>"}});
  }

  return (
    <Container className="d-flex flex-column flex-shrink-0 p-3" fluid={false} >
      <Row>
        <Col><h1 className='custom-text-white'>React Notes Quarterly Study App</h1></Col>
      </Row>
      <Row>
        <Col className="rounded flex-content note-bg-color" xs={3}>
          <div className="mb-3" >
            <br />
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"><h3>Notes</h3></a>
            <hr />
            <Notes notes={notes} note={note} handleSetNote={handleSetNote} handleCreateNote={handleCreateNote}/>
          </div>
          <button className="btn btn-primary btn-sm button-space margin-top-auto" onClick={handleCreateNote}>
            New Note
          </button>
        </Col>
        <Col xs={9}>
          <NotesForm note={note} handleSetNote={handleSetNote} handleDeleteNote={handleDeleteNote}/>
        </Col>
      </Row>
    </Container>
  )
}

export default NotePad;