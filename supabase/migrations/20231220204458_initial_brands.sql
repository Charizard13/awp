drop policy "Owner" on "public"."apps";

revoke delete on table "public"."apps" from "anon";

revoke insert on table "public"."apps" from "anon";

revoke references on table "public"."apps" from "anon";

revoke select on table "public"."apps" from "anon";

revoke trigger on table "public"."apps" from "anon";

revoke truncate on table "public"."apps" from "anon";

revoke update on table "public"."apps" from "anon";

revoke delete on table "public"."apps" from "authenticated";

revoke insert on table "public"."apps" from "authenticated";

revoke references on table "public"."apps" from "authenticated";

revoke select on table "public"."apps" from "authenticated";

revoke trigger on table "public"."apps" from "authenticated";

revoke truncate on table "public"."apps" from "authenticated";

revoke update on table "public"."apps" from "authenticated";

revoke delete on table "public"."apps" from "service_role";

revoke insert on table "public"."apps" from "service_role";

revoke references on table "public"."apps" from "service_role";

revoke select on table "public"."apps" from "service_role";

revoke trigger on table "public"."apps" from "service_role";

revoke truncate on table "public"."apps" from "service_role";

revoke update on table "public"."apps" from "service_role";

alter table "public"."apps" drop constraint "apps_name_key";

alter table "public"."apps" drop constraint "apps_url_check";

alter table "public"."apps" drop constraint "apps_url_key";

alter table "public"."apps" drop constraint "apps_user_id_fkey";

alter table "public"."brands" drop constraint "brands_url_key";

alter table "public"."apps" drop constraint "apps_pkey";

drop index if exists "public"."apps_name_key";

drop index if exists "public"."apps_pkey";

drop index if exists "public"."apps_url_key";

drop index if exists "public"."brands_url_key";

drop table "public"."apps";

alter table "public"."links" drop column "link";

alter table "public"."links" add column "url" text not null;

create policy "Public"
on "public"."brands"
as permissive
for select
to anon, authenticated
using (true);


create policy "Onwer"
on "public"."links"
as permissive
for all
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "Public"
on "public"."links"
as permissive
for select
to authenticated, anon
using (true);



