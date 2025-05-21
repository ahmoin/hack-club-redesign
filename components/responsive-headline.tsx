"use client";

import { SlackCountText } from "@/components/slack-count-text";
import { useIsMobile } from "@/hooks/use-mobile";

export function ResponsiveHeadline() {
	const isMobile = useIsMobile();

	return (
		<>
			{isMobile ? (
				<h2 className="text-5xl tracking-tight text-balance leading-tight mt-8 max-w-9/10">
					<div className="text-7xl">We are </div>
					<SlackCountText className="text-7xl" />
					<div>teen hackers from around the world who code together</div>
				</h2>
			) : (
				<h2 className="text-5xl tracking-tight text-balance sm:text-7xl">
					We are{" "}
					<span>
						<SlackCountText />
					</span>{" "}
					teen hackers from around the world who code together
				</h2>
			)}
		</>
	);
}
