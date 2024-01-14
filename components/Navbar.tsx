import "./Navbar.css"; // CSS file for Navbar
import { JetBrains_Mono } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faDiscord,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const jetbrains = JetBrains_Mono({ subsets: ["latin"] });

export default function Navbar() {
  return (
    <nav className={`bg-surface0 items-center relative text-center overflow-hidden px-5 py-2.5 hover:bg-surface1 transition-all ease-in-out duration-300 ${jetbrains.className}`}>
      <div className="float-left">
        <div className="flex items-center transition-transform ease-in-out duration-300 justify-center hover:scale-110">
          <div className="user-avatar">
            <img className="w-8 h-8 rounded-full object-cover mr-2" id="avatarImage" alt="Discord avatar" src="https://avatars.githubusercontent.com/u/106852975"/>
          </div>
          <span className="bg-green w-5 border-4 border-surface0 h-5 rounded-full inline-block z-10 relative right-3 top-3" id="discStatus-dot"></span>
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
      <div className="float-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex m-auto px-4">
  <a href="" className="no-underline text-mauve transition ease-in-out duration-300 hover:text-blue hover:font-black hover:cursor-pointer font-bold px-4">
    Home
  </a>
  <a href="" className="no-underline text-subtext0 transition ease-in-out duration-300 hover:text-text hover:font-semibold hover:cursor-pointer px-4">
    Projects
  </a>
  <a href="" className="no-underline text-subtext0 transition ease-in-out duration-300 hover:text-text hover:font-semibold hover:cursor-pointer px-4">
    Contact
  </a>
  <a href="" className="no-underline text-subtext0 transition ease-in-out duration-300 hover:text-text hover:font-semibold hover:cursor-pointer px-4">
    Awards
  </a>
</div>
      <div className="float-right flex items-center">
        <div className="text-2xl">
          <a href="https://github.com/rrcoder0167" className="px-1 hover:text-blue transition ease-in-out duration-300">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="" className="px-1 hover:text-blue transition ease-in-out duration-300">
            <FontAwesomeIcon icon={faDiscord} />
          </a>
          <a href="https://youtube.com/@ridztechtube" className="px-1 hover:text-blue transition ease-in-out duration-300">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </div>
      </div>
    </nav>
  );
}
