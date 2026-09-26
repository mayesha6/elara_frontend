import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;
