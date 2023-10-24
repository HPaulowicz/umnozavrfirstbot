## Readme

This app initially have been generated from ptkdev-boilerplate/node-telegram-bot-boilerplate, as it is my first telegram bot and I wasnt familiar with good practices.

After all, it is done as an Express app, and connection to telegram is handled via telefraf module.
I would like to spend some more time with it and create a bot I have an idea for. Then I'll have more time to explore the best practices.

Commands available:
/start - replies with a button which opens a web page with the user first name.
/adminhello [telegram id] [message] - sends a message to telegram id and available to registered admins only.
/adminadd [telegram id] - adds [telegram id] to admins table with permissions to do /adminhello.

Database:
Postgres 15 hosted on Heroku.
Connection and migrations are handled via typeorm.
Migrations are running on app start automatically.

Translations:
A simple i18n function is used to translate strings depending on the user language_code. Created ru and en only.

Deployment:
Automatic deployment to Heroku is set up from master branch.
