import api from "../Api/Api";


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