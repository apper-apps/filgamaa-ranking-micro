import { toast } from "react-toastify";

class FacultyService {
  constructor() {
    this.apperClient = null;
    this.initializeClient();
  }

  initializeClient() {
    if (typeof window !== 'undefined' && window.ApperSDK) {
      const { ApperClient } = window.ApperSDK;
      this.apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
    }
  }

  async getAll() {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "name_ar" } },
          { field: { Name: "images" } },
          { field: { Name: "description" } },
          { field: { Name: "year_commenced" } },
          { field: { Name: "annual_fees_egp" } },
          { field: { Name: "location" } },
          { field: { Name: "programs" } },
          { field: { Name: "has_postgraduate" } },
          { field: { Name: "naqaaee_accreditation" } },
          { field: { Name: "acceptance_grades" } },
          { field: { Name: "overall_rating" } },
          { field: { Name: "total_reviews" } },
          { 
            field: { name: "university_id" },
            referenceField: { field: { Name: "Name" } }
          }
        ]
      };

      const response = await this.apperClient.fetchRecords("faculty", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching faculties:", error);
      toast.error("Failed to fetch faculties");
      return [];
    }
  }

  async getById(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "name_ar" } },
          { field: { Name: "images" } },
          { field: { Name: "description" } },
          { field: { Name: "year_commenced" } },
          { field: { Name: "annual_fees_egp" } },
          { field: { Name: "location" } },
          { field: { Name: "programs" } },
          { field: { Name: "has_postgraduate" } },
          { field: { Name: "naqaaee_accreditation" } },
          { field: { Name: "acceptance_grades" } },
          { field: { Name: "overall_rating" } },
          { field: { Name: "total_reviews" } },
          { 
            field: { name: "university_id" },
            referenceField: { field: { Name: "Name" } }
          }
        ]
      };

      const response = await this.apperClient.getRecordById("faculty", id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching faculty with ID ${id}:`, error);
      toast.error("Failed to fetch faculty details");
      return null;
    }
  }

  async getByUniversityId(universityId) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "name_ar" } },
          { field: { Name: "images" } },
          { field: { Name: "description" } },
          { field: { Name: "year_commenced" } },
          { field: { Name: "annual_fees_egp" } },
          { field: { Name: "location" } },
          { field: { Name: "programs" } },
          { field: { Name: "has_postgraduate" } },
          { field: { Name: "naqaaee_accreditation" } },
          { field: { Name: "acceptance_grades" } },
          { field: { Name: "overall_rating" } },
          { field: { Name: "total_reviews" } },
          { 
            field: { name: "university_id" },
            referenceField: { field: { Name: "Name" } }
          }
        ],
        where: [
          {
            FieldName: "university_id",
            Operator: "EqualTo",
            Values: [universityId]
          }
        ]
      };

      const response = await this.apperClient.fetchRecords("faculty", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching faculties by university:", error);
      toast.error("Failed to fetch faculties");
      return [];
    }
  }

  async create(facultyData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [{
          Name: facultyData.Name,
          Tags: facultyData.Tags,
          Owner: facultyData.Owner,
          name_ar: facultyData.name_ar,
          images: facultyData.images,
          description: facultyData.description,
          year_commenced: facultyData.year_commenced,
          annual_fees_egp: facultyData.annual_fees_egp,
          location: facultyData.location,
          programs: facultyData.programs,
          has_postgraduate: facultyData.has_postgraduate,
          naqaaee_accreditation: facultyData.naqaaee_accreditation,
          acceptance_grades: facultyData.acceptance_grades,
          overall_rating: facultyData.overall_rating || 0,
          total_reviews: facultyData.total_reviews || 0,
          university_id: facultyData.university_id
        }]
      };

      const response = await this.apperClient.createRecord("faculty", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return null;
        }
        
        const successfulRecord = response.results.find(result => result.success);
        toast.success("Faculty created successfully");
        return successfulRecord?.data;
      }

      return null;
    } catch (error) {
      console.error("Error creating faculty:", error);
      toast.error("Failed to create faculty");
      return null;
    }
  }

  async update(id, updateData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [{
          Id: id,
          Name: updateData.Name,
          Tags: updateData.Tags,
          Owner: updateData.Owner,
          name_ar: updateData.name_ar,
          images: updateData.images,
          description: updateData.description,
          year_commenced: updateData.year_commenced,
          annual_fees_egp: updateData.annual_fees_egp,
          location: updateData.location,
          programs: updateData.programs,
          has_postgraduate: updateData.has_postgraduate,
          naqaaee_accreditation: updateData.naqaaee_accreditation,
          acceptance_grades: updateData.acceptance_grades,
          overall_rating: updateData.overall_rating,
          total_reviews: updateData.total_reviews,
          university_id: updateData.university_id
        }]
      };

      const response = await this.apperClient.updateRecord("faculty", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to update ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return null;
        }
        
        const successfulRecord = response.results.find(result => result.success);
        toast.success("Faculty updated successfully");
        return successfulRecord?.data;
      }

      return null;
    } catch (error) {
      console.error("Error updating faculty:", error);
      toast.error("Failed to update faculty");
      return null;
    }
  }

  async delete(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        RecordIds: [id]
      };

      const response = await this.apperClient.deleteRecord("faculty", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to delete ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return false;
        }
        
        toast.success("Faculty deleted successfully");
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error deleting faculty:", error);
      toast.error("Failed to delete faculty");
      return false;
    }
  }
}

export const facultyService = new FacultyService();