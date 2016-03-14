#! /bin/bash

scriptDir=$(dirname $0)

mkdir ${scriptDir}/dbData
mkdir ${scriptDir}/dbData/db01

mkdir ${scriptDir}/log

killall mongod
killall mongos

mongod --port 27017 --dbpath ${scriptDir}/dbData/db01 --fork --logpath ${scriptDir}/log/mongod01.log

