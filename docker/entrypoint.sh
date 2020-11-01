#!/bin/sh

npm link generator-jhipster-svelte

exec jhipster --blueprints svelte "$@"