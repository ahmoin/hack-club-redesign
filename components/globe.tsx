"use client";

import createGlobe, { type COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

interface ClubLocation {
	fields: {
		Status?: string;
		Latitude?: number;
		Longitude?: number;
	};
}

const GLOBE_CONFIG: COBEOptions = {
	width: 800,
	height: 800,
	onRender: () => {},
	devicePixelRatio: 2,
	phi: 0,
	theta: 0.3,
	dark: 0,
	diffuse: 0.4,
	mapSamples: 16000,
	mapBrightness: 1.2,
	baseColor: [1, 1, 1],
	markerColor: [251 / 255, 100 / 255, 21 / 255],
	glowColor: [1, 1, 1],
	markers: [],
};

export function Globe({
	className,
	config = GLOBE_CONFIG,
}: {
	className?: string;
	config?: COBEOptions;
}) {
	const [markers, setMarkers] = useState<COBEOptions["markers"]>([]);
	let phi = 0;
	let width = 0;
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const pointerInteracting = useRef<number | null>(null);
	const pointerInteractionMovement = useRef(0);

	useEffect(() => {
		const fetchClubLocations = async () => {
			try {
				const clubs: ClubLocation[] = await fetch(
					`https://api2.hackclub.com/v0.1/Club Applications/Clubs Dashboard`,
				).then((res) => res.json());

				const activeClubMarkers = clubs
					.filter(({ fields: x }) => {
						if (!x.Status || x.Status === "inactive") return false;
						if (!(x?.Latitude && x?.Longitude)) return false;
						return true;
					})
					.map(({ fields: x }) => ({
						location: [x.Latitude!, x.Longitude!],
						size: 0.05,
					}));

				setMarkers(activeClubMarkers);
			} catch (error) {
				console.error("Failed to fetch Hack Club locations:", error);
				setMarkers([]);
			}
		};

		fetchClubLocations();
	}, []);

	const globeConfig = {
		...config,
		markers: markers,
	};

	const r = useMotionValue(0);
	const rs = useSpring(r, {
		mass: 1,
		damping: 30,
		stiffness: 100,
	});

	const updatePointerInteraction = (value: number | null) => {
		pointerInteracting.current = value;
		if (canvasRef.current) {
			canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
		}
	};

	const updateMovement = (clientX: number) => {
		if (pointerInteracting.current !== null) {
			const delta = clientX - pointerInteracting.current;
			pointerInteractionMovement.current = delta;
			r.set(r.get() + delta / MOVEMENT_DAMPING);
		}
	};

	useEffect(() => {
		const onResize = () => {
			if (canvasRef.current) {
				width = canvasRef.current.offsetWidth;
			}
		};

		window.addEventListener("resize", onResize);
		onResize();

		const globe = createGlobe(canvasRef.current!, {
			...globeConfig,
			width: width * 2,
			height: width * 2,
			onRender: (state) => {
				if (!pointerInteracting.current) phi += 0.005;
				state.phi = phi + rs.get();
				state.width = width * 2;
				state.height = width * 2;
			},
		});

		setTimeout(() => (canvasRef.current!.style.opacity = "1"), 0);
		return () => {
			globe.destroy();
			window.removeEventListener("resize", onResize);
		};
	}, [rs, globeConfig, phi, width]);

	return (
		<div
			className={cn(
				"aspect-[1/1] w-full min-w-[300px] md:min-w-[600px] max-w-[600px]",
				className,
			)}
		>
			<canvas
				className={cn(
					"size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
				)}
				ref={canvasRef}
				onPointerDown={(e) => {
					pointerInteracting.current = e.clientX;
					updatePointerInteraction(e.clientX);
				}}
				onPointerUp={() => updatePointerInteraction(null)}
				onPointerOut={() => updatePointerInteraction(null)}
				onMouseMove={(e) => updateMovement(e.clientX)}
				onTouchMove={(e) =>
					e.touches[0] && updateMovement(e.touches[0].clientX)
				}
			/>
		</div>
	);
}
