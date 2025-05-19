import type { Metadata, Viewport } from "next";

import { fontVariables } from "@/lib/fonts";
import { Analytics } from "@/components/analytics";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";

import "./globals.css";
import { cn } from "@/lib/utils";

const META_THEME_COLORS = {
	light: "#ffffff",
	dark: "#09090b",
};

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	metadataBase: new URL(siteConfig.url),
	description: siteConfig.description,
	keywords: ["Next.js", "React", "Tailwind CSS"],
	authors: [
		{
			name: siteConfig.author,
			url: siteConfig.authorUrl,
		},
	],
	creator: siteConfig.author,
	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: [
			{
				url: `${siteConfig.url}/opengraph-image.png`,
				width: 1200,
				height: 630,
				alt: siteConfig.name,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.name,
		description: siteConfig.description,
		images: [`${siteConfig.url}/opengraph-image.png`],
		creator: siteConfig.authorTwitter,
	},
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
	manifest: `${siteConfig.url}/site.webmanifest`,
};

export const viewport: Viewport = {
	themeColor: META_THEME_COLORS.light,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: needed for theme initialization
					dangerouslySetInnerHTML={{
						__html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
					}}
				/>
			</head>
			<body
				className={cn(
					"bg-background overscroll-none font-sans antialiased",
					fontVariables,
				)}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
					enableColorScheme
				>
					{children}
					<TailwindIndicator />
					<Toaster />
					<Analytics />
				</ThemeProvider>
			</body>
		</html>
	);
}
