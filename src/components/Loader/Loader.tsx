import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { FlexDiv } from "src/styles";

const Loader = () => {
  return (
    <FlexDiv width="100%" center mt={3}>
      <ScaleLoader color="#1a3c34" />
    </FlexDiv>
  );
};

export default Loader;
