import React, { useState } from "react";
import { PlusCircle, MinusCircle, Trash2 } from "react-feather";
import { AppDispatch, useAppDispatch } from "src/store";
import { updateQuantity, removeFromCart } from "src/slices/shoppingCart";
import { FlexDiv, StyledText, StyledButton, IconButton, CardContainer } from "src/styles";
import { CartProduct } from "src/types/CartProduct";

interface Props {
  product: CartProduct;
}

const CartCard = ({ product }: Props) => {
  const dispatch: AppDispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(product.quantity);
  const { quantityType, price, photoUrl, name, brand, productId, maxCartQuantity } = product;
  const existingQuantity = product.quantity;

  const handleIncreaseQuantity = () => {
    if (quantity < maxCartQuantity) {
      setQuantity((prevValue) => prevValue + 1);
    } else {
      setQuantity(maxCartQuantity);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity((prevValue) => prevValue - 1);
    } else {
      setQuantity(0);
    }
  };

  const handleUpdateCart = () => {
    if (quantity === 0) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(
        updateQuantity({
          productId,
          quantity,
        })
      );
    }
  };

  const handleDeleteItem = () => {
    dispatch(removeFromCart(productId));
  };

  return (
    <CardContainer width="500px" height="75px" style={{ flexDirection: "row" }}>
      <FlexDiv width="25%" center mt={1} mb={1}>
        <img src={photoUrl} width="auto" height="70px" alt={name} />
      </FlexDiv>
      <FlexDiv width="33%" direction="column" mt={1} mb={1} style={{ justifyContent: "center" }}>
        <StyledText bold>{name}</StyledText>
        <StyledText>{brand}</StyledText>
      </FlexDiv>
      <FlexDiv style={{ flex: 1 }}>
        <FlexDiv direction="column" center>
          <FlexDiv width="100%" direction="column" center>
            <StyledText bold style={{ paddingLeft: "3px" }}>{`$${price}0 / ${quantityType}`}</StyledText>
            <FlexDiv direction="row">
              <IconButton onClick={handleDecreaseQuantity} disabled={quantity === 0}>
                <MinusCircle size={15} />
              </IconButton>
              <StyledText style={{ margin: "0px 5px 0px 5px" }}>{quantity}</StyledText>
              <IconButton onClick={handleIncreaseQuantity} disabled={quantity === maxCartQuantity}>
                <PlusCircle size={15} />
              </IconButton>
            </FlexDiv>
          </FlexDiv>
          <StyledButton
            onClick={handleUpdateCart}
            style={{
              backgroundColor: quantity === existingQuantity ? "rgba(255, 194, 32, .3)" : "rgb(255, 194, 32)",
            }}
            disabled={existingQuantity === quantity}
          >
            <StyledText bold>Update Qty</StyledText>
          </StyledButton>
        </FlexDiv>
        <FlexDiv center direction="column" style={{ margin: "auto" }}>
          <StyledText bold>Total</StyledText>
          <StyledText bold>${price * existingQuantity}</StyledText>
        </FlexDiv>
        <FlexDiv center direction="column">
          <IconButton onClick={handleDeleteItem}>
            <Trash2 />
          </IconButton>
        </FlexDiv>
      </FlexDiv>
    </CardContainer>
  );
};

export default CartCard;
