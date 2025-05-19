"use client";

import * as React from "react";
import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { siteConfig } from "@/config/site";

export function MobileNav() {
	const [open, setOpen] = React.useState(false);

	const onOpenChange = React.useCallback((open: boolean) => {
		setOpen(open);
	}, []);

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerTrigger asChild>
				<div className="flex flex-row items-center gap-8 md:hidden">
					<Button
						variant="ghost"
						className="h-8 gap-4 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="!size-6"
							aria-label="Toggle Menu"
						>
							<title>Toggle Menu</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3.75 9h16.5m-16.5 6.75h16.5"
							/>
						</svg>
						<span className="sr-only">Toggle Menu</span>
					</Button>
					<Link
						href="/"
						className="mr-4 flex items-center gap-2 lg:mr-6 text-special"
					>
						<span className="inline-block font-bold text-lg">
							{siteConfig.name}
						</span>
					</Link>
				</div>
			</DrawerTrigger>
			<DrawerContent className="max-h-[80svh] p-0">
				<div className="overflow-auto p-6">
					<div className="flex flex-col space-y-3">
						<MobileLink href={"/clubs"} onOpenChange={setOpen}>
							Clubs
						</MobileLink>
						<MobileLink href={"/fiscal-sponsorship"} onOpenChange={setOpen}>
							Fiscal Sponsorship
						</MobileLink>
						<MobileLink href={"/hackathons"} onOpenChange={setOpen}>
							Hackathons
						</MobileLink>
						<MobileLink href={"/community"} onOpenChange={setOpen}>
							Community
						</MobileLink>
						<MobileLink href={"/scrapbook"} onOpenChange={setOpen}>
							Scrapbook
						</MobileLink>
						<MobileLink href={"/toolbox"} onOpenChange={setOpen}>
							Toolbox
						</MobileLink>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}

interface MobileLinkProps extends LinkProps {
	onOpenChange?: (open: boolean) => void;
	children: React.ReactNode;
	className?: string;
}

function MobileLink({
	href,
	onOpenChange,
	className,
	children,
	...props
}: MobileLinkProps) {
	const router = useRouter();
	return (
		<Link
			href={href}
			onClick={() => {
				router.push(href.toString());
				onOpenChange?.(false);
			}}
			className={cn("text-[1.15rem]", className)}
			{...props}
		>
			{children}
		</Link>
	);
}
