FROM ruby:2.3.0
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /rails_angular_resume
WORKDIR /rails_angular_resume
ADD Gemfile /rails_angular_resume/Gemfile
ADD Gemfile.lock /rails_angular_resume/Gemfile.lock
RUN bundle install
ADD . /rails_angular_resume
