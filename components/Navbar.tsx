import "./Navbar.css" // CSS file for Navbar
import { JetBrains_Mono } from 'next/font/google'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube, faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons'

const jetbrains = JetBrains_Mono({ subsets: ['latin'] })

export default function Navbar() {
    return (
    <nav className={jetbrains.className}>
        <div className="nav-left">
            <div className="discStatus">
                <div className="user-avatar">
                    <img className="discAvatar" id="avatarImage" alt="Discord avatar" />
                </div>
                <span className="discStatus-dot" id="discStatus-dot"></span>
            </div>
            <div id="discModal" className="discModal">
                <div className="discModal-content">
                    <span className="close">&times;</span>
                    <div className="discordCard" id="discordCard">
                        <img className="discModal-avatar" id="avatarImage-big" alt="Discord avatar" />
                        <h1 id="username"></h1>
                        <hr />
                        <span id="userInfo"></span>
                    </div>
                </div>
            </div>
        </div>
        <div className="nav-center">
            <a href="" className="nav-active">Home</a>
            <a href="projects.html" className="nav-link">Projects</a>
            <a href="contact.html" className="nav-link">Contact</a>
            <a href="awards.html" className="nav-link">Awards</a>
    </div>
    <div className="nav-right">
        <div className="icons">
            <a href="https://github.com/rrcoder0167">
                <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="">
            <FontAwesomeIcon icon={faDiscord} />
            </a>
            <a href="https://youtube.com/@ridztechtube">
                <FontAwesomeIcon icon={faYoutube} />
            </a>
            </div>
        </div>
    </nav>
    )
}