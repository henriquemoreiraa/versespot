import Layout from "@/components/Layout";
import "./index.css";

export default function LoadingUI() {
  return (
    <Layout>
      <div className="flex flex-col">
        <span className="skeleton max-w-96 w-full h-9 mb-10 bg-gray-1 flex" />
        <span className="skeleton md:aspect-video md:h-90vh h-screen bg-gray-1  flex-col justify-center flex p-10">
          <span className="skeleton bg-gray-50 w-36 h-12 mb-10 flex" />
          <span className="skeleton bg-gray-50 w-full h-9 mb-10 flex" />
          <span className="skeleton bg-gray-50 w-full h-9 mb-10 flex" />
          <span className="skeleton bg-gray-50 w-full h-9 mb-10 flex" />
        </span>
      </div>
    </Layout>
  );
}
