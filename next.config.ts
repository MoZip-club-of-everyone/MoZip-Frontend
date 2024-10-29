import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    // styled-components 지원 활성화
    styledComponents: true,
  },
};

export default nextConfig;
