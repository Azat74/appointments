FROM ruby:2.5.1

RUN apt-get update && \
    apt-get install -qq -y build-essential libpq-dev --fix-missing

WORKDIR /app

COPY Gemfile Gemfile.lock /app/
RUN bundle install
RUN gem install foreman

COPY . /app/
