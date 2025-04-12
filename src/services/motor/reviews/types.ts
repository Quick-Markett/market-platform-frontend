import type { Review } from '@/types/models/review'

export interface GetReviewByIdPayload {
  reviewId: number
}

export interface CreateReviewPayload {
  payload: Pick<Review, 'comment' | 'order_id' | 'product_id' | 'rating'>
  token: string
}

export interface UpdateReviewByIdPayload extends GetReviewByIdPayload {
  token: string
}

export interface DeleteReviewByIdPayload extends GetReviewByIdPayload {
  token: string
}
