const utils = require('./utils');
const config = require('../config').oss;
const OSS = require('../..');

const store = OSS(config);

store.listBuckets().then(r => {
  const bucketList = [];
  r.buckets.forEach(i => {
    if (i.name.indexOf('ali-oss') === 0) {
      bucketList.push({
        bucket: i.name,
        region: i.region
      });
    }
  });

  for (const bucketListItem of bucketList) {
    const client = new OSS({
      ...store.options,
      bucket: bucketListItem.bucket,
      region: bucketListItem.region
    });
    utils.cleanBucket(client, bucketListItem.bucket).catch(e => {
      console.log('bucket name =======>', bucketListItem.bucket);
      console.log('error:====>', e);
    });
  }
});
