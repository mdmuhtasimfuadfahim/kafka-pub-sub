<h1 id="title" align="center">kafka-pub-sub 👋</h1>

```kafka-pub-sub``` is designed based on [KafkaJS](https://www.npmjs.com/package/kafkajs) with the support of stream processing that enables applications to publish, consume and process high volumes of record streams in a fast and durable way.

### 🔖 Table Of Contents

- [Title](#title)
- [Prerequisites](#prerequisites)
- [Installing](#installing)
- [Example](#example)
- [How To Contribute](#how-to-contribute)
- [Author](#author)
- [License](#license)

---

<h2 id="prerequisites">Prerequisites</h2>

- NPM/Yarn LTS
- NodeJs

[Back To The Top](#title)

---

<h2 id="installing">Installing</h2>

#### 💻 Desktop

If you use Linux, try run commands bellow as `sudo`

```sh
npm i kafka-pub-sub
```
or
```sh
yarn add kafka-pub-sub
```

[Back To The Top](#title)

---

<h2 id="example">Example</h2>


#### Project stucture

<img width="254" alt="project-structure" src="https://github.com/mdmuhtasimfuadfahim/my-packages/assets/69357704/9e0ed7e0-c7b3-45e6-bcda-f68c5a6d5933">

> Note: Create NodeJS environment in both service-1 and service-2 and create server using your favourite NodeJS framewwork.

#### service-1/server.js

```sh
const ProduceEvent = require('@kafka-zookeeper/produce-consume/ProduceEvent');

app.post('/api', async (req, res) => {
    const fakeData = {
        Name: "Md. Muhtasim Fuad Fahim",
        Email: "mdmuhtasim.fahim@gmail.com",
    };
    const producedEvent = await ProduceEvent('TEST_TOPIC', 'TEST_EVENT', fakeData)
    console.log(producedEvent)

    return res.status(200).send("Done!");
});
```

#### service-2/server.js

```sh
const ConsumeEvent = require('@kafka-zookeeper/produce-consume/ConsumeEvent');

(async function consumedEvent() {
    const consumedData = await ConsumeEvent('TEST_TOPIC')
    console.log(consumedData);
})();
```

#### service-1/.env ** service-2/.env

```sh
KAFKA_CLIENT_ID=test-client
KAFKA_BROKER_URL=localhost:9092
KAFKA_GROUP_ID=test-group
```

#### sample ```docker-compose.yml```

```sh
version: '2.1'
services:
  zookeeper:
    hostname: zookeeper
    container_name: zookeeper
    image: confluentinc/cp-zookeeper:latest
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
  kafka:
    hostname: kafka
    container_name: kafka
    image: confluentinc/cp-kafka:latest
    depends_on:
      - zookeeper
    ports:
      - 9092:9092
    environment:
      KAFKA_BROKER_URL_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_AUTO_CREATE_TOPICS_ENABLE: 'true'
      KAFKAJS_NO_PARTITIONER_WARNING: 1
      KAFKA_NUM_PARTITIONS: '6'
```

<p align="center">Now run the both services in your machine and hit the API. 🔥 </p>

[Back To The Top](#title)

---

<h2 id="how-to-contribute">💡 How To Contribute</h2>

- Fort it 😎
- Create a feature branch: `git checkout -b my-feature`
- Add your changes: `git add .`
- Commit your changes: `git commit -m 'My new feature'`
- Push to the branch: `git push origin my-feature`
- Submit a pull request 

<p align="center">
<i>Contributions, issues and features requests are welcome!</i><br />
<i>📮 Submit PRs to help solve issues or add features</i><br />
<i>🐛 Find and report issues</i><br />
<i>🌟 Star the project</i><br />
</p>

[Back To The Top](#title)

---

<h2 id="author">👤 Author</h2>

🤓 **Md. Muhtasim Fuad Fahim <mdmuhtasim.fahim@gmail.com>**

- Github: [@mdmuhtasimfuadfahim](https://github.com/mdmuhtasimfuadfahim)
- LinkedIn: [@mdmuhtasimfuadfahim](https://www.linkedin.com/in/mdmuhtasimfuadfahim)

[Back To The Top](#title)

---


<h2 id="license">🔏 License</h2>

Copyright © 2023 [Md. Muhtasim Fuad Fahim](https://github.com/mdmuhtasimfuadfahim)

This project is licensed by [MIT License](https://api.github.com/licenses/mit).

[Back To The Top](#title)

---
