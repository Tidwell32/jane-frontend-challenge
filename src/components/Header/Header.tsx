import React from "react";
import styled from "@emotion/styled";
import { matchPath, NavLink, useLocation } from "react-router-dom";
import { FlexDiv, Chip, StyledText } from "src/styles";

import { ShoppingCart } from "react-feather";
import { useAppSelector } from "src/store";

const links = [
  { name: "Products", url: "/" },
  { name: "Cart", url: "/cart" },
];

const HeaderContainer = styled("div")`
  display: flex;
  alight-items: center;
  flex-direction: row;
  padding: 1em;
  background-color: white;
  box-shadow: 0 6px 2px -2px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9999;
`;

const Header = () => {
  const location = useLocation();
  const cart: any = useAppSelector((state) => state.shoppingCart);

  return (
    <HeaderContainer>
      <FlexDiv width="100%">
        <NavLink to="/">
          {/* this would definitely be an SVG normally */}
          <img
            alt="Jane Logo"
            src="https://uploads-ssl.webflow.com/5e14d56cd091ac38d3d37db7/60401777a0e8c31dfea0739f_JANE-LOGO.png"
            height="25px"
          />
        </NavLink>
        {links.map((link) => (
          <FlexDiv
            key={link.name}
            center
            ml={2}
            style={{
              borderBottomColor: "rgb(255, 194, 32)",
              borderBottomStyle: matchPath({ path: link.url }, location.pathname) ? "solid" : "none",
              borderBottomWidth: "4px",
            }}
          >
            <NavLink
              style={{
                fontWeight: "bold",
                textDecoration: "none",
                color: "rgb(26, 60, 52)",
              }}
              to={link.url}
            >
              {link.name}
            </NavLink>
          </FlexDiv>
        ))}
        <div style={{ flex: 0.9 }} />
        <FlexDiv center>
          <FlexDiv center mr={-0.5} mb={-0.5}>
            {cart.products.length > 0 && (
              <Chip>
                <StyledText bold size=".75em" color="white">
                  {cart.products.length}
                </StyledText>
              </Chip>
            )}
          </FlexDiv>
          <NavLink to="/cart">
            <ShoppingCart color="rgb(26, 60, 52)" size={25} />
          </NavLink>
        </FlexDiv>
      </FlexDiv>
    </HeaderContainer>
  );
};

export default Header;
