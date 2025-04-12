import type { Review } from '@/types/models/review'

export interface GetReviewByIdPayload {
  reviewId: number
}

export interface CreateReviewPayload {
  payload: Pick<Review, 'comment' | 'order_id' | 'product_id' | 'rating'>
}

export interface UpdateReviewByIdPayload extends GetReviewByIdPayload {}

export interface DeleteReviewByIdPayload extends GetReviewByIdPayload {}
