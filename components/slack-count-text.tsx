"use client";

import { HTMLAttributes } from "react";
import { NumberTicker } from "@/components/number-ticker";

export function SlackCountText({
	...props
}: HTMLAttributes<HTMLAnchorElement>) {
	return (
		<NumberTicker
			value={66472}
			className="whitespace-pre-wrap tracking-tighter"
			{...props}
		/>
	);
}
