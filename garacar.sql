CREATE TABLE "role" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL,
  "description" VARCHAR(100)
);

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar(50) UNIQUE,
  "password" varchar(50),
  "fullname" varchar(100),
  "phone" varchar(100),
  "address" varchar(100),
  "create_at" TIMESTAMP DEFAULT (now()),
  "role_id" INT
);

CREATE TABLE "category" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL
);

CREATE TABLE "brand" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL,
  "image" varchar(255)
);

CREATE TABLE "category_brand" (
  "category_id" int,
  "brand_id" int,
  PRIMARY KEY ("category_id", "brand_id")
);

CREATE TABLE "product" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(100),
  "main_image" varchar(255),
  "amount_of_sold" int DEFAULT 0,
  "price" int,
  "detail" text,
  "category_id" int,
"create_at" TIMESTAMP DEFAULT (now()),
"create_by" VARCHAR(50),
  "brand_id" int
);

CREATE TABLE "image_product" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(255),
  "product_id" int
);

CREATE TABLE "bookmark_product" (
  "user_id" int,
  "product_id" int,
  PRIMARY KEY ("user_id", "product_id")
);

CREATE TABLE "coupon" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(50) UNIQUE NOT NULL,
  "rate" float NOT NULL
);

CREATE TABLE "status" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(50)
);

CREATE TABLE "order" (
  "id" SERIAL PRIMARY KEY,
  "fee_ship" int,
  "coupon" float,
  "temp_total" int,
  "total" float,
  "user_id" int,
  "delivery_address" varchar(100),
"create_at" TIMESTAMP DEFAULT (now()),
  "status_id" int
);

CREATE TABLE "product_order" (
  "order_id" int,
  "product_id" int,
  "amount" int,
  "price" int,
  PRIMARY KEY ("order_id", "product_id")
);

CREATE TABLE "mail" (
  "id" SERIAL PRIMARY KEY,
  "fullname" varchar(50),
  "email" varchar(50),
  "phone" varchar(20),
  "message" text,
  "create_at" TIMESTAMP DEFAULT (now())
);

CREATE TABLE "visitor" (
  "id" SERIAL PRIMARY KEY,
  "ip_address" varchar(50),
  "count" int,
  "start_time" TIMESTAMP DEFAULT (now()),
  "end_time" TIMESTAMP
);

ALTER TABLE "category_brand" ADD FOREIGN KEY ("category_id") REFERENCES "category" ("id");

ALTER TABLE "category_brand" ADD FOREIGN KEY ("brand_id") REFERENCES "brand" ("id");

ALTER TABLE "user" ADD FOREIGN KEY ("role_id") REFERENCES "role" ("id");

ALTER TABLE "product" ADD FOREIGN KEY ("category_id") REFERENCES "category" ("id");

ALTER TABLE "product" ADD FOREIGN KEY ("brand_id") REFERENCES "brand" ("id");

ALTER TABLE "image_product" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE CASCADE;

ALTER TABLE "bookmark_product" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "bookmark_product" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("status_id") REFERENCES "status" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "product_order" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id");

ALTER TABLE "product_order" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");
