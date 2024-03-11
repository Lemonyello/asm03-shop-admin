import { useLoaderData, redirect } from "react-router-dom";
import InfoBoard from "../components/InfoBoard/InfoBoard";
import OrderList from "../components/OrderList/OrderList";
import { get_dashboard } from "../store/url";
import { getFromStorage, ROLE } from "../store/local-storage";

export default function DashboardPage() {
  const { users, earningsMon, newOrder, orders } = useLoaderData();

  return (
    <div>
      <InfoBoard users={users} earningsMon={earningsMon} newOrder={newOrder} />
      <OrderList orders={orders} />
    </div>
  );
}

export const loader = async () => {
  const role = getFromStorage(ROLE, "");
  if (!role) return redirect("/");
  else {
    if (role !== "admin") return redirect("/chats");
  }

  try {
    const res = await fetch(get_dashboard + "?role=" + role);

    const data = await res.json();

    return res.ok ? data : null;
  } catch (error) {
    return null;
  }
};
