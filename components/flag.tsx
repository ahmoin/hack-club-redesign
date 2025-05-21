"use client";

import Link, { type LinkProps } from "next/link";
import { cn } from "@/lib/utils";

interface FlagProps extends LinkProps {
	scrolled?: boolean;
}

export function Flag({ scrolled, ...props }: FlagProps) {
	return (
		<Link
			title="Homepage"
			className={cn(
				"bg-[url('https://assets.hackclub.com/flag-orpheus-top.svg')] bg-no-repeat bg-[top_left] bg-contain cursor-pointer flex-shrink-0 w-[112px] h-[48px] md:w-[172px] md:h-[64px] transform-origin-top-left animate-in hover:spin-in-5 duration-500 ease-in-out repeat-infinite direction-alternate-reverse",
				scrolled && "transform scale-[0.875] h-[56px]",
			)}
			{...props}
		/>
	);
}
