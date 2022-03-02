import styled from "@emotion/styled";
import { TextProps, ButtonProps, CardProps, FlexBoxProps } from "./propTypes";

export const CardContainer = styled("div")<CardProps>`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  background-color: ${(props) => props.bg || "transparent"};
  display: flex;
  margin: 0.5em;
  flex-direction: column;
  padding: 0.5em;
  box-shadow: 0 4px 4px 0px rgba(0, 0, 0, 0.2);
  background-color: white;
`;

export const FlexDiv = styled("div")<FlexBoxProps>`
  display: flex;
  padding: ${(props) =>
    props.p ? `${props.p}em;` : `${props.pt || "0"}em ${props.pr || "0"}em ${props.pb || "0"}em ${props.pl || "0"}em;`}
  margin: ${(props) =>
    props.m
      ? `${props.m}em;`
      : `${props.mt || "0"}em ${props.mr || "0"}em ${props.mb || "0"}em 
          ${props.ml || "0"}em;`}
    ${(props) => props.width && `width: ${props.width};`};
  ${(props) => props.height && `height: ${props.height};`};
  ${(props) => props.direction && `flex-direction: ${props.direction};`}
  ${(props) =>
    props.center &&
    `
    justify-content: center;
    align-items: center;
  `}
`;

export const PageContainer = styled("div")`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
`;

export const StyledButton = styled("button")<ButtonProps>`
  border: none;
  padding: 4px;
  border-radius: 10px;
  color: #1a3c34;
  font-weight: bold;
  margin-top: 5px;
  background-color: ${(props) => props.bg || "rgb(255, 194, 32)"};
  cursor: pointer;
  &:disabled {
    pointer-events: none;
    cursor: arrow;
    opacity: 50%;
  }
  &:active {
    transform: translateY(2px);
  }
  &:hover {
    box-shadow: 0 4px 4px 0px rgba(0, 0, 0, 0.2);
  }
`;

export const IconButton = styled("button")<ButtonProps>`
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:disabled {
    pointer-events: none;
    cursor: arrow;
  }
  &:active {
    transform: translateY(1px);
  }
`;

export const StyledText = styled("p")<TextProps>`
  color: ${(props) => props.color || "black"};
  margin: 0px 0px 2px 0px;
  font-size: ${(props) => props.size || "0.8em"};
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  ${(props) => props.capitalize && "text-transform: capitalize;"}
  ${(props) =>
    props.noWrap &&
    `
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`;

export const StyledInput = styled("input")`
  border-radius: 1px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  padding: 10px;
  width: 300px;
`;

export const NoWrapText = styled("div")`
  display: block;
  width: 100%;
  white-space: nowrap;
`;

export const NoWrapMultiLineText = styled("div")`
  height: 3.4em;
  overflow: hidden;
  position: relative;
  &:after {
    content: "";
    text-align: right;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 60%;
    height: 1.2em;
    background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 60%);
  }
`;

export const Chip = styled("div")`
  width: 15px;
  height: 15px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  padding: 2px;
  background-color: red;
`;
