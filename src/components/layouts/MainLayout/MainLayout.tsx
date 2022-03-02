import React from "react";
import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import Header from "../../Header";

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  height: "100%",
  width: "100%",
  minHeight: "100vh",
  backgroundColor: "rgba(0, 0, 0, .05)",
});

const BodyContainer = styled.div({
  width: "100%",
  height: "100%",
  overflow: "auto",
  paddingTop: "64px",
});

const MainLayout = () => {
  return (
    <Container>
      <Header />
      <BodyContainer>
        <Outlet />
      </BodyContainer>
    </Container>
  );
};

export default MainLayout;
