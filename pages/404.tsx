import StyledButton from "@/components/general/StyledButton";
import Image from "next/image";

function ErrorPage() {

    return (
        <div className="w-screen h-screen bg-white flex flex-col gap-4 justify-center items-center text-neutral-600">
            <Image src='/../public/404.png' alt={"404 icon"} height={300} width={300}></Image>
            <h1 className="text-3xl text-emerald-500 mono font-bold">Page not found!</h1>
            <div className="w-80">
                <StyledButton text={'Go to home page'}></StyledButton>
            </div>
        </div>
    )
}

export default ErrorPage;