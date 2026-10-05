ALTER TABLE `orders` DROP FOREIGN KEY `orders_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `orders` DROP FOREIGN KEY `orders_account_id_game_accounts_id_fk`;
--> statement-breakpoint
ALTER TABLE `game_accounts` MODIFY COLUMN `id` binary(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), 1));--> statement-breakpoint
ALTER TABLE `game_accounts` MODIFY COLUMN `game_id` binary(16) NOT NULL;--> statement-breakpoint
ALTER TABLE `games` MODIFY COLUMN `id` binary(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), 1));--> statement-breakpoint
ALTER TABLE `orders` MODIFY COLUMN `id` binary(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), 1));--> statement-breakpoint
ALTER TABLE `orders` MODIFY COLUMN `user_id` binary(16) NOT NULL;--> statement-breakpoint
ALTER TABLE `orders` MODIFY COLUMN `account_id` binary(16) NOT NULL;--> statement-breakpoint
ALTER TABLE `product_images` MODIFY COLUMN `id` binary(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), 1));--> statement-breakpoint
ALTER TABLE `product_images` MODIFY COLUMN `account_id` binary(16) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `id` binary(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), 1));--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_account_id_game_accounts_id_fk` FOREIGN KEY (`account_id`) REFERENCES `game_accounts`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `idx_order_account` ON `orders` (`account_id`);