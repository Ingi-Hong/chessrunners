import Tooltip from "../tooltip";

export default function Header() {
  return (
    <div className="flex w-full border-b-4 border-black h-24 font-title">
      <div className="container flex items-center justify-between">
        <h1 className="text-4xl font-bold">CHESSTUBE</h1>
        <nav>
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
