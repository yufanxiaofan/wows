#! /bin/bash
env=development
export LC_ALL=C

scriptDir=$(dirname $0)

cd ${scriptDir}/

# kill all node servers
killall node

git pull https://koweni:2161256wen@github.com/koweni/wow.git develop

cd Client
sudo npm install
sudo npm update

cd ..
cd Server 
sudo npm install
sudo npm update

cd ..

# start mongodb
#sh DB/startMongodb.sh

#sleep 1

#sh DB/initMongodb.sh

#restart redis server
#killall redis-server
#sleep 3
#redis-server redis.conf

#restart haproxy server
#killall haproxy
#haproxy -f LoadBalancer/haproxy.cfg

#sleep 3

# start all node servers
NODE_ENV=${env} forever start Client/app.js
#NODE_ENV=${env} PORT=9000 forever start Server/app.js
#NODE_ENV=${env} PORT=9001 forever start Server/app.js
#NODE_ENV=${env} PORT=9002 forever start Server/app.js

#NODE_ENV=${env} PORT=8080 forever start Statistics/app.js
#NODE_ENV=${env} forever -o Client/public/schedule.log start Server/scheduleServer.js