CREATE TABLE `exceptions` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`message` text NOT NULL,
	`stack` text,
	`status` text,
	`path` text,
	`method` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `exceptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
