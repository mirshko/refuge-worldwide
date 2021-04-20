import VisuallyHidden from "@reach/visually-hidden";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useState } from "react";
import { INSTAGRAM_URL } from "../constants";
import Instagram from "../icons/instagram";
import { Menu } from "../icons/menu";
import MessageSquare from "../icons/message-square";
import NavigationLink from "./navigationLink";

const MobileMenu = dynamic(() => import("../components/mobileMenu"));

export default function Navigation() {
  const [isOpen, isOpenSet] = useState(false);
  const openMenu = () => isOpenSet(true);
  const closeMenu = () => isOpenSet(false);

  const openChat = useCallback(() => {
    const chatOptions =
      "width=480,height=520,menubar=no,location=no,resizable=no,scrollbars=no,status=no";

    window.open("/chat", "refugechatwindow", chatOptions);
  }, []);

  return (
    <nav className="text-black">
      <div className="px-4 md:px-8 py-2.5">
        <ul className="flex items-center">
          <li>
            <Link href="/">
              <a className="flex">
                <img
                  src="/images/navigation-smile.svg"
                  width={66}
                  height={40}
                  alt="Refuge"
                  loading="eager"
                />
              </a>
            </Link>
          </li>

          <li className="block lg:hidden ml-auto">
            <button
              onClick={openMenu}
              className="flex focus:outline-none focus:ring-4"
            >
              <VisuallyHidden>Open Menu</VisuallyHidden>
              <span aria-hidden>
                <Menu />
              </span>
            </button>
          </li>

          <li className="hidden lg:block flex-1">
            <ul className="md:flex justify-end items-center space-x-6 lg:space-x-8 xl:space-x-14">
              <li>
                <NavigationLink
                  href="/radio"
                  activeClassName="text-orange"
                  className="hover:text-orange focus:text-orange"
                >
                  Radio
                </NavigationLink>
              </li>
              <li>
                <NavigationLink
                  href="/news"
                  activeClassName="text-green"
                  className="hover:text-green focus:text-green"
                >
                  News
                </NavigationLink>
              </li>
              <li>
                <NavigationLink
                  href="/artists"
                  activeClassName="text-purple"
                  className="hover:text-purple focus:text-purple"
                >
                  Artists
                </NavigationLink>
              </li>
              <li>
                <NavigationLink
                  href="/support"
                  activeClassName="text-pink"
                  className="hover:text-pink focus:text-pink"
                >
                  Support
                </NavigationLink>
              </li>
              <li>
                <NavigationLink
                  href="/about"
                  activeClassName="text-brown"
                  className="hover:text-brown focus:text-brown"
                >
                  About
                </NavigationLink>
              </li>
              <li>
                <NavigationLink
                  href="/newsletter"
                  activeClassName="text-blue"
                  className="hover:text-blue focus:text-blue"
                >
                  Newsletter
                </NavigationLink>
              </li>
              <li>
                <ul className="flex space-x-6">
                  <li className="h-6 leading-none">
                    <button onClick={openChat}>
                      <MessageSquare />
                    </button>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={INSTAGRAM_URL}
                    >
                      <Instagram />
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <MobileMenu onDismiss={closeMenu} isOpen={isOpen} />
    </nav>
  );
}
