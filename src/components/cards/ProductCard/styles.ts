import styled from "@emotion/styled";
export {
  StyledText,
  StyledButton,
  IconButton,
  NoWrapText,
  NoWrapMultiLineText,
  CardContainer,
  FlexDiv,
} from "src/styles";

export const Tag = styled("div")`
  border-radius: 50px;
  display: flex;
  margin: auto;
  margin-bottom: 5px;
  padding: 0px 10px 0px 10px;
  background-color: rgb(255, 194, 32);
`;

export const CartContainer = styled("div")`
  background-color: #1a3c342a;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-bottom: 3px;
`;

export const QuantityContainer = styled("div")`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 4px;
`;
