
import axios from "axios";
import apiClient from "~/config/apiClient";
import type {
  loginSchema,
  registerSchema,
  createUserSchema,
  committeeSchema,
  articleSchema,
  submitAttendanceSchema,
  createMeetingSchema,
  sendEmailSchema,
} from "~/utils/schemas";
import type z from "zod";
import type {
  Chat_history_Array,
  Committee,
  User,
  Article,
  Category,
  Subsection,
  Meeting,
  MeetingAttendance,
  ISponsorCard,
} from "~/types";
import type {
  ApiCategory,
  ApiEvent,
  CreateCategoryPayload,
  RenameCategoryPayload,
  UpdateCategoryDescPayload,
  CreateEventPayload,
  RenameEventPayload,
  UpdateEventKeywordsPayload,
  UpdateEventDatesPayload,
  ApiResponse,
} from "~/types/api.types";

//! That is repeated in all methods

//? export const someApi = async (...) => {
//?   try {
//?     const response = await apiClient.METHOD("/endpoint", data?);
//?     return response.data;
//?   } catch (error) {
//?     if (axios.isAxiosError(error)) {
//?       throw new Error(error.response?.data.message || "Fallback message");
//?     }
//?     throw new Error("An unexpected error occurred");
//?   }
//? };

// Helper to safely extract array data regardless of response structure (.NET $values, nested data, items, etc.)
export function extractArrayData<T>(data: any): T[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.data)) return data.data;
  if (Array.isArray(data.$values)) return data.$values;
  if (data.data && Array.isArray(data.data.$values)) return data.data.$values;
  if (Array.isArray(data.items)) return data.items;
  if (Array.isArray(data.results)) return data.results;
  if (Array.isArray(data.users)) return data.users;
  if (Array.isArray(data.members)) return data.members;
  return [];
}

export const registerApi = async <T = any>(
  data: z.infer<typeof registerSchema>,
): Promise<T> => {
  try {
    const response = await apiClient.post("/Account/Register", data);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          error.response?.data?.title ||
          "Registration failed",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const loginApi = async (data: z.infer<typeof loginSchema>) => {
  try {
    const response = await apiClient.post("/Account/Login", data);
    const res = response.data || {};
    const accessToken =
      res.accessToken || res.token || res.data?.accessToken || res.data?.token || "";
    const refreshToken =
      res.refreshToken || res.data?.refreshToken || "";
    const userId =
      res.user?.id || res.userId || res.data?.user?.id || res.data?.userId || 0;

    return {
      accessToken,
      refreshToken,
      user: { id: userId },
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          error.response?.data?.title ||
          "Login failed",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const refreshTokenApi = async (token: string) => {
  try {
    // Use a separate axios instance for refresh token to avoid interceptor loops
    const refreshClient = axios.create({
      baseURL: import.meta.env.DEV ? "/api" : "https://ieee.runasp.net/api",
      withCredentials: true,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await refreshClient.post("/Account/refresh", { token });
    const res = response.data || {};
    const accessToken =
      res.accessToken || res.token || res.data?.accessToken || res.data?.token || "";
    const refreshToken =
      res.refreshToken || res.data?.refreshToken || token;

    return { accessToken, refreshToken };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to refresh token",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const createUser = async <T = any>(
  data: z.infer<typeof createUserSchema>,
): Promise<T> => {
  try {
    const response = await apiClient.post("/Users", data);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          error.response?.data?.title ||
          "Failed to create user",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

// committees Api

export const getCommitteesApi = async (): Promise<Committee[]> => {
  try {
    const response = await apiClient.get("/Committees");
    return extractArrayData<Committee>(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch committees",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const createCommitteeApi = async <T = any>(
  data: z.infer<typeof committeeSchema>,
): Promise<T> => {
  try {
    const config =
      data instanceof FormData
        ? {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        : {};

    const response = await apiClient.post("/Committees", data, config);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to create committee",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const deleteCommitteeApi = async <T = any>(id: number): Promise<T> => {
  try {
    const response = await apiClient.delete(`/Committees/${id}`);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to delete committee",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

// will add a request generics letter
export const updateCommitteeApi = async <T = any>(
  id: number,
  data: z.infer<typeof committeeSchema>,
): Promise<T> => {
  try {
    const config =
      data instanceof FormData
        ? {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        : {};

    const response = await apiClient.put(`/Committees/${id}`, data, config);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to update committee",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getCommitteeByIdApi = async (id: number): Promise<Committee> => {
  try {
    const response = await apiClient.get(`/Committees/${id}`);
    return response.data as Committee;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to fetch committee by ID",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

// user Api
export const getUser = async (id: number): Promise<User> => {
  try {
    const response = await apiClient.get(`/Users/${id}`);
    return response.data as User;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Failed to fetch user");
    }
    throw new Error("An unexpected error occurred");
  }
};

// getAllUsers Api
export const getAllUsersApi = async (): Promise<User[]> => {
  try {
    const response = await apiClient.get("/Users");
    return extractArrayData<User>(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch all users",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

// delete user By Id

export const deleteUserByIdApi = async <T = any>(id: number): Promise<T> => {
  try {
    const response = await apiClient.delete(`/Users/${id}`);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to delete user");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const activateUserByIdApi = async <T = any>(id: number): Promise<T> => {
  try {
    const response = await apiClient.put(`/Admin/ActivateUser/${id}`);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to activate user",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

// Supports both activate (true) and deactivate (false)
export const setUserActivationApi = async <T = any>(
  id: number,
  isActive: boolean,
): Promise<T> => {
  try {
    const response = await apiClient.put(
      `/Admin/SetUserActivation/${id}?isActive=${isActive}`,
    );
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          `Failed to ${isActive ? "activate" : "deactivate"} user`,
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const updateUserById = async <T = any>(
  id: number,
  data: z.infer<typeof createUserSchema>,
): Promise<T> => {
  try {
    const response = await apiClient.put(`/Users/${id}`, data);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to update user");
    }
    throw new Error("An unexpected error occurred");
  }
};

//Article Apis
export const getAllArticlesApi = async (): Promise<Article[]> => {
  try {
    const response = await apiClient.get("/Articles");
    return extractArrayData<Article>(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to get Articles");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getArticleByIdApi = async (id: number): Promise<Article> => {
  try {
    const response = await apiClient.get(`/Articles/${id}`);
    return response.data as Article;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to get Article data",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const createArticle = async <T = any>(
  data: FormData | z.infer<typeof articleSchema>,
): Promise<T> => {
  try {
    const config =
      data instanceof FormData
        ? {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        : {};

    const response = await apiClient.post("/Articles", data, config);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to create Article",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const deleteArticleApi = async <T = any>(id: number): Promise<T> => {
  try {
    const response = await apiClient.delete(`/Articles/${id}`);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to delete Article",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const updateArticleApi = async <T = any>(
  id: number,
  data: FormData | z.infer<typeof articleSchema>,
): Promise<T> => {
  try {
    const config =
      data instanceof FormData
        ? {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        : {};

    const response = await apiClient.put(`/Articles/${id}`, data, config);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to update Article",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getArticleSubsectionByIdApi = async (
  id: number,
): Promise<Article> => {
  try {
    const response = await apiClient.get(`/Articles/${id}/show`);
    return response.data as Article;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to show Articles",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

// category APIs

export const getAllCategoryApi = async (): Promise<Category[]> => {
  try {
    const response = await apiClient.get("/Category");
    return extractArrayData<Category>(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to get Category");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const createCategory = async <T = any>(data: any): Promise<T> => {
  try {
    const response = await apiClient.post("/Category", data);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to create Category",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const deleteCategoryApi = async <T = any>(id: number): Promise<T> => {
  try {
    const response = await apiClient.delete(`/Category/${id}`);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to delete Category",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const updateCategoryApi = async <T = any>(
  id: number,
  data: any,
): Promise<T> => {
  try {
    const response = await apiClient.put(`/Category/${id}`, data);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to update Category",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

// subsecton Apis

export const getAllSubsectionsApi = async (): Promise<Subsection[]> => {
  try {
    const response = await apiClient.get("/Subsections");
    return extractArrayData<Subsection>(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to get Subsections",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const createSubsections = async <T = any>(data: any): Promise<T> => {
  try {
    const config =
      data instanceof FormData
        ? {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        : {};

    const response = await apiClient.post("/Subsections", data, config);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to create Subsections",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const deleteSubsectionsApi = async <T = any>(id: number): Promise<T> => {
  try {
    const response = await apiClient.delete(`/Subsections/${id}`);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to delete Subsections",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const updateSubsectionsApi = async <T = any>(
  id: number,
  data: any,
): Promise<T> => {
  try {
    const config =
      data instanceof FormData
        ? {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        : {};

    const response = await apiClient.put(`/Subsections/${id}`, data, config);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to update Subsections",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export type CreateMeetingPayload = z.infer<typeof createMeetingSchema>;

export const apiCreateMeeting = async <T = any>(
  data: CreateMeetingPayload,
): Promise<T> => {
  try {
    const response = await apiClient.post("/Meetings", data);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to create meeting",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

// Get all meetings
export const getAllMeetingsApi = async (): Promise<Meeting[]> => {
  try {
    const response = await apiClient.get("/Meetings");
    return extractArrayData<Meeting>(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch meetings",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

// Get meeting by ID
export const getMeetingByIdApi = async (id: number): Promise<Meeting> => {
  try {
    const response = await apiClient.get(`/Meetings/${id}`);
    return response.data as Meeting;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch meeting",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

// Delete meeting by ID
export const deleteMeetingApi = async <T = any>(id: number): Promise<T> => {
  try {
    const response = await apiClient.delete(`/Meetings/${id}`);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to delete meeting",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};


// Get meeting attendance
export const getMeetingAttendanceApi = async (
  meetingId: number,
): Promise<MeetingAttendance[]> => {
  try {
    const response = await apiClient.get(`/Meetings/attendents/${meetingId}`);
    return extractArrayData<MeetingAttendance>(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch meeting attendance",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export type SubmitAttendancePayload = z.infer<typeof submitAttendanceSchema>;

export const apiSubmitAttendance = async <T = any>(
  data: SubmitAttendancePayload,
): Promise<T> => {
  try {
    const response = await apiClient.post("/Meetings/attendent", data);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to submit attendance",
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

// Chatbot API
export const sendChatMessage = async (
  user_message: string,
  chatHistory: Chat_history_Array,
): Promise<string> => {
  try {
    const { Client } = await import("@gradio/client");
    const client = await Client.connect("amrhassank/IEEE_AI_ChatBot");
    const result = await client.predict("/chatbot_fn", {
      user_message: user_message,
      chat_history: chatHistory,
    });

    return (result.data as string[])[0] || "No response received";
  } catch (error) {
    console.error("Chatbot API error:", error);
    throw new Error("Failed to send message to chatbot");
  }
};

export const resetChat = async () => {
  try {
    const { Client } = await import("@gradio/client");
    const client = await Client.connect("amrhassank/IEEE_AI_ChatBot");
    const result = await client.predict("/reset_chat", {});

    return result;
  } catch (error) {
    console.error("Reset chat API error:", error);
    throw new Error("Failed to reset chat");
  }
};

// Email API
export const sendEmailApi = async <T = any>(
  data: z.infer<typeof sendEmailSchema>,
): Promise<T> => {
  try {
    const response = await apiClient.post("/Emails/send", data);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to send email");
    }
    throw new Error("An unexpected error occurred");
  }
};

// ============================================================
// Categories API  (GUID-based, separate from legacy /Category)
// ============================================================

const CAT = "/EventCategories";

export const categoriesApi = {
  /** Fetch all categories */
  getAll: (): Promise<ApiCategory[]> =>
    apiClient
      .get<any>(CAT)
      .then((r) => extractArrayData<ApiCategory>(r.data)),

  /** Fetch a single category by GUID */
  getById: (id: string): Promise<ApiCategory | undefined> =>
    apiClient
      .get<ApiResponse<ApiCategory>>(`${CAT}/${id}`)
      .then((r) => r.data?.data || (r.data as unknown as ApiCategory)),

  /** Create a new category */
  create: (payload: CreateCategoryPayload): Promise<ApiCategory | undefined> =>
    apiClient
      .post<ApiResponse<ApiCategory>>(CAT, payload)
      .then((r) => r.data?.data || (r.data as unknown as ApiCategory)),

  /** Rename a category */
  rename: (
    id: string,
    payload: RenameCategoryPayload,
  ): Promise<ApiCategory | undefined> =>
    apiClient
      .put<ApiResponse<ApiCategory>>(`${CAT}/${id}/rename`, payload)
      .then((r) => r.data?.data || (r.data as unknown as ApiCategory)),

  /** Update a category's description */
  updateDescription: (
    id: string,
    payload: UpdateCategoryDescPayload,
  ): Promise<ApiCategory | undefined> =>
    apiClient
      .put<ApiResponse<ApiCategory>>(`${CAT}/${id}/description`, payload)
      .then((r) => r.data?.data || (r.data as unknown as ApiCategory)),

  /** Delete a category */
  delete: (id: string): Promise<void> =>
    apiClient.delete(`${CAT}/${id}`).then(() => undefined),
};

// ============================================================
// Events API
// ============================================================

const EV = "/events";

export const eventsApi = {
  /** Fetch all events */
  getAll: (): Promise<ApiEvent[]> =>
    apiClient.get<any>(EV).then((r) => extractArrayData<ApiEvent>(r.data)),

  /** Fetch a single event by GUID */
  getById: (id: string): Promise<ApiEvent | undefined> =>
    apiClient
      .get<ApiResponse<ApiEvent>>(`${EV}/${id}`)
      .then((r) => r.data?.data || (r.data as unknown as ApiEvent)),

  /** Create a new event */
  create: (payload: CreateEventPayload): Promise<ApiEvent | undefined> =>
    apiClient.post<ApiResponse<ApiEvent>>(EV, payload).then((r) => r.data?.data || (r.data as unknown as ApiEvent)),

  /** Rename an event */
  rename: (
    id: string,
    payload: RenameEventPayload,
  ): Promise<ApiEvent | undefined> =>
    apiClient
      .put<ApiResponse<ApiEvent>>(`${EV}/${id}/rename`, payload)
      .then((r) => r.data?.data || (r.data as unknown as ApiEvent)),

  /** Update an event's keywords */
  updateKeywords: (
    id: string,
    payload: UpdateEventKeywordsPayload,
  ): Promise<ApiEvent | undefined> =>
    apiClient
      .put<ApiResponse<ApiEvent>>(`${EV}/${id}/keywords`, payload)
      .then((r) => r.data?.data || (r.data as unknown as ApiEvent)),

  /** Update an event's dates / coming-soon flag */
  updateDates: (
    id: string,
    payload: UpdateEventDatesPayload,
  ): Promise<ApiEvent | undefined> =>
    apiClient
      .put<ApiResponse<ApiEvent>>(`${EV}/${id}/dates`, payload)
      .then((r) => r.data?.data || (r.data as unknown as ApiEvent)),

  /** Delete an event */
  delete: (id: string): Promise<void> =>
    apiClient.delete(`${EV}/${id}`).then(() => undefined),
};

// ============================================================
// Sponsors API
// ============================================================

export const getAllSponsorsApi = async (): Promise<ISponsorCard[]> => {
  try {
    const response = await apiClient.get("/Sponsors");
    return extractArrayData<ISponsorCard>(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to get Sponsors");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getSponsorByIdApi = async (id: number): Promise<ISponsorCard> => {
  try {
    const response = await apiClient.get(`/Sponsors/${id}`);
    return response.data as ISponsorCard;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Failed to get Sponsor");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const createSponsorApi = async <T = any>(data: any): Promise<T> => {
  try {
    const response = await apiClient.post("/Sponsors", data);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.response?.data || "Failed to create Sponsor");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const updateSponsorApi = async <T = any>(id: number, data: any): Promise<T> => {
  try {
    const response = await apiClient.put(`/Sponsors/${id}`, data);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.response?.data || "Failed to update Sponsor");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const deleteSponsorApi = async <T = any>(id: number): Promise<T> => {
  try {
    const response = await apiClient.delete(`/Sponsors/${id}`);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Failed to delete Sponsor");
    }
    throw new Error("An unexpected error occurred");
  }
};

// ============================================================
// Dashboard API Services
// ============================================================

import type {
  DashboardStats,
  RecentActivityItem,
  DashboardMember,
  DashboardEvent,
  CreateUserData,
  CreateMeetingData,
  CreateArticleData,
  CreateEventData,
  UpdateMemberData,
} from "~/types/dashboard";

export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const response = await apiClient.get("/Dashboard/stats");
    return response.data;
  } catch {
    // Mock fallback stats for demonstration/offline mode
    return {
      totalMembers: 156,
      totalMembersChange: "+12% from last month",
      pendingApprovals: 4,
      pendingSubtitle: "Requires Action",
      upcomingMeetings: 8,
      meetingsSubtitle: "Next: Today 4 PM",
      upcomingEvents: 3,
      eventsSubtitle: "Next: 15 Jul",
      membersChartData: [40, 65, 50, 80, 75, 95, 110, 130, 156],
      pendingChartData: [2, 5, 3, 6, 4],
      meetingsChartData: [3, 4, 6, 8],
      eventsChartData: [1, 2, 2, 3],
    };
  }
};

export const getRecentActivities = async (): Promise<RecentActivityItem[]> => {
  try {
    const response = await apiClient.get("/Dashboard/activities");
    return extractArrayData<RecentActivityItem>(response.data);
  } catch {
    return [
      {
        id: 1,
        title: "Sara Ahmed published new article in Technical",
        time: "10 mins ago",
        type: "article",
      },
      {
        id: 2,
        title: "Karim Nasser requested membership approval",
        time: "45 mins ago",
        type: "approval",
      },
      {
        id: 3,
        title: "New Event: AI Workshop 2026 created",
        time: "2 hours ago",
        type: "event",
      },
      {
        id: 4,
        title: "Meeting scheduled with UI/UX Committee",
        time: "5 hours ago",
        type: "meeting",
      },
      {
        id: 5,
        title: "Nour Hassan approved membership request",
        time: "1 day ago",
        type: "user",
      },
    ];
  }
};

export const getMembers = async (): Promise<DashboardMember[]> => {
  try {
    const response = await apiClient.get("/Users");
    return extractArrayData<DashboardMember>(response.data);
  } catch {
    return [
      {
        id: 1,
        name: "Sara Ahmed",
        email: "sara@ieee.org",
        phone: "+20 100 123 4567",
        committee: "UI/UX",
        role: "Member",
        academicYear: "3rd Year, CS",
        joinedDate: "Jul 10",
        status: "Approved",
      },
      {
        id: 2,
        name: "Karim Nasser",
        email: "karim@ieee.org",
        phone: "+20 101 234 5678",
        committee: "AI",
        role: "Lead",
        academicYear: "4th Year, ECE",
        joinedDate: "Jul 08",
        status: "Pending",
      },
      {
        id: 3,
        name: "Nour Hassan",
        email: "nour@ieee.org",
        phone: "+20 102 345 6789",
        committee: "CS",
        role: "Member",
        academicYear: "2nd Year, CS",
        joinedDate: "Jul 07",
        status: "Approved",
      },
      {
        id: 4,
        name: "Omar Youssef",
        email: "omar@ieee.org",
        phone: "+20 103 456 7890",
        committee: "Robotics",
        role: "Member",
        academicYear: "3rd Year, Mech",
        joinedDate: "Jul 05",
        status: "Rejected",
      },
      {
        id: 5,
        name: "Layla Ibrahim",
        email: "layla@ieee.org",
        phone: "+20 104 567 8901",
        committee: "Media",
        role: "Secretary",
        academicYear: "4th Year, Arch",
        joinedDate: "Jul 03",
        status: "Approved",
      },
      {
        id: 6,
        name: "Youssef Ali",
        email: "youssef@ieee.org",
        phone: "+20 105 678 9012",
        committee: "Power",
        role: "Member",
        academicYear: "1st Year, EE",
        joinedDate: "Jun 28",
        status: "Approved",
      },
      {
        id: 7,
        name: "Mona Samir",
        email: "mona@ieee.org",
        phone: "+20 106 789 0123",
        committee: "UI/UX",
        role: "Designer",
        academicYear: "2nd Year, CS",
        joinedDate: "Jun 25",
        status: "Pending",
      },
      {
        id: 8,
        name: "Hassan Khaled",
        email: "hassan@ieee.org",
        phone: "+20 107 890 1234",
        committee: "AI",
        role: "Member",
        academicYear: "3rd Year, ECE",
        joinedDate: "Jun 20",
        status: "Approved",
      },
    ];
  }
};

export const addUser = async (data: CreateUserData) => {
  try {
    const response = await apiClient.post("/Users", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to create user");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const createMeeting = async (data: CreateMeetingData) => {
  try {
    const response = await apiClient.post("/Meetings", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to create meeting");
    }
    throw new Error("An unexpected error occurred");
  }
};

// export const createArticle = async (data: CreateArticleData) => {
//   try {
//     const response = await apiClient.post("/Articles", data);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       throw new Error(error.response?.data?.message || "Failed to create article");
//     }
//     throw new Error("An unexpected error occurred");
//   }
// };

export const createEvent = async (data: CreateEventData) => {
  try {
    const response = await apiClient.post("/events", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to create event");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const updateMember = async (data: UpdateMemberData) => {
  try {
    const response = await apiClient.put(`/Users/${data.id}`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to update member");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const approveMember = async (id: number) => {
  try {
    const response = await apiClient.put(`/Admin/ActivateUser/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to approve member");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const rejectMember = async (id: number) => {
  try {
    const response = await apiClient.post(`/Users/${id}/reject`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to reject member");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getUpcomingEvents = async (): Promise<DashboardEvent[]> => {
  try {
    const response = await apiClient.get("/events");
    return extractArrayData<DashboardEvent>(response.data);
  } catch {
    return [
      {
        id: 1,
        title: "Technical Workshop 2026",
        date: "2026-07-15",
        time: "10:00 AM",
        location: "Main Auditorium & Online",
        capacity: 120,
        description: "Hands-on machine learning workshop covering modern AI tools.",
      },
      {
        id: 2,
        title: "IEEE Annual Hackathon",
        date: "2026-08-01",
        time: "09:00 AM",
        location: "Engineering Complex",
        capacity: 250,
        description: "48-hour innovation challenge for tech enthusiasts.",
      },
    ];
  }
};


