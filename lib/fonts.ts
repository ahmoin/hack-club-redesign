import {
	Geist,
	Geist_Mono,
	Instrument_Sans,
	Inter,
	Mulish,
	Noto_Sans_Mono,
} from "next/font/google";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const fontSans = localFont({
	src: [
		{
			path: "../public/bin/style/PhantomSans_Regular.woff",
			weight: "400",
			style: "normal",
		},
		{
			path: "../public/bin/style/PhantomSans_Bold.woff",
			weight: "700",
			style: "normal",
		},
	],
	variable: "--font-sans",
});

const fontGeist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

const fontMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

const fontInstrument = Instrument_Sans({
	subsets: ["latin"],
	variable: "--font-instrument",
});

const fontNotoMono = Noto_Sans_Mono({
	subsets: ["latin"],
	variable: "--font-noto-mono",
});

const fontMulish = Mulish({
	subsets: ["latin"],
	variable: "--font-mulish",
});

const fontInter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export const fontVariables = cn(
	fontSans.variable,
	fontMono.variable,
	fontGeist.variable,
	fontInstrument.variable,
	fontNotoMono.variable,
	fontMulish.variable,
	fontInter.variable,
);
