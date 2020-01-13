import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const TextInput = styled.TextInput`
  background-color: lightgray;
  margin: 10px;
  margin: 0 10px 10px 10px;
  padding: 12px 10px 10px 10px;
  border-radius: 5px;
`;

const StyledTextInput = ({ multiline, placeholder }) => {
  return <TextInput multiline={multiline} placeholder={placeholder} />;
};

StyledTextInput.defaultProps = {
  multiline: false,
  placeholder: undefined,
};

StyledTextInput.propTypes = {
  multiline: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default StyledTextInput;
