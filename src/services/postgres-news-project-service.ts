/**
 * PostgreSQL News & Project Service
 * Fetches news articles and projects from PostgreSQL database using Drizzle ORM
 */
import { db } from "@/db";
import { news, project, type NewsRow, type ProjectRow } from "@/db/schema";
import { eq, and, ne, desc, inArray, isNull, isNotNull, sql } from "drizzle-orm";
import type { NewsArticle, Project } from "@/types/property";
import { generateSlug } from "@/utils/format";

// Base URL for uploaded images
const UPLOADS_BASE_URL = "https://quanly.tongkhobds.com";

// News folder IDs for website articles (based on actual content analysis)
// 26: quy-hoach-phap-ly, 27: noi-ngoai-that, 37: phong-thuy-nha-o
const NEWS_FOLDERS = [26, 27, 37];

/**
 * Get news article by slug
 */
export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  const result = await db
    .select()
    .from(news)
    .where(
      and(
        eq(news.aactive, true),
        inArray(news.folder, NEWS_FOLDERS),
        isNotNull(news.avatar),
        ne(news.avatar, '')
      )
    )
    .orderBy(sql`${news.publishOn} DESC NULLS LAST`);

  // Find article by generated slug
  const matchingRow = result.find(
    (row) => generateSlug(row.name || '') === slug
  );

  if (!matchingRow) {
    return null;
  }

  return mapToNewsArticle(matchingRow);
}

/**
 * Get latest news articles
 */
export async function getLatestNews(limit: number = 8): Promise<NewsArticle[]> {
  const result = await db
    .select()
    .from(news)
    .where(
      and(
        eq(news.aactive, true),
        inArray(news.folder, NEWS_FOLDERS),
        isNotNull(news.avatar),
        ne(news.avatar, '')
      )
    )
    .orderBy(sql`${news.publishOn} DESC NULLS LAST`, desc(news.id))
    .limit(limit);

  return result.map((row) => mapToNewsArticle(row));
}

/**
 * Get featured projects
 */
export async function getFeaturedProjects(limit: number = 5): Promise<Project[]> {
  // Try featured first
  let result = await db
    .select()
    .from(project)
    .where(
      and(
        eq(project.aactive, true),
        eq(project.isFeatured, true),
        isNull(project.parentId)
      )
    )
    .orderBy(desc(project.createdOn))
    .limit(limit);

  // Fallback to any active projects if no featured
  if (result.length === 0) {
    result = await db
      .select()
      .from(project)
      .where(
        and(
          eq(project.aactive, true),
          isNull(project.parentId)
        )
      )
      .orderBy(desc(project.createdOn))
      .limit(limit);
  }

  return result.map((row) => mapToProject(row));
}

/**
 * Map database row to NewsArticle interface
 */
function mapToNewsArticle(row: NewsRow): NewsArticle {
  // Generate slug from name
  const slug = generateSlug(row.name || '');

  // Map folder to category based on actual DB folder structure
  const categoryMap: Record<number, NewsArticle["category"]> = {
    26: "policy",        // quy-hoach-phap-ly (planning & legal)
    27: "tips",          // noi-ngoai-that (interior/exterior design)
    37: "tips",          // phong-thuy-nha-o (feng shui)
  };
  const category = categoryMap[row.folder || 0] || "tips";

  return {
    id: String(row.id),
    title: row.name || "",
    slug,
    excerpt: row.description?.slice(0, 200) || "",
    content: row.htmlcontent || row.description || "",
    thumbnail: getFullImageUrl(row.avatar),
    category,
    author: "TongkhoBDS",
    publishedAt: row.publishOn?.toISOString() || new Date().toISOString(),
    views: Math.floor(Math.random() * 5000) + 500, // Placeholder, DB doesn't have views
  };
}

/**
 * Map database row to Project interface
 */
function mapToProject(row: ProjectRow): Project {
  // Parse gallery images
  let images: string[] = [];
  try {
    const rawImages = JSON.parse(row.galleryImages || "[]") as string[];
    images = rawImages.map((img) => getFullImageUrl(img));
  } catch {
    images = [];
  }

  // Add main image to front if exists
  const mainImage = getFullImageUrl(row.mainImage);
  if (mainImage && !images.includes(mainImage)) {
    images.unshift(mainImage);
  }

  // Ensure at least 2 images for carousel
  if (images.length < 2 && mainImage) {
    images = [mainImage, mainImage];
  }

  // Map project status
  const statusMap: Record<string, Project["status"]> = {
    "Đang mở bán": "selling",
    "Sắp mở bán": "upcoming",
    "Đã bán hết": "sold_out",
    "Hoàn thành": "completed",
  };
  const status = statusMap[row.projectStatus || ""] || "selling";

  // Format area - projectArea is numeric type from DB
  const projectAreaNum = row.projectArea ? Number(row.projectArea) : 0;
  const areaInHa = projectAreaNum
    ? projectAreaNum >= 10000
      ? `${(projectAreaNum / 10000).toFixed(1)} ha`
      : `${projectAreaNum.toLocaleString()} m²`
    : "N/A";

  // Parse amenities from utilities
  const amenities = row.utilities
    ? row.utilities.split(",").map((s) => s.trim())
    : [];

  return {
    id: String(row.id),
    name: row.projectName || "",
    slug: row.slug || generateSlug(row.projectName || ""),
    developer: row.developerName || "N/A",
    location: `${row.streetAddress || ""}, ${row.district || ""}`.trim().replace(/^,\s*/, ""),
    city: row.city || "",
    status,
    totalUnits: row.totalUnits || 0,
    priceRange: row.priceDescription || "Liên hệ",
    area: areaInHa,
    description: row.description || "",
    images,
    thumbnail: mainImage || images[0] || "",
    amenities,
    completionDate: undefined,
    towers: row.totalTowers || undefined,
    isFeatured: row.isFeatured || false,
  };
}

/**
 * Get full image URL from relative path
 */
function getFullImageUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  // Handle news avatar format (e.g., "news.avatar.xxx.jpg")
  if (path.startsWith("news.")) {
    return `${UPLOADS_BASE_URL}/tongkho/static/uploads/news/${path}`;
  }
  // Handle regular uploads
  if (path.startsWith("uploads/") || path.startsWith("/uploads/")) {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${UPLOADS_BASE_URL}${cleanPath}`;
  }
  return `${UPLOADS_BASE_URL}/${path}`;
}
