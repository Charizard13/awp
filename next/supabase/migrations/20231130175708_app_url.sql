alter table "public"."apps" add column "url" text not null;

CREATE UNIQUE INDEX apps_url_key ON public.apps USING btree (url);

alter table "public"."apps" add constraint "apps_url_check" CHECK ((length(url) < 100)) not valid;

alter table "public"."apps" validate constraint "apps_url_check";

alter table "public"."apps" add constraint "apps_url_key" UNIQUE using index "apps_url_key";


