import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const isInfomaniak = process.env.DEPLOY_TARGET === "infomaniak";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Infomaniak manages the Node process directly. Docker deployments keep the
  // smaller standalone artifact used by Coolify and local Compose workflows.
  ...(isInfomaniak ? {} : { output: "standalone" }),

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          destination: "/en",
        },
        {
          source:
            "/:path((?!en(?:/|$)|de(?:/|$)|fr(?:/|$)|api(?:/|$)|_next(?:/|$)|_vercel(?:/|$)|.*\\..*).*)",
          destination: "/en/:path*",
        },
      ],
    };
  },

  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
