---
title: "Why I Chose Not to Use Neovim"
date: "2024-11-10"
excerpt: "A personal reflection on my decision to stick with VSCode and Zed over Neovim."
tags: ["Neovim", "Text Editors", "Personal Reflection"]
---

## Introduction

Last year, I really tried to get into the entire ricing and customize my mac setup and code editor. Everyone talks about how powerful and lightweight it is, how customizable it is, and how once you learn vim keybinds you’ll be editing at the speed of thought. To be honest, I was growing sick of VSCode's aging UI and I really wanted a half-decent setup that didn't look horrible. I started using skhd and sketchybar to customize my macOS experience, and I thought, “Why not give Neovim a shot?” After all, it’s supposed to be the ultimate coding experience, right?

![macOS Setup](/blogs/why-i-chose-not-to-use-neovim/macos-setup.png)
*My riced macOS setup with yabai, skhd, and sketchybar.*

## The Learning Curve

I spent at least a week trying to set it up, learning the keybinds, and tweaking my configuration. I watched a bunch videos, read blog posts, and really tried to actually get into it. But honestly, it just didn't work for me.

The keybinds were the biggest wall for me. It’s not that I’m against them — they’re really useful, and I get the appeal — but they didn’t click fast enough for me to justify the learning curve. Every time I sat down to code, I’d find myself thinking more about “how” to do things than actually doing them. Yes, you can learn them incrementally, but during that phase, my workflow felt slower than just using a normal editor.

## Editing Speed and Performance

I also kept hearing that Neovim is *blazingly* fast. But in practice? It didn’t really feel meaningfully faster than modern editors. Zed, for example, is built in Rust, loads full projects instantly, and uses just `~100-150MB` of RAM even with a big Next.js codebase open. That’s already faster than VS Code for me, and I didn’t need to write 200 lines of Lua just to make it feel usable.

Also, and this is kind of the main thing — I prefer having a GUI. Zed gives me a great editing experience *and* still feels keyboard-first when I need it to be. I get a good file tree, tab support, smooth command palette, and none of it gets in my way. I don’t have to memorize cryptic commands to do basic things, and I can still move fast without customizing every piece of the editor.

## Conclusion

So yeah, Neovim’s cool, but it’s just not for me. This is the same reason I switched away from using a riced macOS setup to the default stuff with helpful mac apps, so that I don't lose functionality for aesthetics. I don’t feel like I’m missing out on speed or power by sticking with something like Zed. It works out of the box, looks clean, and doesn’t fight me while I’m trying to get stuff done.

![Zed Setup](/blogs/why-i-chose-not-to-use-neovim/zed.png)

Maybe someday I’ll get back into it. But for now, I’d rather spend my time coding — not configuring my editor for the hundredth time. You can check out my current setup and previous customizations at [riddhimanrana/dotfiles](https://github.com/riddhimanrana/dotfiles) if you’re curious.
