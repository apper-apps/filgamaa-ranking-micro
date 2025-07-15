import reviewsData from "@/services/mockData/reviews.json";

class ReviewService {
  constructor() {
    this.reviews = [...reviewsData];
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.reviews];
  }

  async getById(id) {
    await this.delay();
    const review = this.reviews.find(r => r.Id === id);
    if (!review) {
      throw new Error("Review not found");
    }
    return { ...review };
  }

  async getByTarget(targetId, targetType) {
    await this.delay();
    return this.reviews.filter(r => r.targetId === targetId && r.targetType === targetType);
  }

  async create(reviewData) {
    await this.delay();
    const newReview = {
      ...reviewData,
      Id: Math.max(...this.reviews.map(r => r.Id)) + 1,
      createdAt: new Date().toISOString(),
      status: "pending",
      helpfulCount: 0
    };
    this.reviews.push(newReview);
    return { ...newReview };
  }

  async update(id, updateData) {
    await this.delay();
    const index = this.reviews.findIndex(r => r.Id === id);
    if (index === -1) {
      throw new Error("Review not found");
    }
    this.reviews[index] = { ...this.reviews[index], ...updateData };
    return { ...this.reviews[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.reviews.findIndex(r => r.Id === id);
    if (index === -1) {
      throw new Error("Review not found");
    }
    this.reviews.splice(index, 1);
    return { success: true };
  }
}

export const reviewService = new ReviewService();