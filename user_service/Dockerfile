FROM ruby:2.3

RUN apt-get update && \
      apt-get install -y --no-install-recommends mysql-client && \
      rm -fR /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY Gemfile* ./
RUN bundle install --without development test
COPY . .

ENV RAILS_ENV production

ENV RAILS_DB_NAME asset-management
ENV RAILS_DB_USER root
ENV RAILS_DB_PASSWORD root
ENV RAILS_DB_HOST asset-management-db
ENV RAILS_DB_PORT 3306

ENV SECRET_KEY_BASE 21b66d3b4e2c717bf3e5d7522e5738de889c9c83a00b70727c947fd59984207080778abed440c06d69804528dda40a24aca70455d182fe58680bcb8e3a0d2a6b

EXPOSE 3000

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]

