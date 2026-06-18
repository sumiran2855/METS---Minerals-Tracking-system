"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type MetsUserRole = "executive" | "applicant" | "inspector" | "analyst" | "public";

const roleRouteMap: Record<MetsUserRole, string> = {
	executive: "/dashboard/executive",
	applicant: "/dashboard/applicant",
	inspector: "/dashboard/inspector",
	analyst: "/dashboard/analyst",
	public: "/portal",
};

export default function DashboardEntryPage() {
	const router = useRouter();

	useEffect(() => {
		const storedUser = localStorage.getItem("mets_user");

		if (!storedUser) {
			router.replace("/login");
			return;
		}

		try {
			const parsedUser = JSON.parse(storedUser) as { role?: MetsUserRole };
			const targetRoute = parsedUser.role ? roleRouteMap[parsedUser.role] : undefined;
			router.replace(targetRoute ?? "/login");
		} catch {
			localStorage.removeItem("mets_user");
			router.replace("/login");
		}
	}, [router]);

	return null;
}
