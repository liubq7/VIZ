# CKB Transactions Visualization

Visualize the transaction receiving situation of each node in p2p network and the propagation of a certain transaction for tracking Nervos CKB network status. Data from running nodes collected by agents are stored in PostgreSQL database, and displayed through a React interface.

Demo: https://liubq7.github.io/VIZ/

## Getting Started
### Prerequisites
* Node
* PostgreSQL

### Installing
```bash
git clone git@github.com:liubq7/VIZ.git
cd VIZ
```

* server-side:
```bash
cd server
npm i
npm start
```

* client-side:
```bash
cd ../client
npm i
npm start
```