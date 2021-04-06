import { request } from "@/plugins/request";

export const updateCenter = (params) => {
  console.log(params);
  return request.put("/api/user", params);
};

export const getCurrentUser = () => {
  return request({
    method: "get",
    url: "/api/user",
  });
};

export const getProfile = ({ username }) => {
  return request({
    method: "get",
    url: "/api/profiles/" + username,
  });
};
