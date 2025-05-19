import { SiteHeader } from "@/components/site-header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className="[--header-height:calc(theme(spacing.14))]">
			<SiteHeader />
			{children}
		</main>
	);
}
