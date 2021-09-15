# Tennis Trivia - Next.js Netlify

This repo is accompanied by an article on how it was built. There is a `start` branch for you if you want to follow along.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/brenelz/tennis-trivia)

The only other setup required for netlify is adding the following environment variable.

```
NEXT_PUBLIC_API_URL=https://your-netlify-url.app
```

## What we built

- shows one player name randomly, and the user must pick their country
- 5 rounds, keep track of score
- grabs top 100 tennis players with country
- have users login with supabase
- store highscores in supabase

## Future improvements

- choose difficulty (would change the rank of players selected)
- challenge other users
