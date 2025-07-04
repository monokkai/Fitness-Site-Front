export interface NavbarItem {
    href: string;
    label: string;
    authOnly?: boolean;
    guestOnly?: boolean;
}

const navbarItems: NavbarItem[] = [
    {
        href: "/",
        label: "Home",
    },
    {
        href: "/about-us",
        label: "About",
    },
    {
        href: "/pricing",
        label: "Pricing",
    },
    {
        href: "/trainings",
        label: "Trainings",
        authOnly: true,
    },
    {
        href: "/profile",
        label: "Profile",
        authOnly: true,
    },
];

export default navbarItems; 