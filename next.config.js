/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.aclcs.com'],
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nkwfloubiiauyotgbqmv.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rd2Zsb3ViaWlhdXlvdGdicW12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0OTI2NzIsImV4cCI6MjA4NzA2ODY3Mn0.JcsgOSH2FExhEnI2L2gREEJLWQmEHtcjPKCzgYEOXlA',
  },
};

module.exports = nextConfig;
