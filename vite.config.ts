import react from "@vitejs/plugin-react";
import type { UserConfig } from "vite";
import { defineConfig } from "vite";

export default defineConfig(({ command }): UserConfig => {
	if (command === "build") {
		return {
			plugins: [react()],
			build: {
				outDir: "lib",
				lib: {
					entry: "src/index.ts",
					name: "Sangtae",
					formats: ["cjs"],
					fileName: "index",
				},
				minify: false,
				rollupOptions: {
					external: ["react", "react-dom"],
					output: {
						globals: {
							react: "React",
							"react-dom": "ReactDOM",
						},
					},
				},
			},
		};
	} else {
		return {
			plugins: [react()],
		};
	}
});
