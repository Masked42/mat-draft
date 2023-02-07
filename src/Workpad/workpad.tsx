import React, { useRef, useState } from 'react';
import {
  ContentState, Editor, EditorState,
} from 'draft-js';
import './WorkpadAccessories/toolbar/workpad.css';
import {
  Divider, Paper, StyledEngineProvider, ThemeProvider, useTheme,
} from '@mui/material';
import EditorToolbar from './WorkpadAccessories/toolbar/toolbar';



type alignmentType = 'left' | 'right' | 'center'

type Props = {
  editorContent: ContentState,
}

const Workpad = ({ editorContent }: Props) => {
  const [alignment, setAlignment] = useState<alignmentType>('left');
  const [editorState, setEditorState] = useState(EditorState.createWithContent(editorContent));

  const theme = useTheme();
  const newEditorRef = useRef<Editor>(null);
  /**
     * Handles refocusing back to the draft-js editor.
     * @Return {void}
     */
  const handleFocus = () => {
    newEditorRef?.current?.focus();
  };

  return (
    <Paper style={{ marginLeft: theme.spacing(1) }} variant="outlined">
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <EditorToolbar
            editorState={editorState}
            setEditorState={setEditorState}
            setAlignment={setAlignment}
            editorRef={handleFocus}
          />
          <Divider />
          <div style={{
            marginLeft: '8px', marginTop: theme.spacing(3), marginBottom: theme.spacing(3), minHeight: '100px',
          }}
          >
            <Editor
              placeholder="Enter a description"
              editorState={editorState}
              onChange={setEditorState}
              textAlignment={alignment}
              spellCheck
              onFocus={handleFocus}
              stripPastedStyles
              ref={newEditorRef}

            />
          </div>

        </ThemeProvider>
      </StyledEngineProvider>
    </Paper>
  );
};

export default Workpad;
