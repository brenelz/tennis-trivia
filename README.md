# Tennis Trivia - Next.js Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/brenelz/tennis-trivia)

The only other setup required for netlify is adding the following environment variable.

```
NEXT_PUBLIC_API_URL=https://your-netlify-url.app
```

## What we built

- shows one player name randomly, and the user must pick their country
- 5 rounds, keep track of score
- grabs top 100 tennis players with country

## Future improvements

- have users login with supabase
- store highscores in supabase
- choose difficulty (would change the rank of players selected)
- challenge other users
