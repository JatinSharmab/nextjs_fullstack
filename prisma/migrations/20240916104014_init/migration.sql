-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateTable
CREATE TABLE "em_roles" (
    "role_id" SERIAL NOT NULL,
    "role_name" VARCHAR(30) NOT NULL,

    CONSTRAINT "em_roles_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "em_users" (
    "user_id" SERIAL NOT NULL,
    "user_first_name" VARCHAR(30),
    "user_last_name" VARCHAR(30),
    "user_age" INTEGER,
    "user_email" VARCHAR(30) NOT NULL,
    "user_phone" VARCHAR(200),
    "user_city_name" VARCHAR(20),
    "user_state_name" VARCHAR(20),
    "user_country_name" VARCHAR(20),
    "user_updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_deleted_at" TIMESTAMP(3),
    "user_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_password" VARCHAR(200) NOT NULL,
    "user_gender" "Gender",
    "user_role_id" INTEGER NOT NULL,

    CONSTRAINT "em_users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "em_countries" (
    "country_id" SERIAL NOT NULL,
    "country_name" VARCHAR(30) NOT NULL,

    CONSTRAINT "em_countries_pkey" PRIMARY KEY ("country_id")
);

-- CreateTable
CREATE TABLE "em_states" (
    "state_id" SERIAL NOT NULL,
    "country_id" INTEGER NOT NULL,
    "state_name" VARCHAR(30) NOT NULL,

    CONSTRAINT "em_states_pkey" PRIMARY KEY ("state_id")
);

-- CreateTable
CREATE TABLE "em_cities" (
    "city_id" SERIAL NOT NULL,
    "state_id" INTEGER NOT NULL,
    "city_name" VARCHAR(30) NOT NULL,

    CONSTRAINT "em_cities_pkey" PRIMARY KEY ("city_id")
);

-- CreateTable
CREATE TABLE "em_projects" (
    "project_id" SERIAL NOT NULL,
    "project_user_id" INTEGER NOT NULL,
    "project_name" VARCHAR(50) NOT NULL,
    "project_technology" VARCHAR(50) NOT NULL,
    "project_status" VARCHAR(20) NOT NULL,
    "project_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "project_deleted_at" BOOLEAN,
    "project_updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "project_start_date" TIMESTAMP(3),
    "project_deadline_date" TIMESTAMP(3),
    "project_lead" VARCHAR(50),
    "project_manager" VARCHAR(50),
    "project_client" VARCHAR(50),
    "project_management_tool" VARCHAR(50),
    "project_management_tool_url" VARCHAR(100),
    "project_repo_tool" VARCHAR(50),
    "project_repo_tool_url" VARCHAR(100),
    "project_description" TEXT,

    CONSTRAINT "em_projects_pkey" PRIMARY KEY ("project_id")
);

-- CreateIndex
CREATE INDEX "em_users_user_role_id_idx" ON "em_users"("user_role_id");

-- CreateIndex
CREATE INDEX "em_states_country_id_idx" ON "em_states"("country_id");

-- CreateIndex
CREATE INDEX "em_cities_state_id_idx" ON "em_cities"("state_id");

-- AddForeignKey
ALTER TABLE "em_users" ADD CONSTRAINT "em_users_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "em_roles"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "em_states" ADD CONSTRAINT "em_states_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "em_countries"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "em_cities" ADD CONSTRAINT "em_cities_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "em_states"("state_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "em_projects" ADD CONSTRAINT "em_projects_project_user_id_fkey" FOREIGN KEY ("project_user_id") REFERENCES "em_users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
