import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/mode-toggle";
import CartModal from "./CartModal";
import { CartContext } from "@/components/shopping-cart";
import { useEffect, useState, useContext, useRef } from "react";

const Header = () => {
  const modal = useRef<any>(null); // Corrected useRef type
  const { items } = useContext(CartContext);
  const cartQuantity = items.length;
  const TOP_OFFSET = 50;
  const [showBackground, setShowBackground] = useState(false);

  const handleOpenCartClick = () => {
    if (modal.current && modal.current.open) {
      modal.current.open();
    }
  };

  let modalActions = <button>Close</button>;
  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`w-screen fixed top-0 z-50 ${
        showBackground ? "bg-white" : ""
      }`}
    >
      <CartModal ref={modal} title="Your Cart" actions={modalActions} />
      <div className="container flex py-4">
        <NavigationMenu className="justify-between max-w-none">
          <a href="/" className="logo flex justify-center items-center">
            <svg
              fill="#FACC15"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="40px"
              height="40px"
              viewBox="0 0 485.54 485.54"
              xmlSpace="preserve"
              stroke="#FACC15"
              strokeWidth="0.0048553500000000005"
              transform="matrix(1, 0, 0, 1, 0, 0)rotate(90)"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <g>
                  <g id="_x35__13_">
                    <g>
                      <path d="M55.465,123.228c-15.547,0-28.159,12.608-28.159,28.161v56.673C11.653,211.908,0,225.928,0,242.765 c0,16.842,11.652,30.861,27.306,34.707v56.666c0,15.555,12.612,28.16,28.159,28.16c15.546,0,28.16-12.605,28.16-28.16V151.389 C83.625,135.837,71.011,123.228,55.465,123.228z"></path>
                      <path d="M334.498,65.278c-23.092,0-41.811,18.719-41.811,41.812v93.864h-12.801h-60.585h-19.625l-6.827-0.163V107.09 c0-23.092-18.72-41.812-41.813-41.812c-23.091,0-41.812,18.719-41.812,41.812v271.355c0,23.093,18.721,41.812,41.812,41.812 c23.094,0,41.813-18.719,41.813-41.812v-93.653c0,0,4.501-0.211,6.827-0.211h19.625h60.585h12.801v93.864 c0,23.093,18.719,41.812,41.811,41.812c23.094,0,41.812-18.719,41.812-41.812V107.089 C376.311,83.998,357.592,65.278,334.498,65.278z"></path>
                      <path d="M458.229,208.062v-56.673c0-15.552-12.613-28.161-28.158-28.161c-15.547,0-28.16,12.608-28.16,28.161v182.749 c0,15.555,12.613,28.16,28.16,28.16c15.545,0,28.158-12.605,28.158-28.16v-56.666c15.654-3.846,27.307-17.865,27.307-34.707 C485.535,225.927,473.883,211.908,458.229,208.062z"></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <h1 className="font-mine text-2xl">FitTrack</h1>
          </a>
          <NavigationMenuList className="mx-16">
            <NavigationMenuItem>
              <a
                href="#HowItWorks"
                className={"text-lg " + navigationMenuTriggerStyle()}
              >
                How It Works
              </a>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <a
                href="#Reviews"
                className={"text-lg " + navigationMenuTriggerStyle()}
              >
                Reviews
              </a>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <a
                href="#GetTheApp"
                className={"text-lg " + navigationMenuTriggerStyle()}
              >
                Get the App
              </a>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button className="text-lg mr-2">
                <a href="/Login">Join Us</a>
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ModeToggle />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button onClick={handleOpenCartClick}>
                Cart ({cartQuantity})
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default Header;
