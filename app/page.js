import AdminUI from "@/components/adminUI";

export default function Home() {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-center text-3xl">Admin Dashboard</h1>
      <div className="border-b mt-2" />
      <AdminUI />
    </div>
  );
}
