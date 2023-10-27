import MainLayout from "../components/MainLayout";

export default function Layout({ children,about }) {
  return (
    <>
      <MainLayout>
        {children}
        </MainLayout>
        {about}
    </>
  );
}
