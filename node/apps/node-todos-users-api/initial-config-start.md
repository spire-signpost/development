### Initial app config

A quick start guide to app setup with optional extras for Git, mLab, and Heroku.

#### Getting started

Use the following steps to initially get the app up and running.

  * install required modules and dependencies for the app,

```bash
npm install
```

  * start MongoDB daemon

```bash
mongod
```

  * test app by starting local server,

```bash
npm start
```

#### Optional extras

  * add Git repository

```bash
git init
```

  * add Heroku project for local app (assumes Heroku CLI toolbelt is installed)

```bash
heroku create
```

  * optionally rename this app...

```bash
heroku apps:rename new_name --app current_name
```

  * set env variable for remote mLab DB usage (if required)

```bash
heroku config:set MONGODB_URI=mongodb://<dbuser>:<dbpassword>@ds328353.mlab.com:27773/<dbname>
```

*n.b.* the specified URI will need to match mLab URI for required DB

  * check local git status

```bash
git status
```

  * add app files to local git repo

```bash
git add .
```

  * commit initial app files to repo

```bash
git commit -m "add initial app"
```

  * push git repo to remote Heroku hosting

```bash
git push heroku
```

*n.b.* for the first push Heroku may require the following command,

```bash
git push --set-upstream heroku master
```

  * then check live app on Heroku,

```bash
heroku open
```

The app should now be running on Heroku.
