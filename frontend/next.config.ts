import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Gera .next/standalone (server.js + dependências mínimas), usado pela imagem
  // Docker em devops/docker/Dockerfile.frontend e pelo job "Ambiente completo" do CI.
  output: "standalone",
  // Mantém a raiz do rastreamento de arquivos na pasta frontend/, igual ao turbopack.
  outputFileTracingRoot: path.join(__dirname),
  turbopack: { root: path.join(__dirname) },
};

export default nextConfig;
