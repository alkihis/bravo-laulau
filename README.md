# bravo-laulau

> Récompenser les tweets de la Région Auvergne-Rhône-Alpes (AuRA) mettant en valeur Laurent Wauquiez.

> Reward Auvergne-Rhône-Alpes (AuRA) region tweets starring Laurent Wauquiez

## Getting started

Clone repo and install packages using `git` and `npm`.

```bash
git clone https://github.com/alkihis/bravo-laulau.git
cd bravo-laulau
npm i
```

**Set your constants in file `constants.ts`.** 

This file requires **4** constants in order to link 
1) Used Twitter application
2) Used Twitter account with the followed application

Copy **`src/constants.sample.ts`** to **`src/constants.ts`**.
Set your keys into the file. Consumer key/secret are application keys, access token are client keys.

```bash
cp src/constants.sample.ts src/constants.ts
vim src/constants.ts  # Set your keys...
```

File should be like this :
```ts
export const TWITTER_KEYS = {
  consumer_key: 'consumer-key',
  consumer_secret: 'consumer-secret',
  access_token_key: 'access-token-for-app',
  access_token_secret: 'access-secret-for-app',
};
```

Finally, compile the project with **TypeScript** compiler.
```bash
tsc
```

## Run the bot

Start `build/index.js`.

```bash
node build/index.js
```

