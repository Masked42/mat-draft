import React, { ReactElement, useState } from 'react';
import {
  Box as MuiBox,
  IconButton,
  Menu,
  MenuItem,
  SvgIcon,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  CodeTwoTone,
  FormatBoldTwoTone,
  FormatItalicTwoTone,
  FormatListBulletedTwoTone,
  FormatListNumberedTwoTone,
  FormatUnderlinedTwoTone,
  TextFieldsTwoTone,
} from '@mui/icons-material';
import { EditorState, RichUtils } from 'draft-js';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import PersonalizedIcons from './PersonalizedIcons';

type Props = {
    editorState: EditorState
    setEditorState: React.Dispatch<React.SetStateAction<EditorState>>,
    setAlignment: React.Dispatch<React.SetStateAction<alignmentType>>
    editorRef: () => void
}

type alignmentType = 'left' | 'right' | 'center'
type listBlockType = '' | 'unordered-list-item' | 'ordered-list-item'

type blockTypes = '' | 'header-one'| 'header-two'| 'header-three'| 'header-four'| 'header-five'| 'header-six'

const ButtonStyle = styled(SvgIcon, {})(
  () => ({

  }),
);

const Container = styled(MuiBox)(
  () => ({
    // marginBottom: '16px',
  }),
);

const EditorToolbar = ({
  editorState, setEditorState, editorRef, setAlignment,
}: Props) => {
  const [inlineStyle, setInlineStye] = useState('');
  const [blockType, setBlockType] = useState<blockTypes>('');
  const [selectedBlock, setSelectedBlock] = useState<number| null>(null);
  const [anchorEl, setAnchorEl] = React.useState < null | HTMLElement>(null);
  const [currentAlignment, setCurr] = useState<alignmentType>('left');
  // eslint-disable-next-line no-unused-vars
  const open = Boolean(anchorEl);

  const iconMap = [
    <FormatBoldTwoTone className={clsx(ButtonStyle, { ButtonActive: inlineStyle === 'BOLD' })} />,
    <FormatItalicTwoTone className={clsx(ButtonStyle, { ButtonActive: inlineStyle === 'ITALIC' })} />,
    <FormatUnderlinedTwoTone className={clsx(ButtonStyle, { ButtonActive: inlineStyle === 'UNDERLINE' })} />,
  ];
  const typographyMap = [
    <Typography>h1</Typography>,
    <Typography>h2</Typography>,
    <Typography>h3</Typography>,
    <Typography>h4</Typography>,
    <Typography>h5</Typography>,
    <Typography>h6</Typography>,
  ];

  const BLOCK_TYPES = new Map<string, blockTypes>([
    ['H1', 'header-one'],
    ['H2', 'header-two'],
    ['H3', 'header-three'],
    ['H4', 'header-four'],
    ['H5', 'header-five'],
    ['H6', 'header-six'],
  ]);

  const headingTypeArray = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

  const stylesMap = ['BOLD', 'ITALIC', 'UNDERLINE', 'CODE'];

  /**
     * Checks to see if the given style has been applyied
     * @param ['BOLD' | 'ITALIC' | 'UNDERLINE' | '' ] newInlineStyle
     */
  const checkInline = (newInlineStyle: string) => {
    if (newInlineStyle === inlineStyle) setInlineStye('');
    else setInlineStye(newInlineStyle);
  };

  /**
     * Set the state for a given block type or clears out the given state
     * @param [blockTypes] newBlockType
     */
  const setNewBlockType = (newBlockType: string) => {
    const blockTypeResult = BLOCK_TYPES.get(newBlockType);
    if (blockTypeResult) {
      setBlockType(blockTypeResult);
      setEditorState(RichUtils.toggleBlockType(editorState, blockTypeResult));
    } else {
      setEditorState(RichUtils.toggleBlockType(editorState, blockType));
      setBlockType('');
    }
  };

  /**
     * Toggles inline star for a selection and refocuses back to the editor.
     * @param ['BOLD' | 'ITALIC' | 'UNDERLINE' | '' ] inlineStyleVar
     */
  const setInlineStyleVar = (inlineStyleVar: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyleVar));
    checkInline(inlineStyleVar);
    process.nextTick(() => {
      editorRef();
    });
  };

  const toggleBlockType = (block: listBlockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, block));
  };

  // eslint-disable-next-line no-unused-vars
  const setCurrentAlignment = (align: alignmentType) => {
    if (currentAlignment !== align) {
      setCurr(align);
      setAlignment(align);
    } else {
      setCurr('left');
      setAlignment('left');
    }
  };

  /**
     * Takes the heading that was selected and passes it newBlockType to be enabled/disabled
     * @param [string] heading
     * @param [nummber] index
     */
  const menuItemHandleClose = (heading: string, index: number) => {
    setSelectedBlock(index);
    if (selectedBlock !== index) {
      setSelectedBlock(index);
    } else {
      setSelectedBlock(null);
    }
    setNewBlockType(heading);
    setAnchorEl(null);
  };

  /**
     * Generates the inline styles icons
     */
  const generateIcons = () => iconMap.map((iconEl, index) => (
    <>
      <Tooltip key={`${stylesMap[index]}-${Math.random() *1000}`} title={`${stylesMap[index][0]}${stylesMap[index]?.substring(1).toLowerCase()}`}>
        <IconButton onClick={() => setInlineStyleVar(stylesMap[index])} size="large">
          {iconEl}
        </IconButton>
      </Tooltip>
    </>

  ));

  /**
     * Generates the headings menu.
     */
  const generateMenuItems = () => (
    headingTypeArray.map((heading, index) => (
      <MenuItem
        key={`${heading}-${Math.random() *1000}`}
        selected={index === selectedBlock}
        onClick={() => menuItemHandleClose(heading, index)}
      >
        {typographyMap[index]}
      </MenuItem>
    )));

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const generateListIcons = () => (
    <>
      <Tooltip title="Bullet List">
        <IconButton onClick={() => toggleBlockType('unordered-list-item')} size="large">
          <FormatListBulletedTwoTone />
        </IconButton>
      </Tooltip>
      <Tooltip title="Numbered List">
        <IconButton onClick={() => toggleBlockType('ordered-list-item')} size="large">
          <FormatListNumberedTwoTone />
        </IconButton>
      </Tooltip>
    </>
  );

  const generatePersonalizationIcons = (): ReactElement<HTMLDivElement> => (<PersonalizedIcons />);

  const generateAdvancedStyle = (): ReactElement<HTMLDivElement> => (
    <>
      <Tooltip title="Code Block">
        <IconButton size="large">
          <CodeTwoTone />
        </IconButton>
      </Tooltip>
      <Tooltip title="Headings">
        <IconButton onClick={handleClick} size="large">
          <TextFieldsTwoTone />
        </IconButton>
      </Tooltip>
      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id="simple-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        {generateMenuItems()}
      </Menu>
    </>
  );

  const desktopView = () => (
    <>
      <MuiBox display="flex">
        {generateIcons()}
      </MuiBox>
      <MuiBox display="flex">
        {generateAdvancedStyle()}
      </MuiBox>
      <MuiBox display="flex">
        {generateListIcons()}
      </MuiBox>
      {generatePersonalizationIcons()}
    </>
  );

  return (
    <>
      <Container display="flex">
        {desktopView()}
      </Container>
    </>
  );
};

export default EditorToolbar;
