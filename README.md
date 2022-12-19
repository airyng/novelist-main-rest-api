## Миграции

+ `node_modules/.bin/migrate list` - список доступных миграций;
+ `node_modules/.bin/migrate create add_users` - создание новой миграции;
+ `node_modules/.bin/migrate up add_user` активация ряда миграций вплоть до указанной (включительно);
+ `node_modules/.bin/migrate down delete_names` - деактивация миграций вплоть до указанной;
+ `node_modules/.bin/migrate prune` - деактивация всех миграций;