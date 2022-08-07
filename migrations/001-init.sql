-- Up
CREATE TABLE Gen (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    gen_name TEXT,
    rarity TEXT,
    str_increase INTEGER DEFAULT 0,
    vit_increase INTEGER DEFAULT 0,
    int_increase INTEGER DEFAULT 0,
    krm_increase INTEGER DEFAULT 0,
    dex_increase INTEGER DEFAULT 0
);

INSERT INTO Gen (gen_name,rarity,str_increase ,vit_increase) values ('test', 'uncommon',1,2);


-- Down
DROP TABLE Gen;