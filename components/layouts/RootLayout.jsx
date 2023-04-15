import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
const HandleAuth = dynamic(() => import("./HandleAuth"), {
  ssr: false,
});

export default function RootLayout({ children }) {
  return (
    <HandleAuth>
      <Toaster position="bottom-center" />
      <div className="min-h-screen">{children}</div>
    </HandleAuth>
  );
}
