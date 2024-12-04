import "../assets/css/output.css"; // Import your global CSS file here
import Header from "../components/header";
import "../assets/vendors/bootstrap/css/bootstrap.css";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Exclude Header for specific routes
  const noHeaderRoutes = ["/project-detail/[slug]"];
  return (
    <>
      {!noHeaderRoutes.includes(router.pathname) && <Header />}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
