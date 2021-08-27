CREATE TABLE nodes (
    node_id VARCHAR UNIQUE NOT NULL PRIMARY KEY,
    longitude REAL NOT NULL CHECK (
        longitude >= -180 AND longitude <= 180
    ),
    latitude REAL NOT NULL CHECK (
        latitude >= -90 AND latitude <= 90
    )
);

INSERT INTO nodes (node_id, longitude, latitude) VALUES ('QmXwUgF48ULy6hkgfqrEwEfuHW7WyWyWauueRDAYQHNDfN', 119.197783, 25.209986);

SELECT EXISTS (SELECT * FROM nodes WHERE node_id = 'QmXwUgF48ULy6hkgfqrEwEfuHW7WyWyWauueRDAYQHNDfN');

SELECT * FROM nodes;


-- ===========inser many from an array===========

-- INSERT INTO nodes (longitude, latitude) SELECT * FROM unnest(array[1, 2, 3], array[11, 22, 33]);

-- INSERT INTO nodes (longitude, latitude) 
-- select (v ->> 'longitude')::real, 
--        (v ->> 'latitude')::real
-- from jsonb_array_elements('
-- [
--   {"longitude":4, "latitude":44 },
--   {"longitude":5, "latitude":55 },
--   {"longitude":6, "latitude":66 }
-- ]'::jsonb) as t(v);


CREATE TABLE txs (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    node_id VARCHAR NOT NULL REFERENCES nodes(node_id),
    tx_hash CHAR(66) NOT NULL CHECK (tx_hash LIKE '0x%' AND tx_hash ~ '^[0-9a-fx]{66}$'),
    unix_timestamp BIGINT NOT NULL CHECK (unix_timestamp >= 0)
);

INSERT INTO txs (node_id, tx_hash, unix_timestamp) VALUES ('QmXwUgF48ULy6hkgfqrEwEfuHW7WyWyWauueRDAYQHNDfN', '0x5f259938700501787fea17eece99a29a70f39af974b1b33f016ea5ad6e6e8978', 1629962594966);

-- ascending
SELECT * FROM txs WHERE tx_hash = '0xadb8fc5b142c5a8a87861c40baeb6148aafb898d90b8f01b9db1c5a37571c989' ORDER BY unix_timestamp;

-- descending
SELECT tx_hash, min_timestamp FROM (SELECT tx_hash, MIN(unix_timestamp) AS min_timestamp FROM txs GROUP BY tx_hash) t WHERE min_timestamp >= 1627032275667 AND min_timestamp < 1627113033163 ORDER BY min_timestamp DESC;

SELECT node_id, tx_hash, unix_timestamp FROM txs WHERE unix_timestamp >= 1627032275667 AND unix_timestamp < 1627032305667 ORDER BY unix_timestamp DESC;
