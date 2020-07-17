import Twitter from 'twitter-lite';
import { TWITTER_KEYS } from './constants';

const client = new Twitter({
  ...TWITTER_KEYS
});

const seen = new Set<string>();

async function main() {
  const stream = client.stream('statuses/filter', {
    follow: '18896800'
  });

  stream.on('data', tweet => {
    if (!('text' in tweet) || !('id_str' in tweet))
      return; // Probably a delete update

    if (seen.has(tweet.id_str))
      return; // Tweet already computed

    seen.add(tweet.id_str);

    if (tweet.text.startsWith('@'))
      return; // This is a reply

    client.post('statuses/update', {
      status: 'BRAVO LOLO !! ' + ('https://twitter.com/auvergnerhalpes/status/' + tweet.id_str)
    });
  });

  console.log('Listening twitter stream.');
}


main().catch(e => {
  console.log('Error', e);
});

process.on('unhandledRejection', error => console.error("Unhandled rejection: ", error));
