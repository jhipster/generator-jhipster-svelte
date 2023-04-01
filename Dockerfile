FROM node:16-alpine3.17

LABEL maintainer="Vishal Mahajan"

ARG SVELTE_PATH=/opt/svelte
ARG APP_PATH=/app
ARG NPM_PATH=/opt/npm-global
ARG GIT_USER_EMAIL=jhipster-svelte-bot@jhipster.tech
ARG GIT_USERNAME="JHipster Svelte Bot"
ARG GID=1000
ARG UID=1000
ARG GLIBC_VERSION=2.35-r0

ENV	MAVEN_OPTS: -Dhttp.keepAlive=false -Dmaven.wagon.http.pool=false -Dmaven.wagon.httpconnectionManager.ttlSeconds=120

RUN apk update \
	&& apk --no-cache --update add \
		git \
		openjdk11 \
		ca-certificates \
		wget \
		bash

RUN wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub \
	&& wget -q https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-${GLIBC_VERSION}.apk \
	&& wget -q https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-bin-${GLIBC_VERSION}.apk \
	&& wget -q https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-i18n-${GLIBC_VERSION}.apk \
	&& apk add glibc-${GLIBC_VERSION}.apk glibc-bin-${GLIBC_VERSION}.apk glibc-i18n-${GLIBC_VERSION}.apk \
	&& /usr/glibc-compat/bin/localedef -i en_US -f UTF-8 en_US.UTF-8 \
	&& rm -rf glibc-${GLIBC_VERSION}.apk glibc-bin-${GLIBC_VERSION}.apk glibc-i18n-${GLIBC_VERSION}.apk \
	&& apk del wget \
  	&& sed -i -e "s/bin\/ash/bin\/sh/" /etc/passwd

RUN \
	echo ${GID} \
	&& echo ${UID}

RUN \
	deluser --remove-home node \
	&& addgroup -S shipster -g ${GID} \
  	&& adduser -S -G shipster -u ${UID} shipster

RUN \
	mkdir -p $APP_PATH \
	&& mkdir -p $SVELTE_PATH \
	&& mkdir -p $NPM_PATH \
	&& chown -R shipster:shipster $APP_PATH \
	&& chown -R shipster:shipster $SVELTE_PATH \
	&& chown -R shipster:shipster $NPM_PATH

USER shipster

RUN \
	npm config set prefix "$NPM_PATH" \
	&& echo PATH="$NPM_PATH/bin:$PATH" >> "$HOME/.profile" \
	&& . "$HOME/.profile"

COPY package.json package-lock.json $SVELTE_PATH/

WORKDIR $SVELTE_PATH

RUN	npm ci --quiet

COPY cli $SVELTE_PATH/cli
RUN npm link

COPY generators $SVELTE_PATH/generators

COPY docker/entrypoint.sh /usr/local/bin/

WORKDIR $APP_PATH

RUN \
	git config --global user.email "$GIT_USER_EMAIL" \
  	&& git config --global user.name "$GIT_USERNAME"

ENV PATH "$NPM_PATH/bin:$PATH"

VOLUME ["$APP_PATH"]

EXPOSE 9000 8080

ENTRYPOINT ["entrypoint.sh"]
