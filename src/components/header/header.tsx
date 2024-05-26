import { useState } from "react";
import Drawer from "../drawer";
import Tooltip from "../tooltip";
import { Button } from "../ui/button";
import Filters from "@/filters/filters";

export default function Header() {
  const [isActive, setActive] = useState(false);
  const handleDrawer = () => {
    setActive(!isActive);
  };
  return (
    <div className="flex w-full border-b-4 border-black h-12 sm:h-24 font-title">
      <Drawer
        active={isActive}
        setActive={setActive}
        children={[<Filters small={true}></Filters>]}
      />
      <div className="md:container flex items-center justify-center sm:justify-between sm:w-full pr-4">
        <div className="flex md:hidden justify-center items-center">
          <Button variant="nav" onClick={handleDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className=""
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </Button>
          <h1 className="text-xl sm:text-4xl font-bold hidden sm:block">
            CHESSTUBE
          </h1>
        </div>
        <h1 className="text-xl sm:text-4xl font-bold sm:hidden md:block">
          CHESSTUBE
        </h1>
        {/* <Marquee
          items={[
            "Oh no my queen!",
            "Will the real Sam Shanklin please stand up?",
            "Niemann butt investigation proves messy yet inconclusive",
            "Ask yourself: What does your opponent want to do?",
          ]}
        /> */}
        <nav className="hidden sm:block">
          <ul className="flex gap-4">
            <li>
              <Tooltip
                elementToHover={<a>Contribute</a>}
                tooltip="Coming soon..."
              />
            </li>
            <li>
              <a href="https://docs.google.com/document/d/1ZVGJRn0l6gz41UqLkKZlvcgSXKTbeP4nXRVE9ezXeJE/edit?usp=sharing">
                Credits
              </a>
            </li>
            <li>
              <a href="https://github.com/Ingi-Hong/chesstube.app">Github</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
