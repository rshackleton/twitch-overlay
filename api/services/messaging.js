import request from 'request-promise-native';

import db from './db';
import logger from './logger';

const topicName = 'donations';

async function storeToken(token) {
  try {
    return await db
      .collection('messaging-tokens')
      .add({ token })
      .then(ref => ref.get())
      .then(doc => doc.data());
  } catch (error) {
    logger.error(error);
  }
}

function subscribe(token) {
  const authKey = process.env.FIREBASE__MESSAGING_SERVERKEY;
  const url = `https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topicName}`;

  const config = {
    url,
    headers: {
      Authorization: `key=${authKey}`,
      'Content-Type': 'application/json',
    },
  };

  return request
    .post(config)
    .then(res => {
      return true;
    })
    .catch(err => {
      logger.error(err);
      return false;
    });
}

function send(donation) {
  const authKey = process.env.FIREBASE__MESSAGING_SERVERKEY;
  const url = 'https://fcm.googleapis.com/fcm/send';

  const data = {
    to: `/topics/${topicName}`,
    priority: 'high',
    data: donation,
  };

  const config = {
    url,
    headers: {
      Authorization: `key=${authKey}`,
      'Content-Type': 'application/json',
    },
    json: data,
  };

  return request
    .post(config)
    .then(res => {
      logger.debug(res);
      return true;
    })
    .catch(err => {
      logger.error(err);
      return false;
    });
}

module.exports = {
  send,
  storeToken,
  subscribe,
};
