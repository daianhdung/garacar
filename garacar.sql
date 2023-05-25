--username: persol.project123@gmail.com
--password: sdhfqvkdzcquvfqd

CREATE TABLE "role" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL,
  "description" VARCHAR(100)
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar(50) UNIQUE,
  "password" varchar(100),
  "fullname" varchar(100),
  "username" varchar(100),
  "phone" varchar(100),
  "address" varchar(100),
  "create_at" TIMESTAMP DEFAULT (now()),
  "role_id" INT
);

CREATE TABLE "category" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL,
  "image" varchar(255)
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
  "description" VARCHAR(1000),
  "specification" VARCHAR(1000),
"special_offer" VARCHAR(1000),
  "category_id" int,
  "create_at" TIMESTAMP  DEFAULT (now()),
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

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "fee_ship" int,
  "coupon" float,
  "temp_total" int,
  "total" float,
  "user_id" int,
  "delivery_address" varchar(100),
  "order_token" varchar(50),
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

ALTER TABLE
  "category_brand"
ADD
  FOREIGN KEY ("category_id") REFERENCES "category" ("id");

ALTER TABLE
  "category_brand"
ADD
  FOREIGN KEY ("brand_id") REFERENCES "brand" ("id");

ALTER TABLE
  "users"
ADD
  FOREIGN KEY ("role_id") REFERENCES "role" ("id");

ALTER TABLE
  "product"
ADD
  FOREIGN KEY ("category_id") REFERENCES "category" ("id");

ALTER TABLE
  "product"
ADD
  FOREIGN KEY ("brand_id") REFERENCES "brand" ("id");

ALTER TABLE
  "image_product"
ADD
  FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE CASCADE;

ALTER TABLE
  "bookmark_product"
ADD
  FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE
  "bookmark_product"
ADD
  FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE
  "orders"
ADD
  FOREIGN KEY ("status_id") REFERENCES "status" ("id");

ALTER TABLE
  "orders"
ADD
  FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE
  "product_order"
ADD
  FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

ALTER TABLE
  "product_order"
ADD
  FOREIGN KEY ("product_id") REFERENCES "product" ("id");

INSERT INTO
  "role"(name, description)
VALUES
  ('ROLE_ADMIN', 'Admin');

INSERT INTO
  "role"(name, description)
VALUES
  ('ROLE_USER', 'Customer');
INSERT INTO
  "role"(name, description)
VALUES
  ('ROLE_ANONYMOUS', 'Anonymous Customer');

INSERT INTO
  "users"(
    email,
    username,
    password,
    fullname,
    phone,
    address,
    role_id
  )
VALUES
  (
    'test@gmail.com',
    'admin_sam',
    '$2a$10$eAEvZircGvFGZcJSgzMmMO7Z8C7hv19Y5VsbK8yqefVlQhSFUjnfy',
    'SAMBUCHE',
    '0922003033',
    '199 Đường Gò Dưa, Tam Bình, Thủ Đức, Thành phố Hồ Chí Minh',
    '1'
  );

INSERT INTO
  "brand"(name, image)
VALUES
  ('Audi', 'Audi.png');

INSERT INTO
  "brand"(name, image)
VALUES
  ('BMW', 'BMW.png');

INSERT INTO
  "brand"(name, image)
VALUES
  ('Ford', 'Ford.png');

INSERT INTO
  "brand"(name, image)
VALUES
  ('Honda', 'Honda.png');

INSERT INTO
  "brand"(name, image)
VALUES
  ('Huyndai', 'Hyundai.png');

INSERT INTO
  "brand"(name, image)
VALUES
  ('KIA', 'KIA.png');

INSERT INTO
  "brand"(name, image)
VALUES
  ('Lexus', 'Lexus.png');

INSERT INTO
  "brand"(name, image)
VALUES
  ('Mazda', 'Mazda.png');

INSERT INTO
  "brand"(name, image)
VALUES
  ('Mercedes-Benz', 'Mercedes-Benz.png');

INSERT INTO
  "brand"(name, image)
VALUES
  ('Nissan', 'Nissan.png');

INSERT INTO
  "brand"(name, image)
VALUES
  ('Suzuki', 'Suzuki.png');

INSERT INTO
  "category"(name)
VALUES
  ('Loa ô tô');

INSERT INTO
  "category"(name)
VALUES
  ('Camera hành trình');

INSERT INTO
  "category"(name)
VALUES
  ('Đèn ô tô');

INSERT INTO
  "category"(name)
VALUES
  ('Màn hình DVD android');

INSERT INTO
  "category"(name)
VALUES
  ('Camera 360');


INSERT INTO "product"(name, main_image, price, detail, category_id, brand_id, create_by) VALUES('Test product', 'san-pham-camera-360-z311.jpg',  17000000,'Chi tiết sản phẩm', 1, 2, 'admin')

INSERT INTO "status"(name)  VALUES ('Chưa xác nhận');
INSERT INTO "status"(name)  VALUES ('Xác nhận');
INSERT INTO "status"(name)  VALUES ('Hoàn thành');
INSERT INTO "status"(name)  VALUES ('Đã hủy');
