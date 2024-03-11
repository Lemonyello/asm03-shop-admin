// export const base = "http://localhost:5000/";
export const base = "https://backend-asm03-funix.onrender.com/";

const products = base + "products/admin/";

export const get_products = products + "products/";

export const get_dashboard = base + "orders/admin/dashboard";

export const get_product = base + "products/user/get/";

export const create_product = products + "create";

export const edit_product = products + "edit";

export const delete_product = products + "delete";

export const login = base + "users/admin-login";
