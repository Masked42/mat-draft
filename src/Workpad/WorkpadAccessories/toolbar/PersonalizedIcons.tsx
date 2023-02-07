import React, { ReactElement, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { ImageTwoTone } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

const Label = styled('label')(
  () => ({
    display: 'flex',
  }),
);

// Maybe rename this to Media Icons
const PersonalizedIcons = (): ReactElement<React.FunctionComponent<ReactElement>> => {
  // eslint-disable-next-line no-unused-vars
  const [selectedFile, setSelectedFile] = useState<File | null>();
  // eslint-disable-next-line no-unused-vars
  const [isFilePicked, setIsFilePicked] = useState<true | false>(false);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event);
    if (!event.target) return;
    const target = (event.target as HTMLInputElement);
    if (!target.files) return;
    setSelectedFile(target.files[0]);
  };

  const handleSubmission = () => {
    console.log(selectedFile);
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <Label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" onChange={changeHandler} />
        <Tooltip title="Media">
          <IconButton
            aria-label="upload picture"
            component="span"
            onClick={handleSubmission}
            size="large"
          >
            <ImageTwoTone />
          </IconButton>
        </Tooltip>
      </Label>
    </>
  );
};

export default PersonalizedIcons;
