-- Demo data only — not applied via Flyway. See database/README.md.
-- Assumes a waste_categories table: id, name, description.

INSERT INTO waste_categories (name, description) VALUES
    ('plastic', 'Bottles, containers, and other plastic packaging'),
    ('paper', 'Newspaper, cardboard, and office paper'),
    ('glass', 'Bottles and jars'),
    ('metal', 'Cans and scrap metal'),
    ('organic', 'Food waste and garden trimmings'),
    ('e-waste', 'Electronics and batteries'),
    ('hazardous', 'Chemicals, paint, and other hazardous material'),
    ('other', 'Anything that does not fit the categories above');
