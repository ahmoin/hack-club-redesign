"use client";

import { SlackCountText } from "@/components/slack-count-text";

export function ResponsiveHeadline() {
	return (
		<h2 className="mt-8 text-lg font-medium text-balance sm:text-xl/8">
			We are{" "}
			<span>
				<SlackCountText />
			</span>{" "}
			teen hackers from around the world who code together
		</h2>
	);
}
