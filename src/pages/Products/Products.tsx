import React, { useEffect, useState } from "react";
import ProductCard from "src/components/cards/ProductCard";
import { fetchProducts, Product } from "src/client";
import { PageContainer, FlexDiv, StyledInput, StyledText } from "src/styles";

const Products = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProducts();
      return data;
    };
    fetchData()
      .then((res) => setProducts(res))
      .catch((e) => console.error(e));
  }, []);

  // with a ton of products (or pagination) I'd run this filter on the api query or at least use a search button
  const handleFilterProducts = (products) => {
    return products.filter((product) =>
      `${product.name} + ${product.description}`
        .replaceAll(" ", "")
        .toLowerCase()
        .includes(query.replaceAll(" ", "").toLowerCase())
    );
  };

  return (
    <PageContainer>
      <FlexDiv direction="column">
        <StyledText bold>Search by name or description:</StyledText>
        <StyledInput
          type="text"
          value={query}
          placeholder="ex. Banana Kush"
          role="query-input"
          onChange={(e) => setQuery(e.target.value)}
        />
      </FlexDiv>
      <FlexDiv style={{ flexWrap: "wrap", justifyContent: "center" }}>
        {handleFilterProducts(products).map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </FlexDiv>
    </PageContainer>
  );
};

export default Products;
