CREATE TABLE `account` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category_group_id` integer NOT NULL,
	`name` text DEFAULT '',
	`monthlyAmount` real DEFAULT 0 NOT NULL,
	`goalAMount` real,
	FOREIGN KEY (`category_group_id`) REFERENCES `category_group`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `category_group` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `transaction` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`transactionDate` integer,
	`outFlow` real,
	`inFlow` real,
	`categoryGroupId` integer,
	`accountId` integer,
	FOREIGN KEY (`categoryGroupId`) REFERENCES `category_group`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON UPDATE no action ON DELETE no action
);
