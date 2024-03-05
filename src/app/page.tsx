import Chat from "@/components/Chat";
export default function Home() {
  return (
    <main className="h-screen w-screen bg-fixed bg-[url('../../public/philo.webp')] bg-cover bg-center flex flex-col justify-center overflow-hidden">
      <div className={"flex items-stretch mx-auto w-full max-w-[700px] my-auto h-full max-h-[600px]"}>
        <Chat />
      </div>
    </main>
  );
}
