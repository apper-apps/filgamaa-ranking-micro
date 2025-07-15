import universitiesData from "@/services/mockData/universities.json";

class UniversityService {
  constructor() {
    this.universities = [...universitiesData];
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.universities];
  }

  async getById(id) {
    await this.delay();
    const university = this.universities.find(u => u.Id === id);
    if (!university) {
      throw new Error("University not found");
    }
    return { ...university };
  }

  async create(universityData) {
    await this.delay();
    const newUniversity = {
      ...universityData,
      Id: Math.max(...this.universities.map(u => u.Id)) + 1,
      overallRating: 0,
      totalReviews: 0
    };
    this.universities.push(newUniversity);
    return { ...newUniversity };
  }

  async update(id, updateData) {
    await this.delay();
    const index = this.universities.findIndex(u => u.Id === id);
    if (index === -1) {
      throw new Error("University not found");
    }
    this.universities[index] = { ...this.universities[index], ...updateData };
    return { ...this.universities[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.universities.findIndex(u => u.Id === id);
    if (index === -1) {
      throw new Error("University not found");
    }
    this.universities.splice(index, 1);
    return { success: true };
  }
}

export const universityService = new UniversityService();