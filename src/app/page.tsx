import Chat from "@/components/Chat";
export default function Home() {
  return (
    <main className="min-w-screen min-h-screen bg-fixed bg-[url('../../public/philo.webp')] bg-cover bg-center flex flex-col">
      <div className={"flex items-stretch mx-auto my-auto w-full max-w-[700px]"}>
        <Chat />
      </div>
    </main>
  );
}
