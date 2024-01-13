"use client";
import { TypeAnimation } from "react-type-animation";
import "./page.css";

export default function Home() {
  return (
    <>
      <header>
        <div className="profile-container">
          <div className="profile">
            <img
              src="https://avatars.githubusercontent.com/u/106852975"
              alt="Riddhiman Rana"
              className="profile-image"
            />
          </div>
          <div className="profile-details">
            <h1 className="text-4xl font-medium">Riddhiman Rana</h1>
            <span className="profile-title">
              <TypeAnimation
                sequence={[
                  "Full Stack Developer",
                  1500,
                  "Competitive Programmer",
                  1500,
                  "Hackathon Enthusiast",
                  1500,
                  "Python Master",
                  1500,
                  "NextJS Web Dev",
                  1500,
                  "Arduino Expert",
                  1500,
                ]}
                speed={6}
                deletionSpeed={40}
                cursor={false}
                className="cursor"
                repeat={Infinity}
              />
            </span>
          </div>
        </div>
      </header>

      <section
        className="bg-surface0 opacity-1 translate-y-20 p-5 mx-auto w-5/6 rounded-lg shadow-2xl shadow-surface2"
        id="about"
      >
        <h2 className="text-3xl font-medium">Hi!</h2>
        <p>
          I&apos;m Riddhiman Rana, a 13 year-old middle schooler with a life
          passion for technology. When I was 7, after a long exhausting business
          trip to London, my dad brought me home a book called &quot;Coding for
          Beginners: Using Python&quot;. Within minutes, I was fascinated by the
          amazing world of programming, and the day I started coding, I knew
          this was my life&apos;s mission, to one day become a tech entrepreneur
          and start my own company. Since then, I have learned a lot, and have
          skills in broad categories, from Arduino, to Competitive Programming,
          to Hackathons, and more. One day, I do believe my dream will come
          true, and until then, happy coding :)
        </p>
      </section>

      <section
        className="bg-surface0 opacity-1 translate-y-20 p-5 mx-auto my-3 w-5/6 rounded-lg shadow-2xl shadow-surface2"
        id="contact"
      >
        <h2 className="text-3xl font-medium">Contact Me</h2>
      </section>
    </>
  );
}
