import "./Navbar.css"; // CSS file for Navbar
import { JetBrains_Mono } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {
  faYoutube,
  faDiscord,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
const jetbrains = JetBrains_Mono({ subsets: ["latin"] });

export default function Navbar() {
  return (
    <nav
      className={`bg-surface0 hover:bg-surface1 relative items-center overflow-hidden px-5 py-2.5 text-center transition-all duration-300 ease-in-out ${jetbrains.className}`}
    >
      <div className="float-left">
        <div className="flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110">
          <div className="user-avatar">
            <Image
              className="mr-2 h-8 w-8 rounded-full object-cover"
              width="32"
              height="32"
              alt="rrcoder0167's avatar"
              src="/rrcoder0167_avatar.jpeg"
            />
          </div>
          <span
            className="bg-green border-surface0 relative right-3 top-3 z-10 inline-block h-5 w-5 rounded-full border-4"
            id="discStatus-dot"
          ></span>
        </div>
        {/* Modal
        <div id="discModal" className="discModal">
          <div className="discModal-content">
            <span className="close">&times;</span>
            <div className="discordCard" id="discordCard">
              <img
                className="discModal-avatar"
                id="avatarImage-big"
                alt="Discord avatar"
              />
              <h1 id="username"></h1>
              <hr />
              <span id="userInfo"></span>
            </div>
          </div>
        </div>
        */}
      </div>
      <div className="absolute left-1/2 top-1/2 float-none m-auto flex -translate-x-1/2 -translate-y-1/2 transform px-4">
        <a
          href="/"
          className="text-mauve hover:text-blue px-4 font-bold no-underline transition duration-300 ease-in-out hover:cursor-pointer hover:font-black"
        >
          Home
        </a>
        <a
          href="/projects"
          className="text-subtext0 hover:text-text px-4 no-underline transition duration-300 ease-in-out hover:cursor-pointer hover:font-semibold"
        >
          Projects
        </a>
        <a
          href="/contact"
          className="text-subtext0 hover:text-text px-4 no-underline transition duration-300 ease-in-out hover:cursor-pointer hover:font-semibold"
        >
          Contact
        </a>
        <a
          href="/awards"
          className="text-subtext0 hover:text-text px-4 no-underline transition duration-300 ease-in-out hover:cursor-pointer hover:font-semibold"
        >
          Awards
        </a>
        <a
          href="/blogs"
          className="text-subtext0 hover:text-text px-4 no-underline transition duration-300 ease-in-out hover:cursor-pointer hover:font-semibold"
        >
          Blogs
        </a>
      </div>
      <div className="float-right flex items-center">
        <div className="text-2xl">
          <a
            href="https://github.com/rrcoder0167"
            className="hover:text-blue px-1 transition duration-300 ease-in-out"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href=""
            className="hover:text-blue px-1 transition duration-300 ease-in-out"
          >
            <FontAwesomeIcon icon={faDiscord} />
          </a>
          <a
            href="https://youtube.com/@ridztechtube"
            className="hover:text-blue px-1 transition duration-300 ease-in-out"
          >
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </div>
      </div>
    </nav>
  );
}
