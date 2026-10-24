import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // react-three-fiber's useFrame mutates Three.js objects (camera, mesh,
    // geometry) imperatively every frame by design — that's how it avoids
    // triggering React re-renders for animation. The react-hooks/immutability
    // rule (aimed at the React Compiler) doesn't recognize this escape hatch.
    files: ["src/components/three/**/*.tsx"],
    rules: {
      "react-hooks/immutability": "off",
    },
  },
  {
    // One-time effects that read browser-only APIs (matchMedia, navigator,
    // WebGL feature detection) on mount can't run during render (SSR), and
    // aren't a subscription that needs useSyncExternalStore.
    files: [
      "src/hooks/usePrefersReducedMotion.ts",
      "src/components/three/PoolCanvas.tsx",
    ],
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
