-- ============================================================================
-- Smiths Detection E-commerce Platform - SQL Database Schema
-- Integrates SAP data structures (KNA1, KNB1, KNVV, MARA, MARD, MAST, STKO, STPO)
-- ============================================================================

-- Create Database
CREATE DATABASE IF NOT EXISTS smiths_ecommerce;
USE smiths_ecommerce;

-- ============================================================================
-- CUSTOMERS TABLE
-- Combines SAP KNA1 (General), KNB1 (Detailed), and KNVV (Sales) customer data
-- ============================================================================
CREATE TABLE customers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_id VARCHAR(50) UNIQUE NOT NULL,
    
    -- KNA1 - General Customer Data
    name1 VARCHAR(255),
    name2 VARCHAR(255),
    name3 VARCHAR(255),
    name4 VARCHAR(255),
    city VARCHAR(100),
    post_code VARCHAR(20),
    region VARCHAR(50),
    country VARCHAR(3),
    street VARCHAR(255),
    telephone1 VARCHAR(30),
    telephone2 VARCHAR(30),
    fax_number VARCHAR(30),
    email VARCHAR(255),
    district VARCHAR(50),
    po_box VARCHAR(20),
    po_box_post_code VARCHAR(20),
    language VARCHAR(2),
    tax_number1 VARCHAR(50),
    tax_number2 VARCHAR(50),
    vat_reg_no VARCHAR(50),
    industry_code1 VARCHAR(10),
    industry_code2 VARCHAR(10),
    industry_code3 VARCHAR(10),
    industry_code4 VARCHAR(10),
    industry_code5 VARCHAR(10),
    search_term VARCHAR(100),
    title VARCHAR(50),
    transport_zone VARCHAR(10),
    sales_in_currency DECIMAL(15,2),
    annual_sales DECIMAL(15,2),
    natural_person BOOLEAN,
    
    -- KNB1 - Detailed Customer Data
    company_code VARCHAR(10),
    reconciliation_account VARCHAR(20),
    sort_key VARCHAR(10),
    clerk_abbreviation VARCHAR(10),
    payment_methods VARCHAR(50),
    payment_terms VARCHAR(10),
    accounting_clerk VARCHAR(10),
    planning_group VARCHAR(10),
    tolerance_group VARCHAR(10),
    house_bank VARCHAR(10),
    interest_indicator VARCHAR(10),
    last_key_date DATE,
    interest_calculation_frequency VARCHAR(10),
    last_interest_run DATE,
    payment_history VARCHAR(50),
    buying_group VARCHAR(10),
    previous_account_number VARCHAR(20),
    personnel_number VARCHAR(20),
    deletion_flag BOOLEAN,
    block_indicator VARCHAR(10),
    
    -- KNVV - Customer Sales Data
    sales_organization VARCHAR(10),
    distribution_channel VARCHAR(10),
    division VARCHAR(10),
    customer_group VARCHAR(10),
    sales_district VARCHAR(10),
    price_group VARCHAR(10),
    price_list_type VARCHAR(10),
    order_probability VARCHAR(10),
    incoterms1 VARCHAR(10),
    incoterms2 VARCHAR(100),
    delivery_priority VARCHAR(10),
    shipping_conditions VARCHAR(10),
    billing_block VARCHAR(10),
    order_block VARCHAR(10),
    delivery_block VARCHAR(10),
    invoice_schedule VARCHAR(10),
    sales_payment_terms VARCHAR(10),
    account_assignment_group VARCHAR(10),
    customer_group1 VARCHAR(10),
    customer_group2 VARCHAR(10),
    customer_group3 VARCHAR(10),
    customer_group4 VARCHAR(10),
    customer_group5 VARCHAR(10),
    currency VARCHAR(5),
    rebate_relevant BOOLEAN,
    exchange_rate_type VARCHAR(10),
    
    -- E-commerce specific fields
    company VARCHAR(255),
    phone VARCHAR(30),
    address TEXT,
    registered_date DATETIME,
    last_login_date DATETIME,
    account_status VARCHAR(20) DEFAULT 'active',
    email_verified BOOLEAN DEFAULT FALSE,
    newsletter_subscription BOOLEAN DEFAULT FALSE,
    notifications_enabled BOOLEAN DEFAULT TRUE,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_customer_id (customer_id),
    INDEX idx_email (email),
    INDEX idx_name1 (name1),
    INDEX idx_sales_org (sales_organization),
    INDEX idx_account_status (account_status)
);

-- ============================================================================
-- PRODUCTS TABLE
-- Combines SAP MARA (General Material) and MARD (Storage Location) data
-- ============================================================================
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(50) UNIQUE NOT NULL,
    
    -- MARA - General Material Data
    material_number VARCHAR(50) UNIQUE,
    material_type VARCHAR(10),
    industry VARCHAR(10),
    material_group VARCHAR(20),
    base_unit_of_measure VARCHAR(10),
    gross_weight DECIMAL(15,3),
    net_weight DECIMAL(15,3),
    weight_unit VARCHAR(10),
    division VARCHAR(10),
    transportation_group VARCHAR(10),
    low_level_code VARCHAR(10),
    external_material_group VARCHAR(20),
    material_category VARCHAR(10),
    cross_plant_material_status VARCHAR(10),
    valid_from DATE,
    season_year VARCHAR(10),
    tax_classification VARCHAR(10),
    material_created_on DATE,
    material_created_by VARCHAR(50),
    material_last_changed DATE,
    material_changed_by VARCHAR(50),
    
    -- E-commerce specific fields
    name VARCHAR(255) NOT NULL,
    description TEXT,
    product_type VARCHAR(20),
    price DECIMAL(15,2),
    currency VARCHAR(5) DEFAULT 'USD',
    requires_quote BOOLEAN DEFAULT FALSE,
    detection_mode VARCHAR(50),
    certification VARCHAR(20),
    has_printer BOOLEAN DEFAULT FALSE,
    in_stock BOOLEAN DEFAULT TRUE,
    stock_quantity INT DEFAULT 0,
    category VARCHAR(50),
    featured BOOLEAN DEFAULT FALSE,
    rating DECIMAL(3,2),
    review_count INT DEFAULT 0,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_product_id (product_id),
    INDEX idx_material_number (material_number),
    INDEX idx_product_type (product_type),
    INDEX idx_category (category),
    INDEX idx_detection_mode (detection_mode),
    INDEX idx_certification (certification)
);

-- ============================================================================
-- PRODUCT STORAGE LOCATIONS TABLE
-- SAP MARD - Storage Location Data for Materials
-- ============================================================================
CREATE TABLE product_storage_locations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(50) NOT NULL,
    material_number VARCHAR(50),
    plant VARCHAR(10),
    storage_location VARCHAR(10),
    maintenance_status VARCHAR(10),
    fiscal_year VARCHAR(4),
    current_period VARCHAR(3),
    physical_inventory_block BOOLEAN DEFAULT FALSE,
    unrestricted_stock DECIMAL(15,3),
    stock_in_transfer DECIMAL(15,3),
    quality_inspection_stock DECIMAL(15,3),
    restricted_use_stock DECIMAL(15,3),
    blocked_stock DECIMAL(15,3),
    returns_stock DECIMAL(15,3),
    consignment_stock DECIMAL(15,3),
    reorder_point DECIMAL(15,3),
    replenishment_quantity DECIMAL(15,3),
    country_of_origin VARCHAR(3),
    storage_bin VARCHAR(20),
    profit_center VARCHAR(10),
    inventory_correction_factor DECIMAL(5,2),
    last_count_date DATE,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    INDEX idx_material_number (material_number),
    INDEX idx_plant (plant),
    INDEX idx_storage_location (storage_location)
);

-- ============================================================================
-- BOMS TABLE (Bill of Materials Header)
-- Combines SAP MAST (Material to BOM) and STKO (BOM Header)
-- ============================================================================
CREATE TABLE boms (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    bom_id VARCHAR(50) UNIQUE NOT NULL,
    
    -- MAST - Material to BOM Link
    material_number VARCHAR(50),
    plant VARCHAR(10),
    bom_usage VARCHAR(10),
    alternative_bom VARCHAR(10),
    from_lot_size DECIMAL(15,3),
    to_lot_size DECIMAL(15,3),
    base_unit_of_measure VARCHAR(10),
    configuration_material BOOLEAN DEFAULT FALSE,
    
    -- STKO - BOM Header/Meta Data
    bom_category VARCHAR(10),
    bom_number VARCHAR(50),
    bom_counter VARCHAR(10),
    valid_from DATE,
    technical_status_from DATE,
    change_number VARCHAR(50),
    base_quantity DECIMAL(15,3),
    bom_base_unit VARCHAR(10),
    bom_status VARCHAR(10),
    valid_to DATE,
    lot_size VARCHAR(10),
    creation_plant VARCHAR(10),
    
    bom_created_on DATE,
    bom_created_by VARCHAR(50),
    bom_changed_on DATE,
    bom_changed_by VARCHAR(50),
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_bom_id (bom_id),
    INDEX idx_material_number (material_number),
    INDEX idx_bom_number (bom_number)
);

-- ============================================================================
-- BOM ITEMS TABLE
-- SAP STPO - Items/Components in a BOM
-- ============================================================================
CREATE TABLE bom_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    bom_id VARCHAR(50) NOT NULL,
    item_counter VARCHAR(10),
    valid_from DATE,
    technical_status_from DATE,
    change_number VARCHAR(50),
    component_material VARCHAR(50),
    plant VARCHAR(10),
    item_category VARCHAR(10),
    quantity DECIMAL(15,3),
    unit_of_measure VARCHAR(10),
    purchasing_group VARCHAR(10),
    price DECIMAL(15,2),
    currency VARCHAR(5),
    material_group VARCHAR(20),
    valid_to DATE,
    
    item_created_on DATE,
    item_created_by VARCHAR(50),
    item_changed_on DATE,
    item_changed_by VARCHAR(50),
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (bom_id) REFERENCES boms(bom_id) ON DELETE CASCADE,
    INDEX idx_bom_id (bom_id),
    INDEX idx_component_material (component_material)
);

-- ============================================================================
-- QUOTES TABLE
-- ============================================================================
CREATE TABLE quotes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    quote_id VARCHAR(50) UNIQUE NOT NULL,
    customer_id VARCHAR(50) NOT NULL,
    product_id VARCHAR(50) NOT NULL,
    
    -- Customer snapshot data
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    customer_company VARCHAR(255),
    customer_phone VARCHAR(30),
    customer_address TEXT,
    
    -- Product snapshot data
    product_name VARCHAR(255),
    product_description TEXT,
    base_price DECIMAL(15,2),
    detection_mode VARCHAR(50),
    certification VARCHAR(20),
    
    -- Quote details
    quantity INT NOT NULL,
    notes TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    discount_percentage DECIMAL(5,2) DEFAULT 0,
    final_price DECIMAL(15,2),
    approver_notes TEXT,
    suggested_product_id VARCHAR(50),
    approved_by VARCHAR(50),
    approved_at DATETIME,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    INDEX idx_quote_id (quote_id),
    INDEX idx_customer_id (customer_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- ============================================================================
-- ORDERS TABLE
-- ============================================================================
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50) UNIQUE NOT NULL,
    customer_id VARCHAR(50) NOT NULL,
    
    -- Customer snapshot data
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    customer_company VARCHAR(255),
    customer_phone VARCHAR(30),
    customer_address TEXT,
    
    -- Order details
    total_amount DECIMAL(15,2),
    currency VARCHAR(5) DEFAULT 'USD',
    status VARCHAR(20) DEFAULT 'pending',
    payment_status VARCHAR(20) DEFAULT 'pending',
    payment_method VARCHAR(50),
    delivery_address TEXT,
    estimated_delivery DATE,
    actual_delivery DATE,
    tracking_number VARCHAR(100),
    
    -- SAP Integration Data
    sap_customer_code VARCHAR(50),
    sap_sales_organization VARCHAR(10),
    sap_distribution_channel VARCHAR(10),
    sap_division VARCHAR(10),
    sap_order_date DATE,
    sap_requested_delivery_date DATE,
    sap_payment_terms VARCHAR(10),
    sap_incoterms1 VARCHAR(10),
    sap_incoterms2 VARCHAR(100),
    sap_shipping_point VARCHAR(10),
    sap_plant VARCHAR(10),
    sap_storage_location VARCHAR(10),
    sap_sales_office VARCHAR(10),
    sap_sales_group VARCHAR(10),
    sap_order_reason VARCHAR(10),
    sap_pricing_date DATE,
    sap_exchange_rate DECIMAL(10,5),
    sap_document_currency VARCHAR(5),
    sap_company_code VARCHAR(10),
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    INDEX idx_order_id (order_id),
    INDEX idx_customer_id (customer_id),
    INDEX idx_status (status),
    INDEX idx_sap_customer_code (sap_customer_code),
    INDEX idx_created_at (created_at)
);

-- ============================================================================
-- ORDER ITEMS TABLE
-- ============================================================================
CREATE TABLE order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    product_id VARCHAR(50) NOT NULL,
    material_number VARCHAR(50),
    product_name VARCHAR(255),
    quantity INT NOT NULL,
    unit_price DECIMAL(15,2),
    total_price DECIMAL(15,2),
    detection_mode VARCHAR(50),
    certification VARCHAR(20),
    
    -- SAP Integration Data
    sap_item_number VARCHAR(10),
    sap_unit_of_measure VARCHAR(10),
    sap_plant VARCHAR(10),
    sap_storage_location VARCHAR(10),
    sap_item_category VARCHAR(10),
    sap_net_price DECIMAL(15,2),
    sap_tax_amount DECIMAL(15,2),
    sap_total_amount DECIMAL(15,2),
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    INDEX idx_order_id (order_id),
    INDEX idx_product_id (product_id),
    INDEX idx_material_number (material_number)
);

-- ============================================================================
-- INVENTORY TRANSACTIONS TABLE
-- ============================================================================
CREATE TABLE inventory_transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    transaction_id VARCHAR(50) UNIQUE NOT NULL,
    transaction_type VARCHAR(50) NOT NULL,
    material_number VARCHAR(50),
    plant VARCHAR(10),
    storage_location VARCHAR(10),
    quantity DECIMAL(15,3),
    unit_of_measure VARCHAR(10),
    movement_type VARCHAR(10),
    document_number VARCHAR(50),
    document_date DATE,
    posting_date DATE,
    reference_document VARCHAR(50),
    reason TEXT,
    cost_center VARCHAR(10),
    profit_center VARCHAR(10),
    created_by VARCHAR(50),
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_transaction_id (transaction_id),
    INDEX idx_material_number (material_number),
    INDEX idx_plant (plant),
    INDEX idx_storage_location (storage_location),
    INDEX idx_posting_date (posting_date)
);

-- ============================================================================
-- CHATBOT CONVERSATIONS TABLE
-- ============================================================================
CREATE TABLE chatbot_conversations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    conversation_id VARCHAR(50) UNIQUE NOT NULL,
    customer_id VARCHAR(50),
    status VARCHAR(20) DEFAULT 'active',
    context_current_product VARCHAR(50),
    context_price_min DECIMAL(15,2),
    context_price_max DECIMAL(15,2),
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_conversation_id (conversation_id),
    INDEX idx_customer_id (customer_id),
    INDEX idx_status (status)
);

-- ============================================================================
-- CHATBOT MESSAGES TABLE
-- ============================================================================
CREATE TABLE chatbot_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    conversation_id VARCHAR(50) NOT NULL,
    role VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (conversation_id) REFERENCES chatbot_conversations(conversation_id) ON DELETE CASCADE,
    INDEX idx_conversation_id (conversation_id),
    INDEX idx_timestamp (timestamp)
);

-- ============================================================================
-- CHATBOT INTERESTED CATEGORIES TABLE
-- ============================================================================
CREATE TABLE chatbot_interested_categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    conversation_id VARCHAR(50) NOT NULL,
    category VARCHAR(100),
    
    FOREIGN KEY (conversation_id) REFERENCES chatbot_conversations(conversation_id) ON DELETE CASCADE,
    INDEX idx_conversation_id (conversation_id)
);

-- ============================================================================
-- PRODUCT IMAGES TABLE
-- ============================================================================
CREATE TABLE product_images (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(50) NOT NULL,
    image_url VARCHAR(500),
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    INDEX idx_product_id (product_id)
);

-- ============================================================================
-- PRODUCT TAGS TABLE
-- ============================================================================
CREATE TABLE product_tags (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(50) NOT NULL,
    tag VARCHAR(100),
    
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    INDEX idx_product_id (product_id),
    INDEX idx_tag (tag)
);

-- ============================================================================
-- PRODUCT SPECIFICATIONS TABLE
-- ============================================================================
CREATE TABLE product_specifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(50) NOT NULL,
    spec_key VARCHAR(100),
    spec_value TEXT,
    
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    INDEX idx_product_id (product_id)
);

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
