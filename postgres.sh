#!/usr/bin/env sh

dropdb   ci_test
dropuser postgres
createuser postgres --superuser
psql -c 'create database ci_test;' -U postgres
