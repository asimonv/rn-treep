import styled from "styled-components";

const ShadowView = styled.View`
  box-shadow: ${props => {
    if (props.flat) {
      return "none";
    }
    return "0px 1px 3px rgba(0,0,0,0.2)";
  }};
`;

export default ShadowView;
