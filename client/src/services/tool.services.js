import api from "../api/api";


export const CreateToolService = async (data) => {
  const token = localStorage.getItem("token");

  const res = await api.post("/tool/createtool", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getAllTools = async() => {
    const res = await api.get("/tool/getalltools" );
    return res.data;
};

export const getUserTools = async () => {
  const token = localStorage.getItem("token");

  const res = await api.get("/tool/getusertools", {
    headers: {
      Authorization: `Bearer ${token}`, // 🔒 required
    },
  });

  return res.data;
};

export const updateToolService = async (id, data) => {
  const token = localStorage.getItem("token");

  const res = await api.put(
    `/tool/updatetool/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const deleteToolService = async (id) => {
  const token = localStorage.getItem("token");

  const res = await api.delete(
    `/tool/deletetool/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};


export const toggleToolVisibilityService = async (id) => {
  const token = localStorage.getItem("token");

  const res = await api.patch(
    `/tool/toggle-visibility/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// ---------------- GET TOOL BY ID ----------------

export const getToolByIdService = async (id) => {
  const res = await api.get(
    `/tool/gettool/${id}`
  );

  return res.data;
};


// ---------------- GET TOOL BOOKINGS ----------------

export const getToolBookingsService = async (
  toolId,
  filter = "all"
) => {

  const token = localStorage.getItem("token");

  const res = await api.get(
    `/tool/toolbookings/${toolId}?filter=${filter}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};