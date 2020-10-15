const Kafka = require('kafka-node');
const kafkaConfig = require('./config');

const { Producer } = Kafka;
const client = new Kafka.KafkaClient({ kafkaHost: kafkaConfig.KafkaHost });
const producer = new Producer(client, { requireAcks: 0, partitionerType: 2 });

// module kafkaProducer {
const PushDataToKafka = (dataToPush: any) => {
  console.log(dataToPush);
  try {
    const payloadToKafkaTopic = [
      {
        topic: kafkaConfig.KafkaTopic,
        messages: JSON.stringify(dataToPush),
      },
    ];
    console.log(payloadToKafkaTopic);
    producer.send(payloadToKafkaTopic, (err: any, data: any) => {
      console.log('data: ', data);
    });
    producer.on('error', function (err: any) {
      console.log('kafka-error:', err);
    });
    // producer.on('ready', async function () {
    // });
  } catch (error) {
    console.log(error);
  }
};
// }
export default PushDataToKafka;
