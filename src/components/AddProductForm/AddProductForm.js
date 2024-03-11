import { getFromStorage, ROLE } from "../../store/local-storage";
import { create_product, edit_product, get_product } from "../../store/url";
import styles from "./AddProductForm.module.css";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useParams,
} from "react-router-dom";

export default function AddProductForm() {
  const { productId } = useParams();

  const {
    product: { name, category, short_desc, long_desc, price, quantity },
  } = useLoaderData() ?? { product: {} };

  const actionData = useActionData();

  return (
    <Form
      method={productId ? "PATCH" : "POST"}
      encType="multipart/form-data"
      className={styles.form}
    >
      <label>Product Name</label>
      <input
        type="text"
        name="name"
        defaultValue={name}
        placeholder="Enter Product Name"
      />
      <label>Price</label>
      <input
        type="number"
        name="price"
        defaultValue={price}
        placeholder="Enter Price"
      />
      <label>Quantity</label>
      <input
        type="number"
        name="quantity"
        defaultValue={quantity}
        placeholder="Enter Quantity"
      />
      <label>Category</label>
      <input
        type="text"
        name="category"
        defaultValue={category}
        placeholder="Enter Category"
      />
      <label>Short Description</label>
      <textarea
        rows={5}
        name="short_desc"
        defaultValue={short_desc}
        placeholder="Enter Short Description"
      />
      <label>Long Description</label>
      <textarea
        rows={5}
        name="long_desc"
        defaultValue={long_desc}
        placeholder="Enter Long Description"
      />
      <input type="hidden" name="productId" defaultValue={productId} />
      {!productId && (
        <>
          <label>Upload image (5 images)</label>
          <input type="file" name="images" multiple />
        </>
      )}
      <button type="submit">Submit</button>
      {actionData && <p>{actionData.msg}</p>}
    </Form>
  );
}

export const loader = async ({ request, params }) => {
  const role = getFromStorage(ROLE, "");
  if (!role) return redirect("/");
  else {
    if (role !== "admin") return redirect("/chats");
  }

  try {
    const { productId } = params;
    if (!productId) return null;

    const res = await fetch(get_product + productId + "?role=" + role);

    const data = await res.json();

    return res.ok ? data : null;
  } catch (error) {
    return null;
  }
};

export const action = async ({ request, params }) => {
  const role = getFromStorage(ROLE, "");

  try {
    const { productId } = params;
    const formData = await request.formData();

    const res = await fetch(
      (productId ? edit_product : create_product) + "?role=" + role,
      {
        body: formData,
        method: request.method,
      }
    );

    const data = await res.json();

    return data;
  } catch (error) {
    return null;
  }
};
