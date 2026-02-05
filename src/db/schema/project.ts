import { pgTable, serial, varchar, text, boolean, timestamp, integer, numeric } from 'drizzle-orm/pg-core';

export const project = pgTable('project', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 500 }),
  projectName: varchar('project_name', { length: 500 }),
  description: text('description'),
  projectStatus: varchar('project_status', { length: 100 }),
  developerName: varchar('developer_name', { length: 200 }),
  totalUnits: integer('total_units'),
  totalTowers: integer('total_towers'),
  city: varchar('city', { length: 100 }),
  district: varchar('district', { length: 100 }),
  streetAddress: varchar('street_address', { length: 500 }),
  mainImage: varchar('main_image', { length: 500 }),
  galleryImages: text('gallery_images'),
  isFeatured: boolean('is_featured').default(false),
  createdOn: timestamp('created_on'),
  projectArea: numeric('project_area'),
  utilities: text('utilities'),
  priceDescription: varchar('price_description', { length: 200 }),
  aactive: boolean('aactive').default(true),
  parentId: integer('parent_id'),
});

export type ProjectRow = typeof project.$inferSelect;
