import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "@/components/Layout";
import { SWRConfig } from "swr";
import RouteGuard from "@/components/RouteGuard";
import { Provider } from "jotai";

const fetcher = async (...args) => {
  const response = await fetch(...args);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
};

export default function App({ Component, pageProps }) {
  return (
    <Provider>
      <SWRConfig value={{ fetcher }}>
        <Layout>
          <RouteGuard>
            <Component {...pageProps} />
          </RouteGuard>
        </Layout>
      </SWRConfig>
    </Provider>
  );
}
