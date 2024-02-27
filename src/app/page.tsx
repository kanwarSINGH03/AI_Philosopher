import Chat from "@/components/Chat";
export default function Home() {
  return (
    <main className="bg-fixed bg-[url('../../public/philo.webp')] bg-cover bg-center flex flex-1 flex-col min-h-screen items-center justify-between p-24">
      <Chat />
    </main>
  );
}
