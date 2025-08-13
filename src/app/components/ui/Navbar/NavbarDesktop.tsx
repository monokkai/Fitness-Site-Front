import { Flex, Spacer, Button, ButtonProps } from "@chakra-ui/react";
import Link from "next/link";
import { useAuth } from "../../../shared/context/authContext";
import { NavbarUserMenu } from "./NavbarUserMenu";
import { NavbarSignInButton } from "./NavbarSignInButton";

type NavbarItem = {
  href: string;
  label: string;
};

type NavbarDesktopProps = {
  items: NavbarItem[];
  isPricingPage: boolean;
  pathname?: string;
  isVisible: boolean;
  handleClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  getActiveStyles: (href: string) => Partial<ButtonProps>;
};

export const NavbarDesktop = ({
  items,
  isPricingPage,
  pathname,
  isVisible,
  handleClick,
  getActiveStyles,
}: NavbarDesktopProps) => {
  const { user, isLoading } = useAuth();

  return (
    <>
      <Spacer display={{ base: "none", md: "block" }} />
      <Flex display={{ base: "none", md: "flex" }} alignItems="center" gap={4}>
        {items.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={(e) => handleClick(e, href)}
            aria-label={`Go to ${label}`}
            scroll={
              href.startsWith("/") && !href.includes("#") ? undefined : false
            }
          >
            <Button {...getActiveStyles(href)}>{label}</Button>
          </Link>
        ))}

        {!isLoading && user && <NavbarUserMenu isPricingPage={isPricingPage} />}
      </Flex>
      <NavbarSignInButton isVisible={isVisible} pathname={pathname} />
    </>
  );
};
