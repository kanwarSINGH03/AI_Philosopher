import Chat from "@/components/Chat";
export default function Home() {
  return (
    <main className="min-w-screen min-h-screen bg-fixed bg-[url('../../public/philo.webp')] bg-cover bg-center flex flex-1 flex-col items-center justify-between">
      <Chat />
    </main>
  );
}
