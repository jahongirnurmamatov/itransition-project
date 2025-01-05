import { useNavData } from "@/assets/data";
import { useLocation } from "react-router-dom";

export const useBreadcrumbs = () => {
  const { pathname } = useLocation();
  const { navMain } = useNavData();

  const breadcrumbs = [];
  navMain.forEach((nav) => {
    nav.items.forEach((item) => {
      if (pathname.startsWith(item.url)) {
        breadcrumbs.push({ title: nav.title, url: nav.url });
        breadcrumbs.push({ title: item.title, url: item.url });
      }
    });
  });

  return breadcrumbs;
};
