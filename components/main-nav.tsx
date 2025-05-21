"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Flag } from "@/components/flag";

export function MainNav() {
	const pathname = usePathname();

	return (
		<div className="mr-4 hidden md:flex">
			{/* <Link
				href="/"
				className="mr-4 flex items-center gap-2 lg:mr-6 text-special"
			>
				<span className="hidden font-bold text-2xl lg:inline-block">
					{siteConfig.name}
				</span>
			</Link> */}
			<Flag href="https://hackclub.com/" />
			<nav className="flex items-center gap-4 text-sm xl:gap-6">
				<Link
					href="/clubs"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname?.startsWith("/clubs")
							? "text-foreground"
							: "text-foreground/80",
					)}
				>
					Clubs
				</Link>
				<Link
					href="/fiscal-sponsorship"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname?.startsWith("/fiscal-sponsorship")
							? "text-foreground"
							: "text-foreground/80",
					)}
				>
					Fiscal Sponsorship
				</Link>
				<Link
					href="/hackathons"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname?.startsWith("/hackathons")
							? "text-foreground"
							: "text-foreground/80",
					)}
				>
					Hackathons
				</Link>
				<Link
					href="/community"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname?.startsWith("/community")
							? "text-foreground"
							: "text-foreground/80",
					)}
				>
					Community
				</Link>
				<Link
					href="/scrapbook"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname?.startsWith("/scrapbook")
							? "text-foreground"
							: "text-foreground/80",
					)}
				>
					Scrapbook
				</Link>
				<Link
					href="/toolbox"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname?.startsWith("/toolbox")
							? "text-foreground"
							: "text-foreground/80",
					)}
				>
					Toolbox
				</Link>
			</nav>
		</div>
	);
}
