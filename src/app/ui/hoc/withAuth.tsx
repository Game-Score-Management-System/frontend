// TODO: REVISAR COMO IMPLEMENTAR ESTE HOC

// 'use client';

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const withAuth = (WrappedComponent: any) => {
//   return (props) => {
//     const router = useRouter();
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//       const session = localStorage.getItem('session');
//       if (session) {
//         setIsAuthenticated(true);
//       } else {
//         router.push('/login');
//       }
//     }, [router]);

//     if (!isAuthenticated) return null;

//     return <WrappedComponent {...props} />;
//   };
// };

// export default withAuth;
