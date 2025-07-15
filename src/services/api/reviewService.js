import { toast } from "react-toastify";

class ReviewService {
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
          { field: { Name: "target_id" } },
          { field: { Name: "target_type" } },
          { field: { Name: "author_type" } },
          { field: { Name: "author_id" } },
          { field: { Name: "rating" } },
          { field: { Name: "content" } },
          { field: { Name: "created_at" } },
          { field: { Name: "status" } },
          { field: { Name: "helpful_count" } }
        ]
      };

      const response = await this.apperClient.fetchRecords("review", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to fetch reviews");
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
          { field: { Name: "target_id" } },
          { field: { Name: "target_type" } },
          { field: { Name: "author_type" } },
          { field: { Name: "author_id" } },
          { field: { Name: "rating" } },
          { field: { Name: "content" } },
          { field: { Name: "created_at" } },
          { field: { Name: "status" } },
          { field: { Name: "helpful_count" } }
        ]
      };

      const response = await this.apperClient.getRecordById("review", id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching review with ID ${id}:`, error);
      toast.error("Failed to fetch review details");
      return null;
    }
  }

  async getByTarget(targetId, targetType) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "target_id" } },
          { field: { Name: "target_type" } },
          { field: { Name: "author_type" } },
          { field: { Name: "author_id" } },
          { field: { Name: "rating" } },
          { field: { Name: "content" } },
          { field: { Name: "created_at" } },
          { field: { Name: "status" } },
          { field: { Name: "helpful_count" } }
        ],
        where: [
          {
            FieldName: "target_id",
            Operator: "EqualTo",
            Values: [targetId.toString()]
          },
          {
            FieldName: "target_type",
            Operator: "EqualTo",
            Values: [targetType]
          }
        ]
      };

      const response = await this.apperClient.fetchRecords("review", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching reviews by target:", error);
      toast.error("Failed to fetch reviews");
      return [];
    }
  }

  async create(reviewData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [{
          Name: reviewData.Name || "Review",
          Tags: reviewData.Tags || "",
          Owner: reviewData.Owner,
          target_id: reviewData.target_id || reviewData.targetId?.toString(),
          target_type: reviewData.target_type || reviewData.targetType,
          author_type: reviewData.author_type || reviewData.authorType,
          author_id: reviewData.author_id || reviewData.authorId?.toString(),
          rating: reviewData.rating,
          content: reviewData.content,
          created_at: reviewData.created_at || reviewData.createdAt || new Date().toISOString(),
          status: reviewData.status || "pending",
          helpful_count: reviewData.helpful_count || reviewData.helpfulCount || 0
        }]
      };

      const response = await this.apperClient.createRecord("review", params);
      
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
        toast.success("Review created successfully");
        return successfulRecord?.data;
      }

      return null;
    } catch (error) {
      console.error("Error creating review:", error);
      toast.error("Failed to create review");
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
          target_id: updateData.target_id || updateData.targetId?.toString(),
          target_type: updateData.target_type || updateData.targetType,
          author_type: updateData.author_type || updateData.authorType,
          author_id: updateData.author_id || updateData.authorId?.toString(),
          rating: updateData.rating,
          content: updateData.content,
          created_at: updateData.created_at || updateData.createdAt,
          status: updateData.status,
          helpful_count: updateData.helpful_count || updateData.helpfulCount
        }]
      };

      const response = await this.apperClient.updateRecord("review", params);
      
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
        toast.success("Review updated successfully");
        return successfulRecord?.data;
      }

      return null;
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error("Failed to update review");
      return null;
    }
  }

  async delete(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        RecordIds: [id]
      };

      const response = await this.apperClient.deleteRecord("review", params);
      
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
        
        toast.success("Review deleted successfully");
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete review");
      return false;
    }
  }
}

export const reviewService = new ReviewService();