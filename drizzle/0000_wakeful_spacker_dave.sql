CREATE TABLE `game_accounts` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`game_id` varchar(36) NOT NULL,
	`title` varchar(255) NOT NULL,
	`price` decimal(10,2) NOT NULL,
	`description` text,
	`status` enum('available','reserved','sold') NOT NULL DEFAULT 'available',
	`account_username` varchar(255) NOT NULL,
	`account_password` varchar(255) NOT NULL,
	`account_details` text,
	`encryption_iv` varchar(64),
	`auth_tag` varchar(64),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `game_accounts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `games` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`icon_url` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `games_id` PRIMARY KEY(`id`),
	CONSTRAINT `games_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`order_no` varchar(50) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`account_id` varchar(36) NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`payment_status` enum('pending','completed','failed','expired') NOT NULL DEFAULT 'pending',
	`payment_method` varchar(50) DEFAULT 'promptpay',
	`transaction_ref` varchar(100),
	`paid_at` datetime,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `orders_id` PRIMARY KEY(`id`),
	CONSTRAINT `orders_order_no_unique` UNIQUE(`order_no`)
);
--> statement-breakpoint
CREATE TABLE `product_images` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`account_id` varchar(36) NOT NULL,
	`image_url` varchar(255) NOT NULL,
	`display_order` int DEFAULT 0,
	`is_cover` boolean DEFAULT false,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `product_images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`email` varchar(100) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`name` varchar(100) NOT NULL,
	`role` enum('customer','admin') NOT NULL DEFAULT 'customer',
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `game_accounts` ADD CONSTRAINT `game_accounts_game_id_games_id_fk` FOREIGN KEY (`game_id`) REFERENCES `games`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_account_id_game_accounts_id_fk` FOREIGN KEY (`account_id`) REFERENCES `game_accounts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_images` ADD CONSTRAINT `product_images_account_id_game_accounts_id_fk` FOREIGN KEY (`account_id`) REFERENCES `game_accounts`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `idx_game_status` ON `game_accounts` (`game_id`,`status`);--> statement-breakpoint
CREATE INDEX `idx_price` ON `game_accounts` (`price`);--> statement-breakpoint
CREATE INDEX `idx_user_orders` ON `orders` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_order_status` ON `orders` (`payment_status`);--> statement-breakpoint
CREATE INDEX `idx_account_images` ON `product_images` (`account_id`,`display_order`);