FROM ruby:2.3

RUN apt-get update && \
      apt-get install -y --no-install-recommends mysql-client && \
      rm -fR /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY Gemfile* ./
RUN bundle install
COPY . .

ENV RAILS_ENV production

ENV DATABASE_HOST asset-management-db
ENV DATABASE_USERNAME root
ENV DATABASE_PASSWORD root
ENV DATABASE_DATABASE asset-management

ENV SECRET_KEY_BASE 21b66d3b4e2c717bf3e5d7522e5738de889c9c83a00b70727c947fd59984207080778abed440c06d69804528dda40a24aca70455d182fe58680bcb8e3a0d2a6b

EXPOSE 3000

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]

