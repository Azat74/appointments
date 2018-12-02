FROM ruby:2.5.1

RUN apt-get update && \
    apt-get install -qq -y build-essential libpq-dev --fix-missing
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash && \
    apt-get install -y nodejs

WORKDIR /app

RUN npm install yarn -g
COPY Gemfile Gemfile.lock /app/
RUN bundle install
RUN gem install foreman

COPY . /app/
RUN yarn install
