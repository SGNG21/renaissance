-- Renaissance — Étape 1, point 4 : schéma des tables Payload CMS.
--
-- DDL généré par Payload lui-même (adaptateur postgres, push) sur une base
-- jetable, puis extrait avec pg_dump. Régénération : voir
-- scripts/payload-schema/README.md.
--
-- Migration NON destructive : création uniquement.
-- Les tables vivent dans le schéma payload, isolé du schéma public :
-- RLS activée, AUCUNE policy, aucun privilège pour anon ni authenticated.
-- Elles ne sont donc accessibles que par la connexion serveur de Payload.

create schema if not exists payload;

CREATE TYPE payload.enum__articles_v_version_categorie AS ENUM (
    'metiers',
    'se-former',
    'temoignages',
    'vie-de-la-maison'
);

CREATE TYPE payload.enum__articles_v_version_status AS ENUM (
    'draft',
    'published'
);

CREATE TYPE payload.enum__pages_v_version_status AS ENUM (
    'draft',
    'published'
);

CREATE TYPE payload.enum_articles_categorie AS ENUM (
    'metiers',
    'se-former',
    'temoignages',
    'vie-de-la-maison'
);

CREATE TYPE payload.enum_articles_status AS ENUM (
    'draft',
    'published'
);

CREATE TYPE payload.enum_pages_status AS ENUM (
    'draft',
    'published'
);

CREATE TABLE payload._articles_v (
    id integer NOT NULL,
    parent_id integer,
    version_titre character varying,
    version_slug character varying,
    version_categorie payload.enum__articles_v_version_categorie,
    version_date_publication timestamp(3) with time zone,
    version_chapo character varying,
    version_image_id integer,
    version_contenu jsonb,
    version_seo_titre character varying,
    version_seo_description character varying,
    version_updated_at timestamp(3) with time zone,
    version_created_at timestamp(3) with time zone,
    version__status payload.enum__articles_v_version_status DEFAULT 'draft'::payload.enum__articles_v_version_status,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    latest boolean
);

CREATE SEQUENCE payload._articles_v_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE payload._articles_v_id_seq OWNED BY payload._articles_v.id;

CREATE TABLE payload._pages_v (
    id integer NOT NULL,
    parent_id integer,
    version_titre character varying,
    version_slug character varying,
    version_chapo character varying,
    version_contenu jsonb,
    version_seo_titre character varying,
    version_seo_description character varying,
    version_updated_at timestamp(3) with time zone,
    version_created_at timestamp(3) with time zone,
    version__status payload.enum__pages_v_version_status DEFAULT 'draft'::payload.enum__pages_v_version_status,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    latest boolean
);

CREATE SEQUENCE payload._pages_v_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE payload._pages_v_id_seq OWNED BY payload._pages_v.id;

CREATE TABLE payload.articles (
    id integer NOT NULL,
    titre character varying,
    slug character varying,
    categorie payload.enum_articles_categorie,
    date_publication timestamp(3) with time zone,
    chapo character varying,
    image_id integer,
    contenu jsonb,
    seo_titre character varying,
    seo_description character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    _status payload.enum_articles_status DEFAULT 'draft'::payload.enum_articles_status
);

CREATE SEQUENCE payload.articles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE payload.articles_id_seq OWNED BY payload.articles.id;

CREATE TABLE payload.medias (
    id integer NOT NULL,
    alt character varying NOT NULL,
    credit_i_a boolean,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    url character varying,
    thumbnail_u_r_l character varying,
    filename character varying,
    mime_type character varying,
    filesize numeric,
    width numeric,
    height numeric,
    focal_x numeric,
    focal_y numeric
);

CREATE SEQUENCE payload.medias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE payload.medias_id_seq OWNED BY payload.medias.id;

CREATE TABLE payload.pages (
    id integer NOT NULL,
    titre character varying,
    slug character varying,
    chapo character varying,
    contenu jsonb,
    seo_titre character varying,
    seo_description character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    _status payload.enum_pages_status DEFAULT 'draft'::payload.enum_pages_status
);

CREATE SEQUENCE payload.pages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE payload.pages_id_seq OWNED BY payload.pages.id;

CREATE TABLE payload.payload_kv (
    id integer NOT NULL,
    key character varying NOT NULL,
    data jsonb NOT NULL
);

CREATE SEQUENCE payload.payload_kv_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE payload.payload_kv_id_seq OWNED BY payload.payload_kv.id;

CREATE TABLE payload.payload_locked_documents (
    id integer NOT NULL,
    global_slug character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE SEQUENCE payload.payload_locked_documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE payload.payload_locked_documents_id_seq OWNED BY payload.payload_locked_documents.id;

CREATE TABLE payload.payload_locked_documents_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    pages_id integer,
    articles_id integer,
    zones_seo_id integer,
    medias_id integer,
    users_id integer
);

CREATE SEQUENCE payload.payload_locked_documents_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE payload.payload_locked_documents_rels_id_seq OWNED BY payload.payload_locked_documents_rels.id;

CREATE TABLE payload.payload_migrations (
    id integer NOT NULL,
    name character varying,
    batch numeric,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE SEQUENCE payload.payload_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE payload.payload_migrations_id_seq OWNED BY payload.payload_migrations.id;

CREATE TABLE payload.payload_preferences (
    id integer NOT NULL,
    key character varying,
    value jsonb,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE SEQUENCE payload.payload_preferences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE payload.payload_preferences_id_seq OWNED BY payload.payload_preferences.id;

CREATE TABLE payload.payload_preferences_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    users_id integer
);

CREATE SEQUENCE payload.payload_preferences_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE payload.payload_preferences_rels_id_seq OWNED BY payload.payload_preferences_rels.id;

CREATE TABLE payload.users (
    id integer NOT NULL,
    nom character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    email character varying NOT NULL,
    reset_password_token character varying,
    reset_password_expiration timestamp(3) with time zone,
    salt character varying,
    hash character varying,
    reset_password_requested_at timestamp(3) with time zone,
    login_attempts numeric DEFAULT 0,
    lock_until timestamp(3) with time zone
);

CREATE SEQUENCE payload.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE payload.users_id_seq OWNED BY payload.users.id;

CREATE TABLE payload.users_sessions (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    created_at timestamp(3) with time zone,
    expires_at timestamp(3) with time zone NOT NULL
);

CREATE TABLE payload.zones_seo (
    id integer NOT NULL,
    nom character varying NOT NULL,
    slug character varying NOT NULL,
    titre_h1 character varying NOT NULL,
    introduction character varying NOT NULL,
    contenu jsonb,
    seo_titre character varying,
    seo_description character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE payload.zones_seo_faq (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    question character varying NOT NULL,
    reponse character varying NOT NULL
);

CREATE SEQUENCE payload.zones_seo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE payload.zones_seo_id_seq OWNED BY payload.zones_seo.id;

CREATE TABLE payload.zones_seo_maillage (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    libelle character varying NOT NULL,
    url character varying NOT NULL
);

ALTER TABLE ONLY payload._articles_v ALTER COLUMN id SET DEFAULT nextval('payload._articles_v_id_seq'::regclass);

ALTER TABLE ONLY payload._pages_v ALTER COLUMN id SET DEFAULT nextval('payload._pages_v_id_seq'::regclass);

ALTER TABLE ONLY payload.articles ALTER COLUMN id SET DEFAULT nextval('payload.articles_id_seq'::regclass);

ALTER TABLE ONLY payload.medias ALTER COLUMN id SET DEFAULT nextval('payload.medias_id_seq'::regclass);

ALTER TABLE ONLY payload.pages ALTER COLUMN id SET DEFAULT nextval('payload.pages_id_seq'::regclass);

ALTER TABLE ONLY payload.payload_kv ALTER COLUMN id SET DEFAULT nextval('payload.payload_kv_id_seq'::regclass);

ALTER TABLE ONLY payload.payload_locked_documents ALTER COLUMN id SET DEFAULT nextval('payload.payload_locked_documents_id_seq'::regclass);

ALTER TABLE ONLY payload.payload_locked_documents_rels ALTER COLUMN id SET DEFAULT nextval('payload.payload_locked_documents_rels_id_seq'::regclass);

ALTER TABLE ONLY payload.payload_migrations ALTER COLUMN id SET DEFAULT nextval('payload.payload_migrations_id_seq'::regclass);

ALTER TABLE ONLY payload.payload_preferences ALTER COLUMN id SET DEFAULT nextval('payload.payload_preferences_id_seq'::regclass);

ALTER TABLE ONLY payload.payload_preferences_rels ALTER COLUMN id SET DEFAULT nextval('payload.payload_preferences_rels_id_seq'::regclass);

ALTER TABLE ONLY payload.users ALTER COLUMN id SET DEFAULT nextval('payload.users_id_seq'::regclass);

ALTER TABLE ONLY payload.zones_seo ALTER COLUMN id SET DEFAULT nextval('payload.zones_seo_id_seq'::regclass);

ALTER TABLE ONLY payload._articles_v
    ADD CONSTRAINT _articles_v_pkey PRIMARY KEY (id);

ALTER TABLE ONLY payload._pages_v
    ADD CONSTRAINT _pages_v_pkey PRIMARY KEY (id);

ALTER TABLE ONLY payload.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);

ALTER TABLE ONLY payload.medias
    ADD CONSTRAINT medias_pkey PRIMARY KEY (id);

ALTER TABLE ONLY payload.pages
    ADD CONSTRAINT pages_pkey PRIMARY KEY (id);

ALTER TABLE ONLY payload.payload_kv
    ADD CONSTRAINT payload_kv_pkey PRIMARY KEY (id);

ALTER TABLE ONLY payload.payload_locked_documents
    ADD CONSTRAINT payload_locked_documents_pkey PRIMARY KEY (id);

ALTER TABLE ONLY payload.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_pkey PRIMARY KEY (id);

ALTER TABLE ONLY payload.payload_migrations
    ADD CONSTRAINT payload_migrations_pkey PRIMARY KEY (id);

ALTER TABLE ONLY payload.payload_preferences
    ADD CONSTRAINT payload_preferences_pkey PRIMARY KEY (id);

ALTER TABLE ONLY payload.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_pkey PRIMARY KEY (id);

ALTER TABLE ONLY payload.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE ONLY payload.users_sessions
    ADD CONSTRAINT users_sessions_pkey PRIMARY KEY (id);

ALTER TABLE ONLY payload.zones_seo_faq
    ADD CONSTRAINT zones_seo_faq_pkey PRIMARY KEY (id);

ALTER TABLE ONLY payload.zones_seo_maillage
    ADD CONSTRAINT zones_seo_maillage_pkey PRIMARY KEY (id);

ALTER TABLE ONLY payload.zones_seo
    ADD CONSTRAINT zones_seo_pkey PRIMARY KEY (id);

CREATE INDEX _articles_v_created_at_idx ON payload._articles_v USING btree (created_at);

CREATE INDEX _articles_v_latest_idx ON payload._articles_v USING btree (latest);

CREATE INDEX _articles_v_parent_idx ON payload._articles_v USING btree (parent_id);

CREATE INDEX _articles_v_updated_at_idx ON payload._articles_v USING btree (updated_at);

CREATE INDEX _articles_v_version_version__status_idx ON payload._articles_v USING btree (version__status);

CREATE INDEX _articles_v_version_version_created_at_idx ON payload._articles_v USING btree (version_created_at);

CREATE INDEX _articles_v_version_version_image_idx ON payload._articles_v USING btree (version_image_id);

CREATE INDEX _articles_v_version_version_slug_idx ON payload._articles_v USING btree (version_slug);

CREATE INDEX _articles_v_version_version_updated_at_idx ON payload._articles_v USING btree (version_updated_at);

CREATE INDEX _pages_v_created_at_idx ON payload._pages_v USING btree (created_at);

CREATE INDEX _pages_v_latest_idx ON payload._pages_v USING btree (latest);

CREATE INDEX _pages_v_parent_idx ON payload._pages_v USING btree (parent_id);

CREATE INDEX _pages_v_updated_at_idx ON payload._pages_v USING btree (updated_at);

CREATE INDEX _pages_v_version_version__status_idx ON payload._pages_v USING btree (version__status);

CREATE INDEX _pages_v_version_version_created_at_idx ON payload._pages_v USING btree (version_created_at);

CREATE INDEX _pages_v_version_version_slug_idx ON payload._pages_v USING btree (version_slug);

CREATE INDEX _pages_v_version_version_updated_at_idx ON payload._pages_v USING btree (version_updated_at);

CREATE INDEX articles__status_idx ON payload.articles USING btree (_status);

CREATE INDEX articles_created_at_idx ON payload.articles USING btree (created_at);

CREATE INDEX articles_image_idx ON payload.articles USING btree (image_id);

CREATE UNIQUE INDEX articles_slug_idx ON payload.articles USING btree (slug);

CREATE INDEX articles_updated_at_idx ON payload.articles USING btree (updated_at);

CREATE INDEX medias_created_at_idx ON payload.medias USING btree (created_at);

CREATE UNIQUE INDEX medias_filename_idx ON payload.medias USING btree (filename);

CREATE INDEX medias_updated_at_idx ON payload.medias USING btree (updated_at);

CREATE INDEX pages__status_idx ON payload.pages USING btree (_status);

CREATE INDEX pages_created_at_idx ON payload.pages USING btree (created_at);

CREATE UNIQUE INDEX pages_slug_idx ON payload.pages USING btree (slug);

CREATE INDEX pages_updated_at_idx ON payload.pages USING btree (updated_at);

CREATE UNIQUE INDEX payload_kv_key_idx ON payload.payload_kv USING btree (key);

CREATE INDEX payload_locked_documents_created_at_idx ON payload.payload_locked_documents USING btree (created_at);

CREATE INDEX payload_locked_documents_global_slug_idx ON payload.payload_locked_documents USING btree (global_slug);

CREATE INDEX payload_locked_documents_rels_articles_id_idx ON payload.payload_locked_documents_rels USING btree (articles_id);

CREATE INDEX payload_locked_documents_rels_medias_id_idx ON payload.payload_locked_documents_rels USING btree (medias_id);

CREATE INDEX payload_locked_documents_rels_order_idx ON payload.payload_locked_documents_rels USING btree ("order");

CREATE INDEX payload_locked_documents_rels_pages_id_idx ON payload.payload_locked_documents_rels USING btree (pages_id);

CREATE INDEX payload_locked_documents_rels_parent_idx ON payload.payload_locked_documents_rels USING btree (parent_id);

CREATE INDEX payload_locked_documents_rels_path_idx ON payload.payload_locked_documents_rels USING btree (path);

CREATE INDEX payload_locked_documents_rels_users_id_idx ON payload.payload_locked_documents_rels USING btree (users_id);

CREATE INDEX payload_locked_documents_rels_zones_seo_id_idx ON payload.payload_locked_documents_rels USING btree (zones_seo_id);

CREATE INDEX payload_locked_documents_updated_at_idx ON payload.payload_locked_documents USING btree (updated_at);

CREATE INDEX payload_migrations_created_at_idx ON payload.payload_migrations USING btree (created_at);

CREATE INDEX payload_migrations_updated_at_idx ON payload.payload_migrations USING btree (updated_at);

CREATE INDEX payload_preferences_created_at_idx ON payload.payload_preferences USING btree (created_at);

CREATE INDEX payload_preferences_key_idx ON payload.payload_preferences USING btree (key);

CREATE INDEX payload_preferences_rels_order_idx ON payload.payload_preferences_rels USING btree ("order");

CREATE INDEX payload_preferences_rels_parent_idx ON payload.payload_preferences_rels USING btree (parent_id);

CREATE INDEX payload_preferences_rels_path_idx ON payload.payload_preferences_rels USING btree (path);

CREATE INDEX payload_preferences_rels_users_id_idx ON payload.payload_preferences_rels USING btree (users_id);

CREATE INDEX payload_preferences_updated_at_idx ON payload.payload_preferences USING btree (updated_at);

CREATE INDEX users_created_at_idx ON payload.users USING btree (created_at);

CREATE UNIQUE INDEX users_email_idx ON payload.users USING btree (email);

CREATE INDEX users_sessions_order_idx ON payload.users_sessions USING btree (_order);

CREATE INDEX users_sessions_parent_id_idx ON payload.users_sessions USING btree (_parent_id);

CREATE INDEX users_updated_at_idx ON payload.users USING btree (updated_at);

CREATE INDEX zones_seo_created_at_idx ON payload.zones_seo USING btree (created_at);

CREATE INDEX zones_seo_faq_order_idx ON payload.zones_seo_faq USING btree (_order);

CREATE INDEX zones_seo_faq_parent_id_idx ON payload.zones_seo_faq USING btree (_parent_id);

CREATE INDEX zones_seo_maillage_order_idx ON payload.zones_seo_maillage USING btree (_order);

CREATE INDEX zones_seo_maillage_parent_id_idx ON payload.zones_seo_maillage USING btree (_parent_id);

CREATE UNIQUE INDEX zones_seo_slug_idx ON payload.zones_seo USING btree (slug);

CREATE INDEX zones_seo_updated_at_idx ON payload.zones_seo USING btree (updated_at);

ALTER TABLE ONLY payload._articles_v
    ADD CONSTRAINT _articles_v_parent_id_articles_id_fk FOREIGN KEY (parent_id) REFERENCES payload.articles(id) ON DELETE SET NULL;

ALTER TABLE ONLY payload._articles_v
    ADD CONSTRAINT _articles_v_version_image_id_medias_id_fk FOREIGN KEY (version_image_id) REFERENCES payload.medias(id) ON DELETE SET NULL;

ALTER TABLE ONLY payload._pages_v
    ADD CONSTRAINT _pages_v_parent_id_pages_id_fk FOREIGN KEY (parent_id) REFERENCES payload.pages(id) ON DELETE SET NULL;

ALTER TABLE ONLY payload.articles
    ADD CONSTRAINT articles_image_id_medias_id_fk FOREIGN KEY (image_id) REFERENCES payload.medias(id) ON DELETE SET NULL;

ALTER TABLE ONLY payload.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_articles_fk FOREIGN KEY (articles_id) REFERENCES payload.articles(id) ON DELETE CASCADE;

ALTER TABLE ONLY payload.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_medias_fk FOREIGN KEY (medias_id) REFERENCES payload.medias(id) ON DELETE CASCADE;

ALTER TABLE ONLY payload.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_pages_fk FOREIGN KEY (pages_id) REFERENCES payload.pages(id) ON DELETE CASCADE;

ALTER TABLE ONLY payload.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES payload.payload_locked_documents(id) ON DELETE CASCADE;

ALTER TABLE ONLY payload.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_users_fk FOREIGN KEY (users_id) REFERENCES payload.users(id) ON DELETE CASCADE;

ALTER TABLE ONLY payload.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_zones_seo_fk FOREIGN KEY (zones_seo_id) REFERENCES payload.zones_seo(id) ON DELETE CASCADE;

ALTER TABLE ONLY payload.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES payload.payload_preferences(id) ON DELETE CASCADE;

ALTER TABLE ONLY payload.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_users_fk FOREIGN KEY (users_id) REFERENCES payload.users(id) ON DELETE CASCADE;

ALTER TABLE ONLY payload.users_sessions
    ADD CONSTRAINT users_sessions_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES payload.users(id) ON DELETE CASCADE;

ALTER TABLE ONLY payload.zones_seo_faq
    ADD CONSTRAINT zones_seo_faq_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES payload.zones_seo(id) ON DELETE CASCADE;

ALTER TABLE ONLY payload.zones_seo_maillage
    ADD CONSTRAINT zones_seo_maillage_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES payload.zones_seo(id) ON DELETE CASCADE;

------------------------------------------------------------------------------
-- Verrouillage du schéma payload (cahier technique, section 2)
------------------------------------------------------------------------------
revoke all on schema payload from public, anon, authenticated;
revoke all on all tables in schema payload from public, anon, authenticated;
revoke all on all sequences in schema payload from public, anon, authenticated;

-- RLS activée sur toutes les tables du schéma, sans aucune policy.
do $$
declare t record;
begin
  for t in select tablename from pg_tables where schemaname = 'payload' loop
    execute format('alter table payload.%I enable row level security', t.tablename);
  end loop;
end
$$;
