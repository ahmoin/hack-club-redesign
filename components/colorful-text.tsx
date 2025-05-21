"use client";

import React from "react";
import { motion } from "motion/react";

export function ColorfulText({ text }: { text: string }) {
	const getGradientColor = (index: number, total: number) => {
		const progress = index / (total - 1);
		const r = Math.round(238 + (249 - 238) * progress);
		const g = Math.round(65 + (111 - 65) * progress);
		const b = Math.round(77 + (63 - 77) * progress);
		return `rgb(${r}, ${g}, ${b})`;
	};
	return text.split("").map((char, index) => (
		<motion.span
			/* biome-ignore lint/suspicious/noArrayIndexKey: TODO: fix this */
			key={`${char}-${index}`}
			initial={{
				y: 0,
			}}
			animate={{
				color: getGradientColor(index, text.length),
				y: [0, -3, 0],
				scale: [1, 1.01, 1],
				filter: ["blur(0px)", `blur(5px)`, "blur(0px)"],
				opacity: [1, 0.8, 1],
			}}
			transition={{
				duration: 0.5,
				delay: index * 0.05,
			}}
			className="inline-block whitespace-pre font-sans tracking-tight"
		>
			{char}
		</motion.span>
	));
}
