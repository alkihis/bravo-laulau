import Twitter from 'twitter-lite';
import { Status, FullUser } from 'twitter-d';
import { TWITTER_KEYS } from './constants';

const client = new Twitter({
  ...TWITTER_KEYS
});

const seen = new Set<string>();
const startup_time = Date.now();

const stream = client.stream('statuses/filter', {
  follow: '18896800'
});

stream.on('data', (tweet: Status & { text: string }) => {
  if (!('text' in tweet) || !('id_str' in tweet))
    return; // Probably a delete update

  if (seen.has(tweet.id_str))
    return; // Tweet already computed

  const date = new Date(tweet.created_at).getTime();

  if (date < startup_time)
    return; // Tweet sent before bot is woken up

  // Add tweet in seen set
  seen.add(tweet.id_str);

  if (tweet.text.startsWith('@'))
    return; // This is a reply

  const screen_name = (<FullUser>tweet.user)?.screen_name ?? 'auvergnerhalpes';

  client
    .post('statuses/update', {
      status: 'BRAVO LAULAU !! https://twitter.com/' + screen_name  + '/status/' + tweet.id_str
    })
    .then(() => console.log('Status', tweet.id_str, 'credited.'))
    .catch(e => console.error('Unable to post tweet.', e));
});

console.log('Listening twitter stream.');

process.on('unhandledRejection', error => console.error("Unhandled rejection: ", error));
