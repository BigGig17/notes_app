import React, { useState, useEffect } from 'react'
import Notes from './../Notes/notes'
import NotesForm from './../Notes/NotesForm'
import axios from 'axios'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const API_URL = `${process.env.REACT_APP_API_URL}/api/v1/notes`

function NotePad({ logout, user, token }) {

  let [note, setNote] = useState({})
  const [notes, setNotes] = useState([])

  function loadNotes(setIndex) {
    let mounted = true;
    getAPIData().then((items) => {
      if(mounted) {
        setNotes(items);
        if(setIndex != null && setIndex < items.length){
          setNote(items[setIndex])
        }
      }
    });
    return () => (mounted = false);
  }

  function catchError(error) {
    console.log(error.response.status)
    logout();
    window.location.reload(false);
  }

  //REST FUNCTIONS

  function deleteAPIData(data){
    axios.delete(`${API_URL}/${data.note.id}`, {headers: {'Authorization': `Bearer ${token}`}}).then((response) => loadNotes(0)).catch(error => {
      catchError(error)
      return null;
   })
  }

  function postAPIData(data){
    axios.post(API_URL, data, {headers: {'Authorization': `Bearer ${token}`}}).then((response) => loadNotes(notes.length)).catch(error => {
      catchError(error)
      return null;
   })
  }

  function getAPIData(){
    return axios.get(API_URL, {headers: {'Authorization': `Bearer ${token}`}}).then((response) => response.data).catch(error => {
      catchError(error)
      return null;
   })
  }
  
  function patchAPIData(data){
    axios({
      method: 'patch',
      url: `${API_URL}/${data.note.id}`, 
      headers: {'Authorization': `Bearer ${token}`},
      data: data
    }).then((response) => loadNotes(null)).catch(error => {
      catchError(error)
      return null;
   })
  }

  useEffect(() => {
    loadNotes(0)
  }, [user])

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
    <Container className="p-3" fluid={false} >
      <Row>
        <Col className='custom-header'><h1 className='custom-text-white d-inline mb-2'>{process.env.REACT_APP_APP_TITLE}</h1>
          <div className='d-inline float-end vertical-align mt-1'>
            <span className='text-white'>Welcome, {user?.name} </span>
            <button className='btn btn-sm btn-danger btn-sm m-2' onClick={logout}>Log Out</button>
          </div>
        </Col>
      </Row>
      <Row className='custom-container' >
        <Col className="rounded flex-content note-bg-color" >
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
        <Col className='notepad-flex'>
          { notes.length > 0 &&
            <NotesForm note={note} handleSetNote={handleSetNote} handleDeleteNote={handleDeleteNote}/>
          }
          { notes.length === 0 && 
            <h2 className='text-white text-center'>No Notes to Display</h2>
          }
        </Col>
      </Row>
    </Container>
  )
}

export default NotePad;