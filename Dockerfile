FROM node:20

WORKDIR /frontend
COPY . .

RUN yarn install
RUN yarn build
RUN yarn global add serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]