import Image from "next/image";
import Chat from "@/components/Chat";

export default function Home() {
  return (
    <main className= "bg-[url('../../public/philo.webp')] bg-cover bg-center flex min-h-screen flex-col items-center justify-between p-24">
        <Chat />
    </main>
  );
}
