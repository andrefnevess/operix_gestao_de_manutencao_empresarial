import type { NextConfig } from "next";

// As chamadas a /api são encaminhadas para a API NestJS (API_URL é lido no build).
const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:caminho*",
        destination: `${process.env.API_URL ?? "http://localhost:3000"}/api/:caminho*`,
      },
    ];
  },
};

export default nextConfig;
