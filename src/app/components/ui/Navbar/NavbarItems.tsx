import { NavbarItem } from "../../types";

export const navbarItems: NavbarItem[] = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/trainings", label: "Trainings", authOnly: true },
  { href: "/profile", label: "Profile", authOnly: true },
  { href: "/auth", label: "Sign In", guestOnly: true },
];

export const filterNavbarItems = (userExists: boolean, items: NavbarItem[]) => {
  return items.filter((item) => {
    if (userExists) {
      return !item.guestOnly;
    }
    return !item.authOnly;
  });
};

export const getTopMenuItems = (items: NavbarItem[]) => {
  return items.filter(
    (item) => !["/trainings", "/profile"].includes(item.href)
  );
};
