// src/pages/dashboard/index.tsx
import React from 'react';
import Layout from '../../components/Layout';

// const Dashboard: React.FC = () => {
//   return (
//     <Layout>
//       <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
//       <p>This is the dashboard content.</p>
//     </Layout>
//   );
// };
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <Layout>
          {children}
          </Layout>
          
     
    );
  }