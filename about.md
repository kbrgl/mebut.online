---
layout: /page.pug
title: About
---

# About

There’s no real resource out there for people building their personal websites. Sure, if you Google "best personal websites", you get hundreds of articles along the lines ”15 of the best personal websites to blow your mind.”

I don’t know about you, but in my opinion, the point of a good personal website shouldn’t be to blow anyone’s mind. It should be to showcase you. And [scrolljacking](https://daringfireball.net/linked/2019/10/28/airpods-pro-scrolljacking-hell), screenfuls of massive-sized text, and opulent animations undermine this simple mission. The more minds you’re blowing, the fewer there remain to read your spiel.

Me, But Online is dedicated to personal websites that get the job done and do it elegantly:

1. They don’t have opulent animations. Instead, they use animations strategically, to highlight content and guide the user.
2. They have great typography.^[A certain style of website is in vogue among designers right now—just 2 or 3 paragraphs of massive text in a fancy typeface. Go to Typewolf and you’re sure to find plenty of examples. This isn’t good typography, these websites are just annoying to read. You’ll never find one of them on here.]
3. They use HTTPS.^[I make exceptions in case the website is exceptional, but by and large every website here uses HTTPS.]

## Prior art

Me, But Online builds on several other collections. [Minimal Gallery](https://minimal.gallery) and [hoverstat.es](https://www.hoverstat.es/) come closest, but there are also [One Page Love](https://onepagelove.com) and [Typewolf](https://typewolf.com).

## If you’re featured...

Thanks for your contribution to the indie web! If you want me to remove your website for any reason whatsoever, write me an email at kabirgoel.kg@gmail.com or [DM me on Twitter](https://twitter.com/KabirGoel).

## How the sausage is made

Me, But Online is [open source on GitHub](https://github.com/kbrgl/mebut.online).

The website is statically generated with Eleventy and hosted on Vercel. Zero JavaScript is sent over the wire. Notably, unlike most Eleventy blogs, Me, But Online uses [Airtable as a backend](https://github.com/kbrgl/mebut.online/tree/master/_data/sites.js). When I want to add a new website, I just use the Airtable web clipper extension, which automatically takes a screenshot and fills out most of the fields.

I use [Buttondown](https://buttondown.email) for the newsletter.
