---
title: "Dicy got bigger. Then I had to keep it working."
date: "2026-10-05"
excerpt: "Building a grade app for 3,000+ users, dealing with school portals, and making Dicy Wrapped out of a year of assignments."
tags: ["Dicy", "Building", "Dicy Wrapped", "Student tools"]
---

The number I put on my portfolio is 3,000+ Dicy users. The number I spend more time thinking about is the one a student sees when they open a class.

If that grade is wrong, the rest of the app doesn't really matter. I can spend a weekend improving an animation, but someone checking whether they still have an A needs the answer to be right.

I built [Dicy](https://dicy.app) because I wanted a better way to use Infinite Campus and Schoology. I wanted to see my grades clearly and work out what would happen if I scored a certain amount on an assignment or final. Eventually that became an app across iOS, Android, and web, with assignment tools and more of the things students wanted to check during the day.

Getting people to use it changed the work pretty quickly.

## My account was a very small test

Reverse engineering a school portal starts with figuring out what happens when you log in and open a class. I could follow the requests, work out the responses, and build a nicer interface around the information.

Then another district would do something differently.

One login flow redirects differently. A session expires. A course has the same name as another course but belongs to a different section. A student has an empty schedule, or the request for their schedule has failed. Those last two cases can look the same if the app handles them carelessly.

I've spent time comparing actual browser traffic with what Dicy was sending, tracing login failures, and separating schedule loading from grade loading. A schedule refresh shouldn't wipe out grades that were already there. A failed request shouldn't become an empty screen that makes it look as though the student has no classes.

There are failures I don't control, too. In May, I got an alert about a short Infinite Campus outage affecting one user's requests while other users could still load their grades. That's an awkward thing to explain from the app's side. The student opened Dicy, so Dicy is where they see the error.

It pushed me to work on better diagnostics and ways to report a problem. I need enough information to figure out what happened without asking someone to send me their password or a pile of private account data. A vague "it doesn't work" leaves both of us stuck.

Some of this work is still ongoing. Supporting another school's login flow takes more than getting it to pass a local test. It has to work against the portal the student actually uses.

## Shipping on phones was another project

The App Store approval email arrived on April 24. Google Play production access came on June 7. Those were concrete milestones I could finally point to after working through the submission process.

Maintaining all the platforms kept going afterward. A grade calculation needs to mean the same thing on web and mobile, even if the screens are different. Fixing something on one platform doesn't automatically fix the other.

As the code grew, I also had to clean it up without changing behavior students already relied on. I became much more particular about comparing changes against the existing version. Moving code around is only useful if someone opening Dicy afterward still gets the right answer.

There are surprisingly small details that make a difference. Remembering which class someone hid or moved sounds easy until two classes have the same name. Then a preference saved against the name can affect the wrong class. A section needs its own identity, and that decision has to carry through the app and its widgets.

That's a lot of work for something a student should never have to notice. Which is sort of the point.

## I wanted Wrapped to feel like your school year

Dicy Wrapped gave me a different kind of problem to work on. A grade page answers what your grade is now. Wrapped looks back at the assignments and changes that got you there.

I liked the idea of giving students something they could actually enjoy opening at the end of the year. Their busiest stretch. Their strongest classes. The assignment that moved a grade the most. A recap that felt connected to what they'd just spent months doing.

The mobile recap became a sequence of animated slides with grade lines, assignment totals, and highlights you could share. I spent time on the opening and transitions because pacing matters when someone is going through a story about their own year.

But the data work was still there underneath it.

A percentage on one assignment doesn't tell you how much it mattered to the course grade. The recap's clutch moments needed to take the actual grade change into account. Missing grades and assignments without a usable course record needed care too. A dramatic-looking slide built from bad data would be worse than leaving the slide out.

Infinite Campus and Schoology also don't hand over identical histories. The recap has to work with the records available for that student. A semester recap shouldn't pretend it has a complete year's worth of data.

The Dicy habits slide uses activity stored on the device, such as which class you opened most. It only appears when there's enough local activity to say something useful. Those counts stay on the phone. I don't want a slide inventing a habit just to fill another screen.

Shipping Wrapped also meant building the path to it: the release configuration, the entry point in the app, and the web prompt that helped people find the mobile recap. June's release work covered a lot more than the slides themselves.

I still really like this part of Dicy. There's room for personality in a grade app, especially after a long school year. The numbers still need to be right.

## What growing it has actually meant

The work keeps moving between things I want to add and things people need me to fix. I'll be thinking about a new screen, then end up tracing a portal request or looking at a report from a device I don't own.

That has changed what I consider a good update. I still care a lot about how Dicy looks. I also care about whether a student can get back into their account, whether a refresh preserves useful information, and whether the app explains a failure well enough for us to resolve it.

3,000+ people is a number I'm happy to have reached. It also means my own account will never be enough to test the app.

If you use Dicy and have sent a report, suggested something, or tried an update while I worked through a bug, thank you. A lot of the less visible improvements started there. I'm still building, and I want the next version to be something you can trust when you check it before class.
