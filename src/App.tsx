import React from 'react';
import logo from './logo.svg';
import './App.css';
import Workpad from "./Workpad/workpad";
import {EditorState} from "draft-js";
import { Box } from '@mui/material';

function App() {

  return (
    <div className="App">
        <Workpad editorContent={EditorState.createEmpty().getCurrentContent()} />
    </div>
  );
}

export default App;
