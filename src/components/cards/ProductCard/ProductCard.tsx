import React, { useState } from "react";
import { Product } from "src/client";
import { PlusCircle, MinusCircle, Star } from "react-feather";
import { useAppSelector, useAppDispatch, AppDispatch, RootState } from "src/store";
import { addToCart, updateQuantity, removeFromCart } from "src/slices/shoppingCart";
import {
  StyledText,
  Tag,
  CartContainer,
  QuantityContainer,
  StyledButton,
  IconButton,
  NoWrapText,
  NoWrapMultiLineText,
  CardContainer,
  FlexDiv,
} from "./styles";
import { CartProduct } from "src/types/CartProduct";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const dispatch: AppDispatch = useAppDispatch();
  const cart = useAppSelector((state: RootState) => state.shoppingCart);
  const productAlreadyInCart: any = cart.products.find((p: CartProduct) => p.productId === product.product_id);
  const [quantity, setQuantity] = useState(productAlreadyInCart ? productAlreadyInCart.quantity : 0);

  const {
    name,
    description,
    custom_product_type,
    brand,
    price_each,
    price_eighth_ounce,
    price_gram,
    price_half_gram,
    price_half_ounce,
    price_ounce,
    price_quarter_ounce,
    price_two_gram,
    product_id,
    max_cart_quantity,
    review_count,
    aggregate_rating,
  } = product;

  // That damn Secret Gelato having multiple prices threw a wrench in things.
  // Would otherwise properly map over these quantity types with an add to cart button for each
  // or add a product detail page that would have all that, but I'm already well overs two hours
  const availableQuantities = [
    { quantityType: "ea.", price: price_each },
    { quantityType: "3.5g", price: price_eighth_ounce },
    { quantityType: "1g", price: price_gram },
    { quantityType: "0.5g", price: price_half_gram },
    { quantityType: "0.5oz", price: price_half_ounce },
    { quantityType: "1oz", price: price_ounce },
    { quantityType: ".25oz", price: price_quarter_ounce },
    { quantityType: "2g", price: price_two_gram },
  ].filter((q) => q.price);

  const handleIncreaseQuantity = () => {
    if (quantity < max_cart_quantity) {
      setQuantity((prevValue) => prevValue + 1);
    } else {
      setQuantity(max_cart_quantity);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity((prevValue) => prevValue - 1);
    } else {
      setQuantity(0);
    }
  };

  const handleAddToCart = (price) => {
    dispatch(
      addToCart({
        photoUrl: product.photos[0].urls.small,
        quantity,
        quantityType: availableQuantities[0].quantityType,
        productId: product_id,
        name,
        price,
        maxCartQuantity: max_cart_quantity,
        brand,
      })
    );
  };

  const handleUpdateCart = () => {
    if (quantity === 0) {
      dispatch(removeFromCart(product_id));
    } else {
      dispatch(
        updateQuantity({
          quantity,
          productId: product_id,
        })
      );
    }
  };

  return (
    <CardContainer
      role="product-card"
      width="170px"
      height="auto"
      style={{ position: "relative", paddingBottom: "80px" }}
    >
      <FlexDiv center height="125px">
        <img src={product.photos[0].urls.small} width="100px" height="auto" alt={name} />
      </FlexDiv>
      <FlexDiv mb={1} mt={1} direction="column">
        <Tag>
          <StyledText bold capitalize>
            {custom_product_type}
          </StyledText>
        </Tag>
        <NoWrapText>
          <StyledText noWrap bold capitalize>
            {name}
          </StyledText>
        </NoWrapText>
        <StyledText bold capitalize>
          {brand}
        </StyledText>
      </FlexDiv>
      <NoWrapMultiLineText>
        <StyledText noWrap>{description}</StyledText>
      </NoWrapMultiLineText>
      <FlexDiv direction="row" mb={-1.25} mt={1} style={{ justifyContent: "space-between" }}>
        {review_count > 0 && (
          <FlexDiv direction="row" center>
            <StyledText bold style={{ marginRight: "2px" }}>
              {aggregate_rating}
            </StyledText>
            <Star
              size={16}
              style={{
                color: "rgb(255, 194, 32)",
                fill: "rgb(255, 194, 32)",
                fillOpacity: aggregate_rating / 5,
              }}
            />
            <StyledText
              style={{
                marginLeft: "2px",
                fontWeight: "normal",
                fontSize: ".7em",
              }}
            >
              ({review_count} review{review_count > 1 && "s"})
            </StyledText>
          </FlexDiv>
        )}
        {!review_count && <div style={{ flex: 1 }} />}
        {quantity === max_cart_quantity && (
          <StyledText style={{ fontWeight: "normal", fontSize: ".75em", color: "red" }}>
            Max {max_cart_quantity}
          </StyledText>
        )}
      </FlexDiv>
      <CartContainer>
        <QuantityContainer>
          {availableQuantities.length === 1 &&
            // kind of a pointless .map(), but I had plans for it to actually make sense with that Secret Galato
            availableQuantities.map((qty) => (
              <FlexDiv key={qty.quantityType} direction="column" center>
                <FlexDiv
                  direction="row"
                  width="100%"
                  pl={1}
                  pr={1}
                  style={{
                    justifyContent: "space-between",
                  }}
                >
                  <StyledText bold style={{ paddingLeft: "3px" }}>{`$${qty.price}0 / ${qty.quantityType}`}</StyledText>
                  <FlexDiv
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      paddingRight: "5px",
                    }}
                  >
                    <IconButton
                      role={`decrease-qty-${product_id}`}
                      onClick={handleDecreaseQuantity}
                      disabled={quantity === 0}
                    >
                      <MinusCircle size={15} />
                    </IconButton>
                    <StyledText style={{ margin: "0px 5px 0px 5px" }}>{quantity}</StyledText>
                    <IconButton
                      role={`increase-qty-${product_id}`}
                      onClick={handleIncreaseQuantity}
                      disabled={quantity === max_cart_quantity}
                    >
                      <PlusCircle size={15} />
                    </IconButton>
                  </FlexDiv>
                </FlexDiv>
                {!productAlreadyInCart && (
                  <StyledButton
                    role={`add-to-cart-${product_id}`}
                    onClick={() => handleAddToCart(qty.price)}
                    disabled={!quantity || productAlreadyInCart?.quantity === quantity}
                  >
                    <StyledText bold>Add To Cart</StyledText>
                  </StyledButton>
                )}
                {productAlreadyInCart && (
                  <StyledButton
                    role={`update-cart-${product_id}`}
                    onClick={handleUpdateCart}
                    disabled={productAlreadyInCart?.quantity === quantity}
                  >
                    <StyledText bold>Update Cart</StyledText>
                  </StyledButton>
                )}
              </FlexDiv>
            ))}
        </QuantityContainer>
        {availableQuantities.length > 1 && <StyledText bold>Pricing Varies</StyledText>}
      </CartContainer>
    </CardContainer>
  );
};

export default ProductCard;
