"use client";

import Balancer from "react-wrap-balancer";
import { SlackCountText } from "@/components/slack-count-text";

export function ResponsiveHeadline() {
	return (
		<h2 className="mt-8 font-medium text-5xl sm:text-7xl">
			<Balancer>
				We are{" "}
				<span>
					<SlackCountText />
				</span>{" "}
				teen hackers from around the world who code together
			</Balancer>
		</h2>
	);
}
