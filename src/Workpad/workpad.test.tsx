/* eslint-disable */
import React from 'react';
import {render} from '@testing-library/react';
import Workpad from "./workpad";
import {EditorState} from "draft-js";


describe('WorkpadAccessories Card', () => {
    test('', () => {
        render(<Workpad editorContent={EditorState.createEmpty().getCurrentContent()} />)
    })
});
