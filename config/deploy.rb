# config valid only for Capistrano 3.1
lock '3.1.0'

set :application, 'cachebag'
set :repo_url, 'git@git.learningdata.net:cachebag.git'

set :deploy_to, '/home/azureuser/cachebag'
set :deploy_via, :copy
set :scm, :git
set :use_sudo, false
set :pty, true
set :ssh_options, {:forward_agent => true, keys: [File.join(ENV["HOME"], ".ssh", "id_rsa")]}

set :keep_releases, 3

namespace :deploy do
  desc "Start application"
  task :start do
    on roles(:web) do
      execute "cd #{deploy_to}/current && forever start app.js"
    end
  end

  desc "Stop application"
  task :stop do
    on roles(:web) do
      execute "cd #{deploy_to}/current && forever stop app.js"
    end
  end

  desc 'Restart application'
  task :restart do
    on roles(:web), in: :sequence, wait: 5 do
      execute "cd #{deploy_to}/current && sudo npm install"
      execute "cd #{deploy_to}/current && forever restart app.js"
    end
  end

  desc 'Npm install'
  task :npm_install do
    on roles(:web), in: :sequence do
      execute "cd #{deploy_to}/current && sudo npm install"
    end
  end

  after "deploy", "deploy:npm_install"
end