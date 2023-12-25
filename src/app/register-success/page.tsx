import Image from "next/image";
import SuccessSvg from "@/assets/images/success.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegisterSuccessPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="fixed h-screen w-screen top-0 overflow-hidden bg-white z-20">
      <div className="flex h-full flex-col justify-center items-center">
        <div className="max-w-[500px] text-center py-32">
          <Image src={SuccessSvg} width={500} height={500} alt="success" />
          <h4 className="text-xl py-4">
            Register successfully, please go back to login page
          </h4>
          <Button>
            <Link href="/">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
