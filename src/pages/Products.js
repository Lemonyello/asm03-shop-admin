import ProductList from "../components/ProductList/ProductList";
import useProtect from "../hooks/use-protect";

export default function ProductsPage() {
  useProtect();

  return <ProductList />;
}
