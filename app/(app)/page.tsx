import Image from "next/image";
import { CircularGallery } from "@/components/circular-gallery";
import { ColorfulText } from "@/components/colorful-text";
import { Globe } from "@/components/globe";
import { ResponsiveHeadline } from "@/components/responsive-headline";

export default function HomePage() {
	return (
		<div>
			<div className="relative flex -mt-(--header-height) max-h-[690px] min-h-[690px] items-center justify-center">
				<Image
					className="absolute inset-0  h-[690px] w-full object-cover bg-none transition-opacity dark:opacity-75"
					src={"/home/outernet-110.jpg"}
					alt={
						"Hack Clubbers gather in the great outdoors of Cabot, VT, for an experience unlike any other: Outernet. 📸 Photo by Matt Gleich, Hack Clubber in NH!"
					}
					width={1920}
					height={1080}
					priority
				/>
				<div className="container relative z-10 mt-2xl flex max-w-9/10 flex-col items-center justify-center gap-y-2xl text-center md:mt-lg md:gap-y-3xl text-white font-bold">
					<h1 className="text-3xl tracking-tight text-balance sm:text-5xl">
						Welcome to Hack Club
					</h1>
					<ResponsiveHeadline />
				</div>
			</div>
			<div className="relative flex -mt-(--header-height) max-h-[690px] min-h-[690px] items-center justify-center pt-72 sm:pt-0">
				<div className="container relative z-10 mx-auto mt-2xl flex max-w-[1057px] flex-col sm:flex-row items-center justify-center gap-y-2xl text-center md:mt-lg md:gap-y-3xl text-white font-bold">
					<div className="flex flex-col">
						<h1 className="text-5xl tracking-tight text-balance sm:text-7xl">
							Discover the <ColorfulText text={"joy of code,"} /> together.
						</h1>
						<h2 className="mt-8 text-lg font-medium text-pretty sm:text-xl/8">
							Every day, thousands of Hack Clubbers gather online and in-person
							to make things with code. Whether you're a beginner programmer or
							have years of experience, there's a place for you at Hack Club.
							Read about our hacker ethic.
						</h2>
					</div>
					<Globe />
				</div>
			</div>
			<div className="h-[50svh] relative w-[99svw] flex items-center justify-center">
				<CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
			</div>
		</div>
	);
}
