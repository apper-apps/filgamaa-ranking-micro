import facultiesData from "@/services/mockData/faculties.json";

class FacultyService {
  constructor() {
    this.faculties = [...facultiesData];
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.faculties];
  }

  async getById(id) {
    await this.delay();
    const faculty = this.faculties.find(f => f.Id === id);
    if (!faculty) {
      throw new Error("Faculty not found");
    }
    return { ...faculty };
  }

  async getByUniversityId(universityId) {
    await this.delay();
    return this.faculties.filter(f => f.universityId === universityId);
  }

  async create(facultyData) {
    await this.delay();
    const newFaculty = {
      ...facultyData,
      Id: Math.max(...this.faculties.map(f => f.Id)) + 1,
      overallRating: 0,
      totalReviews: 0
    };
    this.faculties.push(newFaculty);
    return { ...newFaculty };
  }

  async update(id, updateData) {
    await this.delay();
    const index = this.faculties.findIndex(f => f.Id === id);
    if (index === -1) {
      throw new Error("Faculty not found");
    }
    this.faculties[index] = { ...this.faculties[index], ...updateData };
    return { ...this.faculties[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.faculties.findIndex(f => f.Id === id);
    if (index === -1) {
      throw new Error("Faculty not found");
    }
    this.faculties.splice(index, 1);
    return { success: true };
  }
}

export const facultyService = new FacultyService();