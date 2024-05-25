import Tooltip from "../tooltip";

export default function Header() {
  return (
    <div className="flex w-full border-b-4 border-black h-12 sm:h-24 font-title">
      <div className="container flex items-center justify-center sm:justify-between">
        <h1 className="text-xl sm:text-4xl font-bold">CHESSTUBE</h1>
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
              <a>Donate</a>
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
