import { toast } from "react-toastify";

class UniversityService {
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
          { field: { Name: "location" } },
          { field: { Name: "contact_info" } },
          { field: { Name: "social_media" } },
          { field: { Name: "year_established" } },
          { field: { Name: "accreditation_status" } },
          { field: { Name: "verification_status" } },
          { field: { Name: "overall_rating" } },
          { field: { Name: "total_reviews" } },
          { field: { Name: "faculty_count" } }
        ]
      };

      const response = await this.apperClient.fetchRecords("university", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching universities:", error);
      toast.error("Failed to fetch universities");
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
          { field: { Name: "location" } },
          { field: { Name: "contact_info" } },
          { field: { Name: "social_media" } },
          { field: { Name: "year_established" } },
          { field: { Name: "accreditation_status" } },
          { field: { Name: "verification_status" } },
          { field: { Name: "overall_rating" } },
          { field: { Name: "total_reviews" } },
          { field: { Name: "faculty_count" } }
        ]
      };

      const response = await this.apperClient.getRecordById("university", id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching university with ID ${id}:`, error);
      toast.error("Failed to fetch university details");
      return null;
    }
  }

  async create(universityData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [{
          Name: universityData.Name,
          Tags: universityData.Tags,
          Owner: universityData.Owner,
          name_ar: universityData.name_ar,
          images: universityData.images,
          description: universityData.description,
          location: universityData.location,
          contact_info: universityData.contact_info,
          social_media: universityData.social_media,
          year_established: universityData.year_established,
          accreditation_status: universityData.accreditation_status,
          verification_status: universityData.verification_status,
          overall_rating: universityData.overall_rating || 0,
          total_reviews: universityData.total_reviews || 0,
          faculty_count: universityData.faculty_count || 0
        }]
      };

      const response = await this.apperClient.createRecord("university", params);
      
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
        toast.success("University created successfully");
        return successfulRecord?.data;
      }

      return null;
    } catch (error) {
      console.error("Error creating university:", error);
      toast.error("Failed to create university");
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
          location: updateData.location,
          contact_info: updateData.contact_info,
          social_media: updateData.social_media,
          year_established: updateData.year_established,
          accreditation_status: updateData.accreditation_status,
          verification_status: updateData.verification_status,
          overall_rating: updateData.overall_rating,
          total_reviews: updateData.total_reviews,
          faculty_count: updateData.faculty_count
        }]
      };

      const response = await this.apperClient.updateRecord("university", params);
      
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
        toast.success("University updated successfully");
        return successfulRecord?.data;
      }

      return null;
    } catch (error) {
      console.error("Error updating university:", error);
      toast.error("Failed to update university");
      return null;
    }
  }

  async delete(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        RecordIds: [id]
      };

      const response = await this.apperClient.deleteRecord("university", params);
      
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
        
        toast.success("University deleted successfully");
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error deleting university:", error);
      toast.error("Failed to delete university");
      return false;
    }
  }
}

export const universityService = new UniversityService();