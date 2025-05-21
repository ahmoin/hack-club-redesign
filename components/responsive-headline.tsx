"use client";

import { SlackCountText } from "@/components/slack-count-text";
import { useIsMobile } from "@/hooks/use-mobile";

export function ResponsiveHeadline() {
	const isMobile = useIsMobile();

	return (
		<>
			{isMobile ? (
				<h2 className="text-4xl tracking-tight text-balance leading-tight">
					<div className="mb-2 max-w-3/4 min-w-3/4">
						We are{" "}
						<span>
							<SlackCountText />
						</span>
					</div>
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
