import { z } from 'zod'

const indexPaginationMeta = z.object({
  itemsPerPage: z.number(),
  totalItems: z.number().optional(),
  currentPage: z.number().optional(),
  totalPages: z.number().optional(),
  sortBy: z.array(z.tuple([z.string(), z.enum(['ASC', 'DESC'])])),
  searchBy: z.array(z.string()).optional(),
  search: z.string().optional(),
  select: z.array(z.string()).optional(),
  filter: z.record(z.union([z.string(), z.array(z.string())])).optional(),
  cursor: z.string().optional(),
  firstCursor: z.string().optional(),
  lastCursor: z.string().optional(),
})

const indexPaginationLinks = z.object({
  first: z.string().optional(),
  previous: z.string().optional(),
  next: z.string().optional(),
  last: z.string().optional(),
  current: z.string(),
})

export function withPagination<T extends z.ZodTypeAny>(
  paginationObjectSchema: T,
) {
  return z.object({
    data: z.array(paginationObjectSchema),
    meta: indexPaginationMeta,
    links: indexPaginationLinks,
  })
}
