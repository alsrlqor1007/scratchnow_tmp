#!/bin/bash
cd /home/ubuntu/scratchNow/server
authbind --deep pm2 start app.js
