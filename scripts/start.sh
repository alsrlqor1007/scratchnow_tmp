#!/bin/bash
cd /home/ubuntu/scratchNow/server

export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE_USER=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USER --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export DEV_DATABASE_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names DEV_DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')
export TEST_DATABASE_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names TEST_DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')
export PROD_DATABASE_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names PROD_DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')
export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start app.js