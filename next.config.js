const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  images: {
    domains: ["images.ctfassets.net"],
  },
  future: {
    webpack5: true,
  },
  reactStrictMode: true,
});
