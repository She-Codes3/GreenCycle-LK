-- Demo data only — not applied via Flyway. See database/README.md.
-- Assumes a disposal_centers table: id, name, address, latitude, longitude, accepted_category.

INSERT INTO disposal_centers (name, address, latitude, longitude, accepted_category) VALUES
    ('Colombo Central Recycling Center', '123 Galle Road, Colombo 03', 6.9147, 79.8489, 'plastic'),
    ('Kandy Eco Collection Point', '45 Peradeniya Road, Kandy', 7.2906, 80.6337, 'paper'),
    ('Galle Green Hub', '78 Matara Road, Galle', 6.0535, 80.2210, 'glass'),
    ('Negombo E-Waste Depot', '12 Lewis Place, Negombo', 7.2083, 79.8358, 'e-waste'),
    ('Jaffna Organic Composting Site', '9 Hospital Road, Jaffna', 9.6615, 80.0255, 'organic');
