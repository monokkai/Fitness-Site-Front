export interface NavbarItem {
    href: string;
    label: string;
    authOnly?: boolean;
    guestOnly?: boolean;
}

export interface NavbarProps {
    isPricingPage: boolean;
    pathname?: string;
}
