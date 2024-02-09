FROM node:20-alpine3.18

LABEL maintainer="Vishal Mahajan"

ARG SVELTE_PATH=/opt/svelte
ARG APP_PATH=/app
ARG NPM_PATH=/opt/npm-global
ARG GIT_USER_EMAIL=jhipster-svelte-bot@jhipster.tech
ARG GIT_USERNAME="JHipster Svelte Bot"
ARG GID=1000
ARG UID=1000
ARG GLIBC_VERSION=2.34-r0

ENV	MAVEN_OPTS: -Dhttp.keepAlive=false -Dmaven.wagon.http.pool=false -Dmaven.wagon.httpconnectionManager.ttlSeconds=120

RUN apk update \
	&& apk --no-cache --update add \
		git \
		openjdk21-jdk \
		ca-certificates \
		wget \
		bash

RUN wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub \
	&& wget -q https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-${GLIBC_VERSION}.apk \
	&& wget -q https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-bin-${GLIBC_VERSION}.apk \
	&& wget -q https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-i18n-${GLIBC_VERSION}.apk \
	&& apk add --no-cache --force-overwrite glibc-${GLIBC_VERSION}.apk glibc-bin-${GLIBC_VERSION}.apk glibc-i18n-${GLIBC_VERSION}.apk \
	&& /usr/glibc-compat/bin/localedef -i en_US -f UTF-8 en_US.UTF-8 \
	&& rm -rf glibc-${GLIBC_VERSION}.apk glibc-bin-${GLIBC_VERSION}.apk glibc-i18n-${GLIBC_VERSION}.apk \
	&& apk del wget \
  	&& sed -i -e "s/bin\/ash/bin\/sh/" /etc/passwd

RUN \
	echo ${GID} \
	&& echo ${UID}

RUN \
	deluser --remove-home node \
	&& (addgroup -S jsvelte -g ${GID} || addgroup -S jsvelte ) \
  	&& (adduser -S -G jsvelte -u ${UID} jsvelte || adduser -S -G jsvelte jsvelte)

RUN \
	mkdir -p $APP_PATH \
	&& mkdir -p $SVELTE_PATH \
	&& mkdir -p $NPM_PATH \
	&& chown -R jsvelte:jsvelte $APP_PATH \
	&& chown -R jsvelte:jsvelte $SVELTE_PATH \
	&& chown -R jsvelte:jsvelte $NPM_PATH

USER jsvelte

RUN \
	npm config set prefix "$NPM_PATH" \
	&& echo PATH="$NPM_PATH/bin:$PATH" >> "$HOME/.profile" \
	&& . "$HOME/.profile"

COPY --chown=jsvelte:jsvelte package.json package-lock.json $SVELTE_PATH/

WORKDIR $SVELTE_PATH

RUN	npm ci --quiet

COPY --chown=jsvelte:jsvelte cli $SVELTE_PATH/cli

COPY --chown=jsvelte:jsvelte generators $SVELTE_PATH/generators

RUN npm link

COPY --chown=jsvelte:jsvelte docker/entrypoint.sh /usr/local/bin/

WORKDIR $APP_PATH

RUN \
	git config --global user.email "$GIT_USER_EMAIL" \
  	&& git config --global user.name "$GIT_USERNAME"

ENV PATH "$NPM_PATH/bin:$PATH"

VOLUME ["$APP_PATH"]

EXPOSE 9000 8080

ENTRYPOINT ["entrypoint.sh"]
