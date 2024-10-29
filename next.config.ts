import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    // styled-components 지원 활성화
    styledComponents: true,
  },
  devIndicators: {
    buildActivity: false, // 빌드 배지 비활성화
    appIsrStatus: false,  // ISR 관련 배지 비활성화
  },
};

export default nextConfig;
