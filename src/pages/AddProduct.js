import AddProductForm from "../components/AddProductForm/AddProductForm";
import useProtect from "../hooks/use-protect";

export default function AddProductPage() {
  useProtect();

  return (
    <div>
      <AddProductForm />
    </div>
  );
}
