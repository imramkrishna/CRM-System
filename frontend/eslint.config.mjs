import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  // Ignore generated/build/vendor
  { ignores: [".next/**", "node_modules/**", "public/**", "dist/**", "build/**"] },

  // Next.js + TS base
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Project rules (only for your source)
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    rules: {
      // So api.ts can keep `any`
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-empty-object-type": "off",

      // So unused args don’t fail builds (prefix with _ to silence)
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],

      // Hooks rule as warn
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  // Declaration files can be noisy; relax them
  {
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];
