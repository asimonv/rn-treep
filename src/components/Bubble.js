import styled from "styled-components/native";
import { colors, BORDER_RADIUS } from "../styles/common.style";
import Layout from "../styles/Layout";

const Bubble = styled.View`
  background-color: ${props => {
    if (props.danger) {
      return colors.alert;
    } else if (props.light) {
      return colors.buttons.light;
    }
    return "dodgerblue";
  }};
  color: white;
  padding: ${Layout.container.margin * 1.5}px;
  border-radius: ${BORDER_RADIUS * 3}px;
`;

export default Bubble;
