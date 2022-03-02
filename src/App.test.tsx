import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import * as mockApi from "src/client";
import { products } from "../src/__mocks__/products";

const mockFetchProducts = jest.spyOn(mockApi, "fetchProducts");
mockFetchProducts.mockResolvedValue(products);

const renderApp = () =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

/**
 * We should test that following requirements are met.
 *
 * 1. Customer should be presented with a list of products on app load.
 *
 * 2. When a customer types in a search box some text, the product
 *    results should filter to display only items with a name
 *    or description matching that text.
 *
 * 3. Customer should be able to add a product to their cart.
 *
 * 4. Customer should be able to remove a product from their cart.
 *
 */

test("renders list of products", async () => {
  const { findAllByRole } = renderApp();
  const product = await findAllByRole("product-card");
  expect(product).toHaveLength(products.length);
});

test("filter list of products", async () => {
  const { findByRole, findAllByRole } = renderApp();
  const input = await findByRole("query-input");
  fireEvent.change(input, { target: { value: "BaNaNaKUSH" } });
  const products = await findAllByRole("product-card");
  expect(products).toHaveLength(2);
});

test("add a product to the cart", async () => {
  const { findByRole } = renderApp();
  const increase = await findByRole("increase-qty-543191");
  const addToCart = await findByRole("add-to-cart-543191");
  fireEvent.click(increase);
  fireEvent.click(addToCart);
  const cart = store.getState().shoppingCart.products;
  expect(cart).toHaveLength(1);
});

test("remove the previously added product from the cart", async () => {
  const { findByRole } = renderApp();
  const decrease = await findByRole("decrease-qty-543191");
  const updateCart = await findByRole("update-cart-543191");
  fireEvent.click(decrease);
  fireEvent.click(updateCart);
  const cart = store.getState().shoppingCart.products;
  expect(cart).toHaveLength(0);
});
