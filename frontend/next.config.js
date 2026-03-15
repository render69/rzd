/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Пропускаем ошибки типов при сборке
    ignoreBuildErrors: true,
  },
  eslint: {
    // Пропускаем ошибки линтера
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
