#!/usr/bin/env bash
ng build --prod --aot --build-optimizer
docker build -t w4tracking/w4tracking-ui .
docker build -t w4tracking/w4tracking-ui-openshift -f Dockerfile.deploy .
docker tag w4tracking/w4tracking-ui w4tracking/w4tracking-ui:$(git rev-parse --short HEAD);
docker tag w4tracking/w4tracking-ui-openshift w4tracking/w4tracking-ui-openshift:$(git rev-parse --short HEAD);
docker push w4tracking/w4tracking-ui
docker push w4tracking/w4tracking-ui-openshift
