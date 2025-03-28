PGDMP      3                }            shopdb    16.1    16.1     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    172062    shopdb    DATABASE     z   CREATE DATABASE shopdb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE shopdb;
                postgres    false            �            1259    172072    payment_history    TABLE     �   CREATE TABLE public.payment_history (
    id integer NOT NULL,
    action character varying NOT NULL,
    user_id integer,
    amount double precision NOT NULL
);
 #   DROP TABLE public.payment_history;
       public         heap    postgres    false            �            1259    172071    payment_history_id_seq    SEQUENCE     �   CREATE SEQUENCE public.payment_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.payment_history_id_seq;
       public          postgres    false    218            �           0    0    payment_history_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.payment_history_id_seq OWNED BY public.payment_history.id;
          public          postgres    false    217            �            1259    172085    user    TABLE     _   CREATE TABLE public."user" (
    id integer NOT NULL,
    balance double precision NOT NULL
);
    DROP TABLE public."user";
       public         heap    postgres    false            �            1259    172084    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public          postgres    false    220            �           0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
          public          postgres    false    219            �            1259    172064    users    TABLE     [   CREATE TABLE public.users (
    id integer NOT NULL,
    balance numeric(12,2) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    172063    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    216            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    215            %           2604    172075    payment_history id    DEFAULT     x   ALTER TABLE ONLY public.payment_history ALTER COLUMN id SET DEFAULT nextval('public.payment_history_id_seq'::regclass);
 A   ALTER TABLE public.payment_history ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            &           2604    172088    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            $           2604    172067    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            ,           2606    172091 #   user PK_cace4a159ff9f2512dd42373760 
   CONSTRAINT     e   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760";
       public            postgres    false    220            *           2606    172078 $   payment_history payment_history_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.payment_history
    ADD CONSTRAINT payment_history_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.payment_history DROP CONSTRAINT payment_history_pkey;
       public            postgres    false    218            (           2606    172070    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            -           2606    172104 .   payment_history FK_87a6f5afc86958a2206e337065f    FK CONSTRAINT     �   ALTER TABLE ONLY public.payment_history
    ADD CONSTRAINT "FK_87a6f5afc86958a2206e337065f" FOREIGN KEY (user_id) REFERENCES public.users(id);
 Z   ALTER TABLE ONLY public.payment_history DROP CONSTRAINT "FK_87a6f5afc86958a2206e337065f";
       public          postgres    false    4648    218    216           