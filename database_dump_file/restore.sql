--
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 10.4
-- Dumped by pg_dump version 10.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.links DROP CONSTRAINT links_user_id_fkey;
ALTER TABLE ONLY public.link_on_folders DROP CONSTRAINT link_on_folders_link_id_fkey;
ALTER TABLE ONLY public.link_on_folders DROP CONSTRAINT link_on_folders_folder_id_fkey;
ALTER TABLE ONLY public.folders DROP CONSTRAINT folders_user_id_fkey;
DROP INDEX public.users_username;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.links DROP CONSTRAINT links_pkey;
ALTER TABLE ONLY public.link_on_folders DROP CONSTRAINT link_on_folders_pkey;
ALTER TABLE ONLY public.folders DROP CONSTRAINT folders_pkey;
ALTER TABLE ONLY public."SequelizeMeta" DROP CONSTRAINT "SequelizeMeta_pkey";
ALTER TABLE public.link_on_folders ALTER COLUMN "order" DROP DEFAULT;
ALTER TABLE public.folders ALTER COLUMN "order" DROP DEFAULT;
DROP TABLE public.users;
DROP TABLE public.links;
DROP SEQUENCE public.link_on_folders_order_seq;
DROP TABLE public.link_on_folders;
DROP SEQUENCE public.folders_order_seq;
DROP TABLE public.folders;
DROP TABLE public."SequelizeMeta";
DROP EXTENSION "uuid-ossp";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: henrygolden
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO henrygolden;

--
-- Name: folders; Type: TABLE; Schema: public; Owner: henrygolden
--

CREATE TABLE public.folders (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    name character varying(255),
    "order" integer NOT NULL
);


ALTER TABLE public.folders OWNER TO henrygolden;

--
-- Name: folders_order_seq; Type: SEQUENCE; Schema: public; Owner: henrygolden
--

CREATE SEQUENCE public.folders_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.folders_order_seq OWNER TO henrygolden;

--
-- Name: folders_order_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: henrygolden
--

ALTER SEQUENCE public.folders_order_seq OWNED BY public.folders."order";


--
-- Name: link_on_folders; Type: TABLE; Schema: public; Owner: henrygolden
--

CREATE TABLE public.link_on_folders (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    folder_id uuid,
    link_id uuid,
    "order" integer NOT NULL
);


ALTER TABLE public.link_on_folders OWNER TO henrygolden;

--
-- Name: link_on_folders_order_seq; Type: SEQUENCE; Schema: public; Owner: henrygolden
--

CREATE SEQUENCE public.link_on_folders_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.link_on_folders_order_seq OWNER TO henrygolden;

--
-- Name: link_on_folders_order_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: henrygolden
--

ALTER SEQUENCE public.link_on_folders_order_seq OWNED BY public.link_on_folders."order";


--
-- Name: links; Type: TABLE; Schema: public; Owner: henrygolden
--

CREATE TABLE public.links (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    url character varying(510),
    img character varying(510),
    headline character varying(255)
);


ALTER TABLE public.links OWNER TO henrygolden;

--
-- Name: users; Type: TABLE; Schema: public; Owner: henrygolden
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying(255),
    password character varying(255),
    firstname character varying(255),
    propic character varying(255)
);


ALTER TABLE public.users OWNER TO henrygolden;

--
-- Name: folders order; Type: DEFAULT; Schema: public; Owner: henrygolden
--

ALTER TABLE ONLY public.folders ALTER COLUMN "order" SET DEFAULT nextval('public.folders_order_seq'::regclass);


--
-- Name: link_on_folders order; Type: DEFAULT; Schema: public; Owner: henrygolden
--

ALTER TABLE ONLY public.link_on_folders ALTER COLUMN "order" SET DEFAULT nextval('public.link_on_folders_order_seq'::regclass);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: henrygolden
--

COPY public."SequelizeMeta" (name) FROM stdin;
\.
COPY public."SequelizeMeta" (name) FROM '$$PATH$$/3171.dat';

--
-- Data for Name: folders; Type: TABLE DATA; Schema: public; Owner: henrygolden
--

COPY public.folders (id, user_id, name, "order") FROM stdin;
\.
COPY public.folders (id, user_id, name, "order") FROM '$$PATH$$/3175.dat';

--
-- Data for Name: link_on_folders; Type: TABLE DATA; Schema: public; Owner: henrygolden
--

COPY public.link_on_folders (id, folder_id, link_id, "order") FROM stdin;
\.
COPY public.link_on_folders (id, folder_id, link_id, "order") FROM '$$PATH$$/3177.dat';

--
-- Data for Name: links; Type: TABLE DATA; Schema: public; Owner: henrygolden
--

COPY public.links (id, user_id, url, img, headline) FROM stdin;
\.
COPY public.links (id, user_id, url, img, headline) FROM '$$PATH$$/3173.dat';

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: henrygolden
--

COPY public.users (id, username, password, firstname, propic) FROM stdin;
\.
COPY public.users (id, username, password, firstname, propic) FROM '$$PATH$$/3172.dat';

--
-- Name: folders_order_seq; Type: SEQUENCE SET; Schema: public; Owner: henrygolden
--

SELECT pg_catalog.setval('public.folders_order_seq', 88, true);


--
-- Name: link_on_folders_order_seq; Type: SEQUENCE SET; Schema: public; Owner: henrygolden
--

SELECT pg_catalog.setval('public.link_on_folders_order_seq', 189, true);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: henrygolden
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: folders folders_pkey; Type: CONSTRAINT; Schema: public; Owner: henrygolden
--

ALTER TABLE ONLY public.folders
    ADD CONSTRAINT folders_pkey PRIMARY KEY (id);


--
-- Name: link_on_folders link_on_folders_pkey; Type: CONSTRAINT; Schema: public; Owner: henrygolden
--

ALTER TABLE ONLY public.link_on_folders
    ADD CONSTRAINT link_on_folders_pkey PRIMARY KEY (id);


--
-- Name: links links_pkey; Type: CONSTRAINT; Schema: public; Owner: henrygolden
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: henrygolden
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_username; Type: INDEX; Schema: public; Owner: henrygolden
--

CREATE INDEX users_username ON public.users USING btree (username);


--
-- Name: folders folders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: henrygolden
--

ALTER TABLE ONLY public.folders
    ADD CONSTRAINT folders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: link_on_folders link_on_folders_folder_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: henrygolden
--

ALTER TABLE ONLY public.link_on_folders
    ADD CONSTRAINT link_on_folders_folder_id_fkey FOREIGN KEY (folder_id) REFERENCES public.folders(id);


--
-- Name: link_on_folders link_on_folders_link_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: henrygolden
--

ALTER TABLE ONLY public.link_on_folders
    ADD CONSTRAINT link_on_folders_link_id_fkey FOREIGN KEY (link_id) REFERENCES public.links(id);


--
-- Name: links links_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: henrygolden
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

