alter table "public"."brands" drop constraint "apps_url_check";

alter table "public"."brands" drop column "url";

alter table "public"."brands" add column "website" text;

alter table "public"."links" drop column "description";

alter table "public"."links" add column "name" text not null;

alter table "public"."brands" add constraint "brands_url_check" CHECK ((length(website) < 500)) not valid;

alter table "public"."brands" validate constraint "brands_url_check";


