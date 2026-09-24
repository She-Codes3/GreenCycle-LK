-- ====================================================================
-- Flyway Migration: V2__seed_core_reference_data.sql
-- Seed Core Reference Data (Roles, Waste Categories, Initial Municipalities & Zones)
-- ====================================================================

-- 1. Roles
INSERT INTO roles (name, description) VALUES
    ('RESIDENT', 'Default role for Sri Lankan residents managing household waste and recycling'),
    ('COLLECTOR', 'Waste collection truck drivers and sanitation crew staff'),
    ('MUNICIPAL', 'Municipal council officers managing zone operations and resolving complaints'),
    ('ADMIN', 'Super administrator with platform-wide oversight and management')
ON CONFLICT (name) DO NOTHING;

-- 2. Waste Categories
INSERT INTO waste_categories (name, code, description, color, icon) VALUES
    ('Organic Waste', 'ORGANIC', 'Food scraps, kitchen waste, garden trimmings, compostable bio-waste', '#22C55E', 'leaf'),
    ('Plastic & Polythene', 'PLASTIC', 'PET bottles, packaging film, HDPE containers, hard plastics', '#3B82F6', 'package'),
    ('Paper & Cardboard', 'PAPER', 'Newspapers, cartons, books, cardboard boxes, office paper', '#EAB308', 'file-text'),
    ('Glass', 'GLASS', 'Bottles, jars, broken glass glassware (rinsed and sorted)', '#06B6D4', 'wine'),
    ('Metal & Cans', 'METAL', 'Beverage cans, tin boxes, iron scrap, aluminium foils', '#64748B', 'shield'),
    ('Electronic Waste', 'E_WASTE', 'Batteries, broken appliances, circuit boards, cables, gadgets', '#8B5CF6', 'cpu'),
    ('Hazardous Waste', 'HAZARDOUS', 'Chemicals, paints, medical waste, fluorescent bulbs, pesticides', '#EF4444', 'alert-triangle'),
    ('Bulky Waste', 'BULKY', 'Furniture, mattresses, construction debris, oversized tree trunks', '#F97316', 'truck')
ON CONFLICT (code) DO NOTHING;

-- 3. Initial Municipalities
INSERT INTO municipalities (name, code, province, district, contact_officer, phone, email, status, description) VALUES
    ('Colombo Municipal Council', 'CMC', 'Western', 'Colombo', 'Eng. Ruwan Jayawardena', '+94 11 268 4200', 'solidwaste@cmc.lk', 'ACTIVE', 'Sri Lanka largest municipal authority servicing central Colombo'),
    ('Dehiwala-Mount Lavinia Municipal Council', 'DMMC', 'Western', 'Colombo', 'Mr. Samantha Perera', '+94 11 271 2281', 'info@dmmc.lk', 'ACTIVE', 'Covering coastal residential zones south of Colombo'),
    ('Kaduwela Municipal Council', 'KMC', 'Western', 'Colombo', 'Mrs. Nirosha Fernando', '+94 11 253 6211', 'waste@kaduwela.mc.gov.lk', 'ACTIVE', 'Covering suburban Battaramulla, Malabe, and Athurugiriya')
ON CONFLICT (code) DO NOTHING;

-- 4. Initial Collection Zones
INSERT INTO collection_zones (name, code, municipality_id, description, ward_number, coverage_area) VALUES
    ('Fort & Pettah Commercial Zone', 'CMC-Z01', 1, 'Commercial business and trade hub', 'Ward 01-03', 'Colombo 01 & Colombo 11'),
    ('Cinnamon Gardens & Colpetty', 'CMC-Z02', 1, 'Residential and diplomatic enclave', 'Ward 07-09', 'Colombo 03 & Colombo 07'),
    ('Bambalapitiya & Wellawatte', 'CMC-Z03', 1, 'High-density coastal residential corridor', 'Ward 12-14', 'Colombo 04 & Colombo 06'),
    ('Dehiwala Coastal Zone', 'DMMC-Z01', 2, 'Main Galle Road residential sector', 'Ward 02', 'Dehiwala North & South'),
    ('Battaramulla Administrative Zone', 'KMC-Z01', 3, 'Parliamentary administrative precinct', 'Ward 05', 'Battaramulla Central & Koswatta')
ON CONFLICT (code) DO NOTHING;
