-- ====================================================================
-- Flyway Migration: V301__seed_gamification_disposal_data.sql
-- Seed Initial Gamification Levels, Badges, and Disposal Centers
-- ====================================================================

-- 1. Levels
INSERT INTO levels (level_number, title, min_points, max_points, badge_icon, perks) VALUES
    (1, 'Eco Novice', 0, 99, 'seedling', 'Access to waste tracking and recycling guides'),
    (2, 'Green Contributor', 100, 249, 'sprout', 'Earn 5% bonus points on AI scans and bulk pickups'),
    (3, 'Recycling Pro', 250, 499, 'tree', 'Priority pickup scheduling and municipal partner discounts'),
    (4, 'Sustainability Champion', 500, 999, 'award', 'Free composting kit voucher and community leader status'),
    (5, 'Zero Waste Master', 1000, NULL, 'crown', 'VIP municipal events and maximum platform partner rewards')
ON CONFLICT (level_number) DO NOTHING;

-- 2. Badges
INSERT INTO badges (name, code, description, icon_url, points_threshold, category) VALUES
    ('First Scan', 'FIRST_SCAN', 'Completed your first AI waste scan with the scanner', 'camera', 10, 'SCANNER'),
    ('Diligent Sorter', 'DILIGENT_SORTER', 'Logged at least 5 household waste disposals correctly', 'check-circle', 50, 'RECYCLING'),
    ('Civic Guardian', 'CIVIC_GUARDIAN', 'Reported an environmental issue that was resolved by council', 'shield-check', 100, 'COMMUNITY'),
    ('Century Recycler', 'CENTURY_RECYCLER', 'Recycled over 100 kg of waste across all streams', 'weight', 200, 'MILESTONE'),
    ('Eco Warrior', 'ECO_WARRIOR', 'Maintained a 30-day recycling streak', 'flame', 300, 'STREAK')
ON CONFLICT (code) DO NOTHING;

-- 3. Disposal Centers (Matching Sri Lanka Colombo Metropolitan Centers)
INSERT INTO disposal_centers (name, code, type, address, city, district, area, ward_zone, corridor, latitude, longitude, phone, email, capacity_status, collection_available, drop_off_available, stream_group, rating, solar_powered, hero_image_url, status, municipality_id) VALUES
    ('Colombo Central Recycling & Recovery Hub', 'CEN-001', 'DROP_OFF', '45 Baseline Road, Orugodawatta', 'Colombo', 'Colombo', 'Orugodawatta', 'North Colombo Corridor', 'CMC Ward 01', 6.9412, 79.8821, '+94 11 268 4200', 'cmc.recycling@greencycle.lk', 'NORMAL', TRUE, TRUE, 'ALL', 4.8, TRUE, 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80', 'OPERATIONAL', 1),
    ('Kelaniya E-Waste & Hazardous Materials Depot', 'CEN-002', 'SPECIALIZED', '12 Waragoda Road', 'Kelaniya', 'Gampaha', 'Kelaniya South', 'Kandy Road Gateway', 'Kelaniya Pradeshiya 03', 6.9582, 79.9198, '+94 11 291 1845', 'kelaniya.ewaste@greencycle.lk', 'LOW', FALSE, TRUE, 'HAZARDOUS', 4.6, FALSE, 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1200&q=80', 'OPERATIONAL', NULL),
    ('Dehiwala Coastal Composting & Organics Facility', 'CEN-003', 'COMPOSTING', '88 Marine Drive', 'Dehiwala', 'Colombo', 'Dehiwala Beach', 'Galle Road Coastal Link', 'DMMC Ward 04', 6.8512, 79.8654, '+94 11 271 2281', 'dehiwala.green@greencycle.lk', 'NEAR_CAPACITY', TRUE, TRUE, 'ORGANIC', 4.4, TRUE, 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80', 'OPERATIONAL', 2),
    ('Kaduwela Bulk Waste Transfer Station', 'CEN-004', 'TRANSFER_STATION', '204 High Level Road', 'Kaduwela', 'Colombo', 'Battaramulla', 'Southern Expressway Hub', 'KMC Ward 08', 6.9271, 79.9832, '+94 11 253 6211', 'kaduwela.solidwaste@greencycle.lk', 'NORMAL', TRUE, FALSE, 'BULKY', 4.2, FALSE, 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=1200&q=80', 'OPERATIONAL', 3),
    ('Homagama Materials Recovery Facility', 'CEN-005', 'RECYCLING_PLANT', 'Katuwana Industrial Zone', 'Homagama', 'Colombo', 'Katuwana', 'Avissawella Arterial', 'Homagama PS 01', 6.8431, 80.0034, '+94 11 285 5555', 'homagama.mrf@greencycle.lk', 'NORMAL', TRUE, TRUE, 'RECYCLING', 4.9, TRUE, 'https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?auto=format&fit=crop&w=1200&q=80', 'OPERATIONAL', NULL)
ON CONFLICT (code) DO NOTHING;

-- 4. Center Opening Hours for CEN-001
INSERT INTO center_opening_hours (center_id, day_of_week, open_time, close_time, is_closed) VALUES
    (1, 'MONDAY', '07:30', '18:00', FALSE),
    (1, 'TUESDAY', '07:30', '18:00', FALSE),
    (1, 'WEDNESDAY', '07:30', '18:00', FALSE),
    (1, 'THURSDAY', '07:30', '18:00', FALSE),
    (1, 'FRIDAY', '07:30', '18:00', FALSE),
    (1, 'SATURDAY', '08:00', '16:00', FALSE),
    (1, 'SUNDAY', NULL, NULL, TRUE)
ON CONFLICT DO NOTHING;

-- 5. Center Accepted Wastes Mapping
INSERT INTO center_accepted_wastes (center_id, waste_category_id) VALUES
    (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), -- Colombo Hub accepts most streams
    (2, 6), (2, 7),                                 -- Kelaniya: E-waste & Hazardous
    (3, 1),                                         -- Dehiwala: Organic
    (4, 8),                                         -- Kaduwela: Bulky
    (5, 2), (5, 3), (5, 4), (5, 5)                  -- Homagama: Plastic, Paper, Glass, Metal
ON CONFLICT DO NOTHING;
