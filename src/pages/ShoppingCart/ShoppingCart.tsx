import React from "react";
import { AppDispatch, RootState, useAppDispatch, useAppSelector } from "src/store";
import CartCard from "src/components/cards/CartCard";
import { emptyCart } from "src/slices/shoppingCart";
import { PageContainer, StyledText, StyledButton, FlexDiv, CardContainer } from "src/styles";
import { NavLink } from "react-router-dom";
import { CartProduct } from "src/types/CartProduct";

const ShoppingCart = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const { products }: any = useAppSelector((state: RootState) => state.shoppingCart);
  const total = products.reduce((prev: number, curr: CartProduct) => prev + curr.quantity * curr.price, 0);

  const handleEmptyCart = () => {
    dispatch(emptyCart());
  };

  return (
    <PageContainer>
      <FlexDiv direction="column" width="525px" style={{ margin: "auto" }}>
        {products.length > 0 && (
          <>
            <FlexDiv direction="row" width="100%" style={{ justifyContent: "space-between" }}>
              <div />
              <StyledButton onClick={handleEmptyCart}>
                <StyledText bold>Empty Cart</StyledText>
              </StyledButton>
            </FlexDiv>
            {products.map((product) => (
              <CartCard key={product.productId} product={product} />
            ))}
            <FlexDiv direction="row" width="100%" style={{ justifyContent: "space-between" }}>
              <div />
              <CardContainer width="auto" style={{ marginRight: 0, padding: "1em" }}>
                <StyledText bold>Grand Total: ${total}</StyledText>
                <StyledButton onClick={() => console.log("woohoo")}>
                  <StyledText bold>Checkout</StyledText>
                </StyledButton>
              </CardContainer>
            </FlexDiv>
          </>
        )}
        {products.length === 0 && (
          <FlexDiv width="100%" center direction="column" style={{ textAlign: "center", margin: "auto" }}>
            <StyledText bold>You have no items in your cart</StyledText>
            <NavLink to="/">
              <StyledText bold>View Products</StyledText>
            </NavLink>
          </FlexDiv>
        )}
      </FlexDiv>
    </PageContainer>
  );
};

export default ShoppingCart;
